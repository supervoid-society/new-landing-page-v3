export const meta = () => [{ title: "About — Supervoid Society" }];

export default function About() {
  return (
    <main className="max-w- mx-auto px-6 lg:px-8 py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-4">
          <h2 className="text-5xl tracking-tighter">What</h2>
        </div>
        <div className="md:col-span-8 md:pl-12">
          <p className="text- leading-[1.8] text-zinc-300 max-w-">
            <strong className="text-white font-medium">Supervoid Society</strong> adalah komunitas builder yang percaya pada “absolute nothingness” — kurangi noise, tambah
            substansi. Kami tidak bikin slide, kami ship.
          </p>
          <p className="mt-5 text- leading-relaxed text-zinc-400 max-w-">
            Empat jalur utama: Web Development (arsitektur & performa), Android Development (Kotlin/Compose), Cyber Security (hardening & audit), dan AI/ML (model efisien untuk
            edge).
          </p>
        </div>

        <div className="md:col-span-4 md:col-start-2 mt-20">
          <h2 className="text-5xl tracking-tighter">When</h2>
        </div>
        <div className="md:col-span-7 mt-4 md:mt-28">
          <div className="border-t border-white/10 pt-6">
            <p className="text-zinc-300">
              Didirikan <span className="text-white">Juni 2025</span> di Bandar Lampung.
            </p>
            <p className="mt-2 text-sm text-zinc-500" style={{ fontFamily: "JetBrains Mono" }}>
              Motto: Absolute nothignesss
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
