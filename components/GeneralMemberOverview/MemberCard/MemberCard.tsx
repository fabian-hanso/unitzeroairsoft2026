// components/MemberCard.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDoubleUpIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

interface Member {
  id: string;
  name: string;
  callsign: string;
  primary_image_url?: string;
  secondary_image_url?: string;
  weapons?: Array<{ id: string; name: string; type: string }>;
  playstyle?: string;
}

export function MemberCard({ member }: { member: Member }) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/mitglieder/${member.id}`);
  };

  return (
    <div
      className="relative w-full h-[450px] overflow-hidden group border border-white hover:border-accent cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Bild mit Hover-Wechsel */}
      <img
        src={
          isHovered && member.secondary_image_url
            ? member.secondary_image_url
            : member.primary_image_url || "/Placeholder.webp"
        }
        alt={member.name}
        className="w-full h-full object-cover transition-all duration-300"
      />

      {/* Overlay */}
      <div className="bg-gradient-to-b from-gray/10 to-gray absolute top-0 right-0 left-0 bottom-0 group-hover:from-gray/50 transition-all">
        <div className="p-6 flex flex-col justify-between h-full">
          {/* Badge oben */}
          <div className="bg-gray text-white py-2 px-3 w-fit text-xs flex flex-row gap-2">
            <ChevronDoubleUpIcon className="w-4 h-4 text-accent" />
            <p>{member.playstyle || "Operator"}</p>
          </div>

          {/* Info unten */}
          <div>
            <h2 className="text-white font-bold text-xl">
              {member.callsign?.toUpperCase()} - {member.name?.toUpperCase()}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Cog6ToothIcon className="w-4 h-4 text-accent" />
              <p className="text-white text-sm">
                {member.weapons && member.weapons.length > 0
                  ? member.weapons[0].name // Nur erste Waffe anzeigen
                  : "Wird noch gepflegt"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
