import { useParams, Link } from "react-router";

const data = {
  "void-manifesto": {
    title: "Manifesto Supervoid: kurangi, bukan tambah",
    date: "30 Jun 2025",
    body: `Kami memulai Supervoid Society pada Juni 2025 dengan satu keyakinan: kebisingan membunuh kualitas. Di web, di Android, di security, di AI — yang menang bukan yang paling ramai, tapi yang paling jernih.

Absolute nothignesss berarti kami menghapus sampai tersisa yang esensial. Tidak ada gradient ungu, tidak ada kartu tiga kolom yang sama, tidak ada jargon. Hanya grid, tipografi, dan interaksi yang terasa nyata.

Kami menulis dengan lebar 65 karakter, bukan karena tren, tapi karena mata manusia lelah membaca baris yang terlalu panjang.`,
  },
};

export default function Post() {
  const { slug } = useParams();
  const p = data[slug as keyof typeof data] || data["void-manifesto"];

  return (
    <div className="mx-auto w-full max-w-2xl px-6 pt-40 md:pt-48 pb-20">
      <Link to="/blog" className="text-sm text-zinc-500 hover:text-zinc-300">
        ← Kembali
      </Link>

      <h1 className="mt-8 text-3xl md:text-4xl font-medium leading-tight tracking-tight text-white">{p.title}</h1>
      <div className="mt-3 text-xs text-zinc-500 font-mono">{p.date}</div>

      <div className="mt-8 space-y-6 leading-8 text-zinc-300">
        {p.body.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
}