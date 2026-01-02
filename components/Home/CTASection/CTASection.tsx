export default function CTASection() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray px-6 py-24 text-center shadow-2xl sm:px-16">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Werde ein Teil von uns!
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-300">
            Tritt noch heute unserem Discord-Server bei und lerne den
            Führungsstab kennen. Es kostet nichts - außer Zeit!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="https://discord.gg/k6KssRNTZs"
              target="_blank"
              className="bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 flex gap-2 items-center"
            >
              <img src="/Discord.svg" className="h-4 w-auto" />
              <p>Discord</p>
            </a>
            <a
              href="https://www.instagram.com/unitzeroairsoft/"
              target="_blank"
              className="text-sm/6 font-semibold text-white"
            >
              Instagram <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="absolute -right-40 -top-20 pointer-events-none select-none">
            <img
              src="Discord.svg"
              className="w-96 h-auto opacity-5 lg:opacity-15 rotate-24"
            />
          </div>
          <div className="absolute -left-40 -bottom-20 pointer-events-none select-none">
            <img
              src="Discord.svg"
              className="w-96 h-auto opacity-5 -rotate-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
