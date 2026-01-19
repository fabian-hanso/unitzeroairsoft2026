export type CoverImage = "image1" | "image2" | "image3";

export interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  cover_image: CoverImage;
  ticket_url: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventWithStats extends Event {
  attendees_count: number;
  cancelled_count: number;
  can_cancel: boolean;
}

export interface EventParticipant {
  id: string;
  event_id: string;
  user_id: string;
  status: "attending" | "cancelled";
  registered_at: string;
  cancelled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventWithParticipation extends EventWithStats {
  user_participation?: EventParticipant | null;
}

export interface EventParticipantWithUser extends EventParticipant {
  user: {
    id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
  };
}

export interface EventFormData {
  title: string;
  description?: string;
  event_date: string;
  location?: string;
  cover_image: CoverImage;
  ticket_url?: string;
}
