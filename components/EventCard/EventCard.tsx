"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  registerForEvent,
  cancelEventRegistration,
} from "@/app/actions/events";
import type { EventWithParticipation } from "@/types/events";
import ParticipantsModal from "./ParticipentsModel/ParticipentsModel";

interface EventCardProps {
  event: EventWithParticipation;
  isPast?: boolean;
  isAdmin?: boolean;
}

// Cover Image Mapping
const coverImages = {
  image1: "https://www.unit-zero.de/EventImages/Cover-1.jpg",
  image2: "https://www.unit-zero.de/EventImages/Cover-3.jpg",
  image3: "https://www.unit-zero.de/EventImages/Cover-4.jpg",
};

export default function EventCard({
  event,
  isPast = false,
  isAdmin = false,
}: EventCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const eventDate = new Date(event.event_date);
  const isAttending = event.user_participation?.status === "attending";

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    const result = await registerForEvent(event.id);

    if (result.error) {
      setError(result.error);
    } else {
      router.refresh();
    }

    setLoading(false);
  };

  const handleCancel = async () => {
    if (!confirm("Möchten Sie Ihre Teilnahme wirklich absagen?")) {
      return;
    }

    setLoading(true);
    setError("");

    const result = await cancelEventRegistration(event.id);

    if (result.error) {
      setError(result.error);
    } else {
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-48 bg-gray-200">
          <img
            src={coverImages[event.cover_image]}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-gray/40"></div>
          {isAttending && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 shadow-sm">
                Zugesagt
              </span>
            </div>
          )}
          {isPast && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 shadow-sm">
                Vergangen
              </span>
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {event.title}
          </h3>

          {event.description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {event.description}
            </p>
          )}

          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <svg
                className="h-4 w-4 mr-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {eventDate.toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}{" "}
              {eventDate.toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" Uhr"}
            </div>

            {event.location && (
              <div className="flex items-center">
                <svg
                  className="h-4 w-4 mr-2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {event.location}
              </div>
            )}

            {/* Teilnehmer - Klickbar */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center hover:text-blue transition-colors cursor-pointer"
            >
              <svg
                className="h-4 w-4 mr-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="underline">
                {event.attendees_count} Teilnehmer
              </span>
            </button>
          </div>

          {error && (
            <div className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <div className="space-y-2">
            {!isPast && (
              <>
                {isAttending ? (
                  <button
                    onClick={handleCancel}
                    disabled={loading || !event.can_cancel}
                    className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {loading
                      ? "Wird abgesagt..."
                      : event.can_cancel
                      ? "Absagen"
                      : "Absage nicht möglich"}
                  </button>
                ) : (
                  <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="w-full rounded-md bg-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
                  >
                    {loading ? "Wird angemeldet..." : "Zusagen"}
                  </button>
                )}
              </>
            )}

            {event.ticket_url && (
              <a
                href={event.ticket_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Tickets kaufen
              </a>
            )}
          </div>

          {!event.can_cancel && isAttending && !isPast && (
            <p className="mt-2 text-xs text-gray-500 text-center">
              Absage nur bis 24h vor Event möglich
            </p>
          )}
        </div>
      </div>

      <ParticipantsModal
        eventId={event.id}
        eventTitle={event.title}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
