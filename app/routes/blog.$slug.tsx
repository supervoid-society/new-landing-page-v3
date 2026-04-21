import { useLoaderData, Link } from "react-router";

export async function loader({ params, context }: any) {
  const db = context.cloudflare.env.D1;

  const { results } = await db.prepare(`
    SELECT title, body, excerpt,
           strftime('%d %b %Y', published_at) as date
    FROM posts
    WHERE slug =?1
    LIMIT 1
  `).bind(params.slug).all();

  if (!results?.length) {
    throw new Response("Not Found", { status: 404 });
  }

  return { post: results[0] };
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto w-full max-w-2xl px-6 pt-40 md:pt-48 pb-20">
      <Link to="/blog" className="text-sm text-zinc-500 hover:text-zinc-300">
        ← Kembali
      </Link>

      <h1 className="mt-8 text-3xl md:text-4xl font-medium leading-tight tracking-tight text-white">
        {post.title}
      </h1>
      <div className="mt-3 text-xs text-zinc-500 font-mono">{post.date}</div>

      {/* render HTML dari TipTap editor */}
      <div
        className="mt-8 prose prose-invert prose-zinc max-w-none
                   prose-p:leading-8 prose-p:text-zinc-300
                   prose-headings:text-white prose-strong:text-white"
        dangerouslySetInnerHTML={{ __html: post.body || "" }}
      />
    </div>
  );
}