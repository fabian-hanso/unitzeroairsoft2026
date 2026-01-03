import { fetchEntries } from "@/lib/contentful";
import {
  ChevronDoubleUpIcon,
  Cog6ToothIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

const people = [
  {
    name: "FELDKOCH - SIA",
    role: "Gründer",
    imageUrl: "/Sia-Profil.jpg",
    weapon: "MTW .308 / DD MK18",
  },
  {
    name: "AMEX - FABIAN",
    role: "Gründer",
    imageUrl: "/Fabian.jpg",
    weapon: "MTW Billet Tactical Gen.3",
  },
  {
    name: "HILDEGUARD - MARCEL",
    role: "Gründer",
    imageUrl: "/Marcel-Profil.jpg",
    weapon: "MTW Billet Tactical Gen.3",
  },
  {
    name: "PETER",
    role: "Operator",
    imageUrl: "/Peter-Profil.jpg",
    weapon: "SSR4 MK2",
  },
  {
    name: "GHOST - TIMO",
    role: "Operator",
    imageUrl: "/Timo-Profil-1.jpg",
    weapon: "Wird noch gepflegt",
  },
  {
    name: "ANDRE",
    role: "Operator",
    imageUrl: "/Andre-Profil.jpg",
    weapon: "JG MOD5 GEN.2 (Begadi, MP5)",
  },
  {
    name: "JAN OLIVER",
    role: "Operator",
    imageUrl: "/JanOliver-Profil.jpg",
    weapon: "PHYLAX HPO",
  },
  {
    name: "PASCAL",
    role: "Operator",
    imageUrl: "/Pascal-Profil.jpg",
    weapon: "Wird noch gepflegt",
  },
  {
    name: "SVEN",
    role: "Initiate",
    imageUrl: "/Sven-Profil.jpg",
    weapon: "Wird noch gepflegt",
  },
  {
    name: "OTTI",
    role: "Operator",
    imageUrl: "/Otti-Profil.jpg",
    weapon: "Wird noch gepflegt",
  },
  {
    name: "RUBEN",
    role: "Operator",
    imageUrl: "/Ruben-Profil.jpg",
    weapon: "Wird noch gepflegt",
  },
  {
    name: "VALERII",
    role: "Operator",
    imageUrl: "/Valerij-Profil.jpg",
    weapon: "Wird noch gepflegt",
  },
  {
    name: "STEFFEN",
    role: "Operator",
    imageUrl: "/Steffen-Profil.jpg",
    weapon: "Wird noch gepflegt",
  },
  {
    name: "BEN",
    role: "Operator",
    imageUrl: "/Ben-Portrait.jpg",
    weapon: "DD MK 18 / MP 7",
  },
  {
    name: "OLI",
    role: "Operator",
    imageUrl: "/Placeholder.webp",
    weapon: "Wird noch gepflegt",
  },
  {
    name: "MAX",
    role: "Operator",
    imageUrl: "/Max-Portrait.jpg",
    weapon: "Wird noch gepflegt",
  },
  {
    name: "PAUL",
    role: "Operator",
    imageUrl: "/Paul-Portrait.jpg",
    weapon: "Wird noch gepflegt",
  },
  {
    name: "LEON",
    role: "Operator",
    imageUrl: "/Leon-Portrait.jpg",
    weapon: "Wird noch gepflegt",
  },
  {
    name: "LEON II",
    role: "Operator",
    imageUrl: "/Placeholder.webp",
    weapon: "Wird noch gepflegt",
  },
  {
    name: "LUCA",
    role: "Initiate",
    imageUrl: "/Placeholder.webp",
    weapon: "Wird noch gepflegt",
  },
  {
    name: "CARSTEN",
    role: "Operator",
    imageUrl: "/Placeholder.webp",
    weapon: "Vorsk VMP-2M",
  },
  {
    name: "MARTIN",
    role: "Initiate",
    imageUrl: "/Placeholder.webp",
    weapon: "Wird noch gepflegt",
  },
  {
    name: "PATRICK",
    role: "Operator",
    imageUrl: "/Placeholder.webp",
    weapon: "Wird noch gepflegt",
  },
  {
    name: "JUSTIN",
    role: "Initiate",
    imageUrl: "/Placeholder.webp",
    weapon: "Wird noch gepflegt",
  },
  // More people...
];

export default async function GeneralMemberOverview() {
  const members = await fetchEntries("mitglieder");

  console.log(members);

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
          {people.map((person) => (
            <div
              className="relative w-full h-[450px] overflow-hidden group border border-white hover:border-accent"
              key={person.name}
            >
              <img
                src={person.imageUrl}
                className="w-full h-full object-cover"
              />
              <div className="bg-gradient-to-b from-gray/10 to-gray absolute top-0 right-0 left-0 bottom-0 group-hover:from-gray/50 transition-all group-hover:">
                <div className="p-6 flex flex-col justify-between h-full">
                  <div className="bg-gray text-white py-2 px-3 w-fit text-xs flex flex-row gap-2">
                    <ChevronDoubleUpIcon className="w-4 h-4 text-accent" />
                    <p>{person.role}</p>
                  </div>
                  <div className="">
                    <h2 className="text-white font-bold text-xl">
                      {person.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Cog6ToothIcon className="w-4 h-4 text-accent" />
                      <p className="text-white text-sm">{person.weapon}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="relative w-full h-[450px] overflow-hidden group border border-white hover:border-accen bg-gray">
            <div className="bg-gradient-to-b from-gray/10 to-gray absolute top-0 right-0 left-0 bottom-0 group-hover:from-gray/50 transition-all group-hover:">
              <div className="p-6 flex flex-col justify-between h-full">
                <div></div>
                <div className="">
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
