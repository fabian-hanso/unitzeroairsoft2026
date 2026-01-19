import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { checkIsAdmin } from "@/app/actions/events";
import Link from "next/link";
import EventForm from "@/components/EventForm/EventForm";

export default async function CreateEventPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    redirect("/events");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold">Event erstellen</h1>
            <Link
              href="/events"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              ← Zurück zu Events
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <EventForm />
          </div>
        </div>
      </main>
    </div>
  );
}
