/* eslint-disable @typescript-eslint/no-explicit-any */
export default function DashboardWelcome({ userData, user }: any) {
  return (
    <div className="bg-white max-w-7xl mx-auto shadow-sm">
      <div className="px-6 py-6">
        {userData?.first_name !== null && (
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Gude, {userData?.first_name + "!"}
          </h2>
        )}

        {userData?.first_name === null && (
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Gude, Rekrut!
          </h2>
        )}

        <p className="mt-4 text-pretty text-md font-medium text-gray-500 sm:text-md">
          Herzlich willkommen in der Schaltzentrale! Hier kannst du den
          Flohmarkt nutzen, um deine gebrauchten Gegenstände weiter zu geben,
          dein öffentliches Profil bearbeiten, zu Team-Events zu- & absagen und
          vieles mehr.
        </p>
      </div>
    </div>
  );
}
