import {
  ChevronDoubleUpIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const people = [
  {
    name: "UZA - BABA",
    role: "Späher",
    imageUrl: "/Sia.jpg",
    weapon: "MTW .308",
  },
  {
    name: "UZA - AMEX",
    role: "Angriff",
    imageUrl: "/Fabian.jpg",
    weapon: "MTW Billet Tactical Gen.3",
  },
  {
    name: "UZA - HILDEGUARD",
    role: "Support",
    imageUrl: "/Marcel-3.jpg",
    weapon: "MTW Billet Tactical Gen.3",
  },
  // More people...
];

export default function EliteTeamMember() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray sm:text-5xl">
            Unit Zero <span className="text-blue">Squad Mitglieder</span>
          </h2>
          <p className="mt-6 text-lg/8 text-gray text-left">
            Der Alpha Squad besteht aktuell aus den folgenden Mitgliedern.
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
        </ul>
      </div>
    </div>
  );
}
