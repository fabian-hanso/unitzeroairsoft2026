/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEvent } from "@/app/actions/events";
import type { CoverImage } from "@/types/events";

const coverImages: { id: CoverImage; url: string; label: string }[] = [
  {
    id: "image1",
    url: "https://www.unit-zero.de/EventImages/Cover-1.jpg",
    label: "Titelbild 1",
  },
  {
    id: "image2",
    url: "https://www.unit-zero.de/EventImages/Cover-3.jpg",
    label: "Titelbild 2",
  },
  {
    id: "image3",
    url: "https://www.unit-zero.de/EventImages/Cover-4.jpg",
    label: "Titelbild 3",
  },
];

export default function EventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [location, setLocation] = useState("");
  const [coverImage, setCoverImage] = useState<CoverImage>("image1");
  const [ticketUrl, setTicketUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Datum und Zeit kombinieren
    const dateTimeString = `${eventDate}T${eventTime}:00`;

    try {
      const result = await createEvent({
        title,
        description: description || undefined,
        event_date: dateTimeString,
        location: location || undefined,
        cover_image: coverImage,
        ticket_url: ticketUrl || undefined,
      });

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/dashboard/events");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Ein Fehler ist aufgetreten");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Neues Event erstellen
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Erstellen Sie ein neues Event für Ihre Mitglieder.
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-900"
        >
          Titel *
        </label>
        <input
          type="text"
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue sm:text-sm"
          placeholder="z.B. Summer Festival 2026"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-900"
        >
          Beschreibung
        </label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue sm:text-sm"
          placeholder="Beschreiben Sie Ihr Event..."
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="eventDate"
            className="block text-sm font-medium text-gray-900"
          >
            Datum *
          </label>
          <input
            type="date"
            id="eventDate"
            required
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="mt-2 block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="eventTime"
            className="block text-sm font-medium text-gray-900"
          >
            Uhrzeit *
          </label>
          <input
            type="time"
            id="eventTime"
            required
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            className="mt-2 block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-900"
        >
          Ort
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-2 block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue sm:text-sm"
          placeholder="z.B. Leipzig Messe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Titelbild auswählen *
        </label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {coverImages.map((image) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setCoverImage(image.id)}
              className={`relative rounded-lg overflow-hidden border-2 transition-all cursor-pointer${
                coverImage === image.id
                  ? "border-blue ring-1 ring-blue"
                  : "border-gray-300 hover:border-gray-400 ring-1 ring-gray-300"
              }`}
            >
              <img
                src={image.url}
                alt={image.label}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                <span className="text-white text-xs font-medium">
                  {image.label}
                </span>
              </div>
              {coverImage === image.id && (
                <div className="absolute top-2 right-2 bg-blue rounded-full p-1">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="ticketUrl"
          className="block text-sm font-medium text-gray-900"
        >
          Ticket-Shop Link
        </label>
        <input
          type="url"
          id="ticketUrl"
          value={ticketUrl}
          onChange={(e) => setTicketUrl(e.target.value)}
          className="mt-2 block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue sm:text-sm"
          placeholder="https://tickets.beispiel.de"
        />
        <p className="mt-1 text-sm text-gray-500">
          Optional: Link zum Ticket-Shop für dieses Event
        </p>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 justify-center bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "Wird erstellt..." : "Event erstellen"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/events")}
          className="flex-1 justify-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}
