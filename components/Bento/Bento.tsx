import {
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Gemeinsame Spieltage",
    description:
      "Wir treffen uns regelmäßig zu gemeinsamen Spieltagen, um als Gemeinschaft zu wachsen und taktische Ansätze zu entwickeln.",
    icon: CalendarDaysIcon,
  },
  {
    name: "Gegenseitiger Tech-Support",
    description:
      "Wie bereits erwähnt, steht die Gemeinschaft im Mittelpunkt. Wir unterstützen uns bei Technik- & Gearfragen und darüber hinaus.",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: "Rabatte bei Sponsoren",
    description:
      "Dank unserer Sponsoren haben unsere aktiven Mitglieder Zugriff auf tolle Rabatte auf fast alle Artikel im jeweiligen Sortiment.",
    icon: CheckBadgeIcon,
  },
];

export default function Bento() {
  return (
    <div className="bg-gray-50 py-24 sm:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Wir sind <span className="font-semibold text-blue">Unit Zero</span>
          </h2>
          <p className="mt-6 text-lg/8 text-gray-600">
            Gemeinsam erreicht man mehr. Dies war der Leitspruch zur Gründung
            der <span className="font-bold text-stone-900">Unit Zero</span>.
            Inzwischen zählen wir 24 aktive Mitglieder und wachsen stetig!
          </p>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <feature.icon
                  aria-hidden="true"
                  className="absolute left-1 top-1 size-5 text-blue"
                />
                {feature.name}
              </dt>{" "}
              <dd className="">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
