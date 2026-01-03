import Section from "./Section/Section";

const faqs = [
  {
    question: "Wie kann ich Mitglied bei euch werden?",
    answer:
      "Melde dich gerne direkt via Discord oder per Instagram bei uns. Wir geben jedem Interessenten die Möglichkeit, sich über einige Spieltage hinweg zu beweisen und ein Teil der Gemeinschaft zu werden.",
  },
  {
    question: "Wie viele Mitglieder habt ihr aktuell?",
    answer:
      "Derzeit zählen wir 24 aktive Mitglieder, wachsen jedoch bei fast jedem Spieltag weiter.",
  },
  {
    question: "Was hat es mit dem Unit Zero Squad auf sich?",
    answer:
      "Der Unit Zero Squad ist ein von uns gegründeter Trupp, welcher sich gerade im Aufbau befindet. Dieser Trupp wird durch einen Truppführer und seinen Stellvertreter geleitet. Gemeinsam werden Taktiken trainiert, Funksprüche optimiert und es wird rein Objektbezogen agiert. Kein wildes Geballer & keine unklaren Spielverläufe. Wir nehmen das Spiel in die Hand und führen das gesamte Team zum Erfolg!",
  },
  {
    question: "Auf welchen Spielfeldern seid ihr regelmäßig vertreten?",
    answer:
      "Du findest uns regelmäßig (mindestens alle 14 Tage) auf der Area M in Koblenz, allerdings versuchen wir auch Abwechslung in die Spieltage zu bringen, indem wir Felder wie Weeze, Venlo, uvm. besuchen. Im Winter findet man uns außerdem hin und wieder in nahegelegenen Hallen.",
  },
];

export default function FAQ() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Häufig gestellte Fragen
        </h2>
        <dl className="mt-16 divide-y divide-gray-900/10">
          {faqs.map((faq) => (
            <Section faq={faq} key={faq.question} />
          ))}
        </dl>
      </div>
    </div>
  );
}
