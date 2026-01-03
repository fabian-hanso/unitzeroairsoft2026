const timeline = [
  {
    name: "Kennenlernen",
    description:
      "Du suchst den Kontakt zu unseren Ansprechpartnern und nimmst an einigen Spieltagen mit uns Teil.",
    date: "Initiate",
    dateTime: "2021-08",
  },
  {
    name: "Aufnahme zur Unit Zero",
    description:
      "Nach Ablauf der Probezeit erhältst du den Operator-Status und bist Teil der aktiven Unit Zero Gemeinschaft.",
    date: "Operator",
    dateTime: "2021-12",
  },
  {
    name: "Ausschreibung",
    description:
      "Wenn Personal für freie Stellen benötigt wird, so wird eine interne Ausschreibung veröffentlicht.",
    date: "Bewerbung",
    dateTime: "2022-02",
  },
  {
    name: "Aufnahme zu einem Squad",
    description:
      "Sollte deine Bewerbung sämtliche Voraussetzungen erfüllen, wirst du nach mehrmaligem Test befördert.",
    date: "Squad Member",
    dateTime: "2022-12",
  },
];

export default function JoinElite() {
  return (
    <div className="bg-gray py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Dein Weg zu unseren Squads
          </h2>
          <p className="mt-6 text-lg/8 text-white/60 text-left">
            So wirst du Teil eines unserer Squads.
          </p>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4 mt-16">
          {timeline.map((item) => (
            <div key={item.name}>
              <time
                dateTime={item.dateTime}
                className="flex items-center text-sm/6 font-semibold text-accent"
              >
                <svg
                  viewBox="0 0 4 4"
                  aria-hidden="true"
                  className="mr-4 size-1 flex-none"
                >
                  <circle r={2} cx={2} cy={2} fill="currentColor" />
                </svg>
                {item.date}
                <div
                  aria-hidden="true"
                  className="absolute -ml-2 h-px w-screen -translate-x-full bg-accent/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                />
              </time>
              <p className="mt-6 text-lg/8 font-semibold tracking-tight text-white">
                {item.name}
              </p>
              <p className="mt-1 text-base/7 text-gray-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
