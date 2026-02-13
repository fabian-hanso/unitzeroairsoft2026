// app/team/[id]/page.tsx
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  Cog6ToothIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MemberDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Hole Member direkt per ID
  const { data: member, error } = await supabase
    .from("public_profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !member) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header mit Zurück-Button */}

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Linke Spalte - Bilder */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              {/* Primärbild */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                <img
                  src={member.primary_image_url || "/Placeholder.webp"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Sekundärbild */}
              {member.secondary_image_url && (
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={member.secondary_image_url}
                    alt={`${member.name} - Alternative Ansicht`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Rechte Spalte - Informationen */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    {member.callsign?.toUpperCase()}
                  </h1>
                  <p className="text-xl text-gray-600 mt-2">{member.name}</p>
                </div>
                {member.playstyle && (
                  <span className="inline-flex items-center gap-2 bg-blue text-white px-4 py-2 rounded-md text-sm font-medium">
                    <ChevronDoubleUpIcon className="w-4 h-4" />
                    {member.playstyle}
                  </span>
                )}
              </div>
            </div>

            {/* Waffen */}
            {member.weapons && member.weapons.length > 0 && (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Cog6ToothIcon className="w-6 h-6 text-blue" />
                  Ausrüstung
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {member.weapons.map((weapon: any) => (
                    <div
                      key={weapon.id}
                      className="bg-gray-50 p-4 rounded-md border border-gray-200"
                    >
                      <p className="font-semibold text-gray-900">
                        {weapon.name}
                      </p>
                      {weapon.type && (
                        <p className="text-sm text-gray-600 mt-1">
                          {weapon.type}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Beschreibung */}
            {member.description && (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Über {member.callsign}
                </h2>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {member.description}
                </p>
              </div>
            )}

            {/* Lieblingszitat */}
            {member.favorite_quote && (
              <div className="bg-blue/5 p-8 rounded-lg border-l-4 border-blue">
                <blockquote className="text-lg italic text-gray-700">
                  "{member.favorite_quote}"
                </blockquote>
              </div>
            )}

            {/* Vorlieben */}
            {(member.favorite_mode || member.favorite_field) && (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Vorlieben
                </h2>
                <div className="space-y-4">
                  {member.favorite_mode && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Lieblings-Modus
                      </p>
                      <p className="text-gray-900">{member.favorite_mode}</p>
                    </div>
                  )}
                  {member.favorite_field && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Lieblings-Spielfeld
                      </p>
                      <p className="text-gray-900">{member.favorite_field}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Motivation */}
            {(member.why_airsoft || member.why_unit_zero) && (
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Motivation
                </h2>
                <div className="space-y-6">
                  {member.why_airsoft && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Warum Airsoft?
                      </h3>
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {member.why_airsoft}
                      </p>
                    </div>
                  )}
                  {member.why_unit_zero && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Warum Unit Zero Airsoft?
                      </h3>
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {member.why_unit_zero}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
