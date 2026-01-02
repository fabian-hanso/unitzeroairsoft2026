export default function EliteTop() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl  py-24 sm:py-32 lg:max-w-7xl px-6 lg:px-8">
        {/* Details section */}
        <section aria-labelledby="details-heading">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Unit Zero{" "}
              <span className="font-semibold text-blue">Alpha Squad</span>
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              Der{" "}
              <span className="font-bold text-stone-900">
                Unit Zero Alpha Squad
              </span>{" "}
              ist ein interner Trupp, welcher über Truppführer verfügt und klare
              taktische Ziele verfolgt. Mehr Infos werden unten aufgeführt.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
            <div>
              <img
                alt="Test"
                src="/Marcel-4.jpg"
                className="aspect-[3/2] w-full object-cover"
              />
              <p className="mt-8 text-gray-600">
                Der Trupp spielt in einheitlicher Kleidung. Wir haben uns für
                Multi-Cam entschieden, da es perfekt in die europäische
                Vegetation passt.
              </p>
            </div>
            <div>
              <img
                alt="Front zipper pouch with included key ring."
                src="/Marcel-1.jpg"
                className="aspect-[3/2] w-full object-cover object-top"
              />
              <p className="mt-8  text-gray-600">
                Jeder Operator verfügt über eine klar definierte Rolle, die er
                bereits beim Beitritt in den Elite-Trupp wählt und dann auch
                behält.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
