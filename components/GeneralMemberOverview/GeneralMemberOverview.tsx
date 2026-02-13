// app/members/page.tsx
import { createClient } from "@/lib/supabase/server";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { MemberCard } from "./MemberCard/MemberCard";

export default async function GeneralMemberOverview() {
  const supabase = await createClient();

  const { data: members, error } = await supabase
    .from("public_profiles")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching members:", error);
  }

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray sm:text-5xl">
            Unit Zero <span className="text-blue">Mitglieder</span>
          </h2>
          <p className="mt-6 text-lg/8 text-gray text-left">
            Dies sind die festen Mitglieder der Unit Zero.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
        >
          {members?.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}

          {/* Platzhalter-Karte */}
          <div className="relative w-full h-[450px] overflow-hidden group border border-white hover:border-accent bg-gray">
            <div className="bg-gradient-to-b from-gray/10 to-gray absolute top-0 right-0 left-0 bottom-0 group-hover:from-gray/50 transition-all">
              <div className="p-6 flex flex-col justify-between h-full">
                <div></div>
                <div>
                  <h2 className="text-white font-bold text-xl">DEIN PLATZ</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <PlusCircleIcon className="w-4 h-4 text-accent" />
                    <p className="text-white text-sm">
                      Tritt noch heute unserem Discord Server bei!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}
