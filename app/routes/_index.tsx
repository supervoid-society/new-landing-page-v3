import { Link } from "react-router";

export default function Home() {
  return (
    <div className="relative isolate">
      <div className="absolute inset-0 -z-10">
        <img src="https://cdn.eso.org/images/screen/eso1907a.jpg" alt="Black hole M87" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
      </div>

      <div className="mx-auto flex min-h- w-full max-w-2xl flex-col items-center justify-center px-6 pt-28 pb-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          <span className="font-mono text- uppercase tracking-widest text-zinc-300">LIVE - 4 FOKUS AKTIF</span>
        </div>

        <h1 className="text-5xl font-medium leading-none tracking-tight text-white md:text-7xl">Supervoid Society</h1>

        <p className="mt-3 text-sm uppercase tracking-[0.2em] text-zinc-500">ABSOLUTE NOTHIGNESSS - EST. JUN 2025</p>

        <p className="mt-6 max-w- text-base leading-relaxed text-zinc-300">
          Kolektif builder di Bandar Lampung. Web, Android, Cyber Security, AI/ML. Kami hapus noise sampai tersisa yang esensial.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <Link to="/about" className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:opacity-90 active:scale-95">
            Lihat manifesto
          </Link>
          <a href="https://github.com" className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-zinc-200 backdrop-blur-md transition hover:bg-white/10">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
