export default function Page() {
  return (
    <div className="bg-white">
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray sm:text-5xl">
              Unit Zero <span className="text-blue">Impressum</span>
            </h2>
            <p className="mt-6 text-lg/8 text-gray text-left">
              Die Elite besteht aktuell aus den folgenden Mitgliedern.
            </p>
          </div>
        </div>
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 px-6 lg:px-8 mt-8 mx-auto gap-8">
          <div>
            <h2 className="font-bold mb-4">Angaben gemäß §5 TMG</h2>
            <p>Unit Zero Airsoft</p>
            <p>Gartenstraße 7</p>
            <p>56412 Ruppach-Goldhausen</p>
            <p className="mt-4">
              Vertreten durch: Siamak Mohammadian, Marcel Schink & Fabian Hanso
            </p>
            <div className="mt-4">
              <a href="mailto:info@unit-zero.de">
                Kontakt:{" "}
                <span className="text-blue font-bold">info@unit-zero.de</span>
              </a>
            </div>
          </div>
          <div>
            <h2 className="font-bold mb-4">Datenerhebung</h2>
            <p>
              Wir erheben keine personenbezogenen Daten. Der Server speichert
              standardgemäß Daten wie IP-Adresse, Land und Dauer des Besuches.
              Diese Daten werden durch uns nicht erhoben, ausgelesen oder
              verarbeitet. Sie dienen lediglich der Sicherheit und werden
              selbstverständlich nicht verbreitet.
            </p>
          </div>
          <div>
            <h2 className="font-bold mb-4">Haftung für Inhalte & Links</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
              jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die
              auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur
              Entfernung oder Sperrung der Nutzung von Informationen nach den
              allgemeinen Gesetzen bleiben hiervon unberührt. Eine
              diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
              Kenntnis einer konkreten Rechtsverletzung möglich. Bei
              Bekanntwerden von entsprechenden Rechtsverletzungen werden wir
              diese Inhalte umgehend entfernen.
            </p>
            <p className="mt-4">
              Revice Media übernimmt keinerlei Haftung für Links oder Inhalte
              von anderen Quellen. Links werden vor der Veröffentlichung auf
              dieser Webseite ordnungsgemäß geprüft. Eventuelle Änderungen, sind
              selbstverständlich möglich. Aus diesem Grund ist eine Haftung
              durch Revice Media nicht möglich.
            </p>
          </div>
          <div>
            <h2 className="font-bold mb-4">Cookies</h2>
            <p>
              Wir speichern Nutzer-Sessions in Form von Cookies, um
              anonymisierte Daten wie Aufrufe, Verlauf auf der Webseite und
              Server-Notwendige Daten zu erheben. Hierbei werden keine
              personenbezogenen Daten gespeichert.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
