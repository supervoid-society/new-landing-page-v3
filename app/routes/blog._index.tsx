import { Link, useLoaderData } from "react-router";

export const meta = () => [{ title: "Blog — Supervoid Society" }];

export async function loader({ context }: any) {
  const db = context.cloudflare.env.D1;

  // ambil post yang sudah publish, urut terbaru
  const { results } = await db.prepare(`
    SELECT slug, title, excerpt,
           strftime('%Y-%m-%d', published_at) as date
    FROM posts
    WHERE published_at IS NOT NULL
    ORDER BY published_at DESC
  `).all();

  return { posts: results || [] };
}

export default function Blog() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto w-full max-w-2xl px-6 pt-40 md:pt-48 pb-20">
      <h1 className="text-3xl font-medium tracking-tight text-white mb-8">Blog</h1>

      <div className="border-t border-zinc-800">
        {posts.length === 0? (
          <p className="py-12 text-zinc-500">Belum ada tulisan. Publish dari dashboard dulu.</p>
        ) : (
          posts.map((p: any) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="block border-b border-zinc-800 py-6 hover:bg-zinc-900/40 -mx-6 px-6 transition-colors"
            >
              <div className="flex justify-between items-baseline gap-4">
                <h2 className="text-zinc-100">{p.title}</h2>
                <time className="text-xs text-zinc-600 font-mono">{p.date}</time>
              </div>
              <p className="mt-1.5 text-sm text-zinc-500 leading-relaxed">{p.excerpt}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}