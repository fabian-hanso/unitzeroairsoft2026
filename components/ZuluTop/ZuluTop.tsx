export default function ZuluTop() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl  py-24 sm:py-32 lg:max-w-7xl px-6 lg:px-8">
        {/* Details section */}
        <section aria-labelledby="details-heading">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Unit Zero{" "}
              <span className="font-semibold text-blue">Zulu Squad</span>
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              Der{" "}
              <span className="font-bold text-stone-900">
                Unit Zero Zulu Squad
              </span>{" "}
              ist der erste von aktuell zwei internen Trupps, welcher
              überwiegend zu Angriffszwecken eingesetzt wird.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
            <div>
              <img
                alt="Test"
                src="/Sia-Aktion.jpg"
                className="aspect-[3/2] w-full object-cover"
              />
              <p className="mt-8 text-gray-600">
                Sämtliche Trupps der Unit Zero agieren in einheitlicher
                Bekleidung. Outdoor setzen wir auf Multi-Cam, indoor auf Ranger
                Green.
              </p>
            </div>
            <div>
              <img
                alt="Front zipper pouch with included key ring."
                src="/Pascal-Stellung.jpg"
                className="aspect-[3/2] w-full object-cover object-top"
              />
              <p className="mt-8  text-gray-600">
                Die Operator der Squads erfüllen klar definierte Rollen. So wird
                sichergestellt, dass jeder Operator zu jeder Zeit genau über
                seine Aufgaben Bescheid weiß.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
