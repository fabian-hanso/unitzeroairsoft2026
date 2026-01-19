"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type {
  EventWithParticipation,
  EventParticipantWithUser,
  EventFormData,
} from "@/types/events";

// Prüfen ob User Admin ist
export async function checkIsAdmin(): Promise<boolean> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  return data?.role === "admin";
}

// Alle Events mit Stats und User-Teilnahme-Status abrufen
export async function getEvents(): Promise<EventWithParticipation[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: events, error } = await supabase
    .from("events_with_stats")
    .select("*")
    .order("event_date", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  const eventsWithParticipation = await Promise.all(
    events.map(async (event) => {
      const { data: participation } = await supabase
        .from("event_participants")
        .select("*")
        .eq("event_id", event.id)
        .eq("user_id", user.id)
        .single();

      return {
        ...event,
        user_participation: participation || null,
      };
    })
  );

  return eventsWithParticipation;
}

// Einzelnes Event abrufen
export async function getEvent(
  eventId: string
): Promise<EventWithParticipation | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: event, error } = await supabase
    .from("events_with_stats")
    .select("*")
    .eq("id", eventId)
    .single();

  if (error) {
    console.error("Error fetching event:", error);
    return null;
  }

  const { data: participation } = await supabase
    .from("event_participants")
    .select("*")
    .eq("event_id", eventId)
    .eq("user_id", user.id)
    .single();

  return {
    ...event,
    user_participation: participation || null,
  };
}

// Teilnehmerliste eines Events
export async function getEventParticipants(
  eventId: string
): Promise<EventParticipantWithUser[]> {
  const supabase = await createClient();

  // Erst die Participants holen
  const { data: participants, error: participantsError } = await supabase
    .from("event_participants")
    .select("*")
    .eq("event_id", eventId)
    .eq("status", "attending")
    .order("registered_at", { ascending: true });

  if (participantsError) {
    console.error("Error fetching participants:", participantsError);
    return [];
  }

  if (!participants || participants.length === 0) {
    return [];
  }

  // Dann die User-Daten für jeden Participant holen
  const participantsWithUsers = await Promise.all(
    participants.map(async (participant) => {
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("id, email, first_name, last_name")
        .eq("id", participant.user_id)
        .single();

      if (userError) {
        console.error("Error fetching user:", userError);
        return null;
      }

      return {
        ...participant,
        user,
      };
    })
  );

  // Filter null values raus
  return participantsWithUsers.filter(
    (p): p is EventParticipantWithUser => p !== null
  );
}

// Zusagen
export async function registerForEvent(eventId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Nicht authentifiziert" };
  }

  const { data: existing } = await supabase
    .from("event_participants")
    .select("*")
    .eq("event_id", eventId)
    .eq("user_id", user.id)
    .single();

  if (existing) {
    const { error } = await supabase
      .from("event_participants")
      .update({
        status: "attending",
        cancelled_at: null,
      })
      .eq("id", existing.id);

    if (error) {
      console.error("Error updating registration:", error);
      return { error: error.message };
    }
  } else {
    const { error } = await supabase.from("event_participants").insert({
      event_id: eventId,
      user_id: user.id,
      status: "attending",
    });

    if (error) {
      console.error("Error creating registration:", error);
      return { error: error.message };
    }
  }

  revalidatePath("/events");

  return { success: true };
}

// Absagen
export async function cancelEventRegistration(eventId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Nicht authentifiziert" };
  }

  const { error } = await supabase
    .from("event_participants")
    .update({
      status: "cancelled",
    })
    .eq("event_id", eventId)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error cancelling registration:", error);

    if (error.message.includes("weniger als 24 Stunden")) {
      return {
        error:
          "Absage nicht möglich: Das Event beginnt in weniger als 24 Stunden",
      };
    }

    return { error: error.message };
  }

  revalidatePath("/events");

  return { success: true };
}

// Event erstellen (nur Admins)
export async function createEvent(eventData: EventFormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Nicht authentifiziert" };
  }

  // Admin-Check
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return { error: "Keine Berechtigung" };
  }

  const { error } = await supabase.from("events").insert({
    ...eventData,
    created_by: user.id,
  });

  if (error) {
    console.error("Error creating event:", error);
    return { error: error.message };
  }

  revalidatePath("/events");

  return { success: true };
}

// Event bearbeiten (nur Admins)
export async function updateEvent(
  eventId: string,
  eventData: Partial<EventFormData>
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Nicht authentifiziert" };
  }

  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return { error: "Keine Berechtigung" };
  }

  const { error } = await supabase
    .from("events")
    .update(eventData)
    .eq("id", eventId);

  if (error) {
    console.error("Error updating event:", error);
    return { error: error.message };
  }

  revalidatePath("/events");

  return { success: true };
}

// Event löschen (nur Admins)
export async function deleteEvent(eventId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Nicht authentifiziert" };
  }

  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return { error: "Keine Berechtigung" };
  }

  const { error } = await supabase.from("events").delete().eq("id", eventId);

  if (error) {
    console.error("Error deleting event:", error);
    return { error: error.message };
  }

  revalidatePath("/events");

  return { success: true };
}
