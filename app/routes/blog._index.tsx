import { Link } from "react-router";

const posts = [
  { slug: "void-manifesto", title: "Manifesto Supervoid: kurangi, bukan tambah", excerpt: "Kenapa kami memilih absolute nothingness sebagai prinsip desain.", date: "2025-06-30" },
  { slug: "grid-asimetris", title: "Grid asimetris tanpa kalkulator", excerpt: "2fr 1fr terasa hidup.", date: "2025-07-14" },
  { slug: "edge-ai", title: "AI kecil di device", excerpt: "Inferensi cepat tanpa cloud.", date: "2025-08-02" },
];

export const meta = () => [{ title: "Blog — Supervoid Society" }];

export default function Blog() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 pt-40 md:pt-48 pb-20">
      <h1 className="text-3xl font-medium tracking-tight text-white mb-8">Blog</h1>

      <div className="border-t border-zinc-800">
        {posts.map((p) => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className="block border-b border-zinc-800 py-6 hover:bg-zinc-900/40 -mx-6 px-6 transition-colors">
            <div className="flex justify-between items-baseline gap-4">
              <h2 className="text-zinc-100">{p.title}</h2>
              <time className="text-xs text-zinc-600 font-mono">{p.date}</time>
            </div>
            <p className="mt-1.5 text-sm text-zinc-500 leading-relaxed">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}