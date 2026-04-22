import { Link, useLoaderData, Form } from "react-router";
import { getAuth } from "~/lib/auth/auth.server";
import { authClient } from "~/lib/auth/auth-client"; // <-- tambah ini

export async function loader({ request, context }: any) {
  const auth = getAuth(context);
  const session = await auth.api.getSession({ headers: request.headers });
  
  if (!session?.user) {
    throw new Response(null, {
      status: 302,
      headers: { Location: "/login" },
    });
  }

  const { results } = await context.cloudflare.env.D1.prepare(
    `SELECT id, slug, title, excerpt, body, author_id as authorId, published_at as publishedAt, updated_at as updatedAt 
     FROM posts 
     WHERE author_id = ?1 
     ORDER BY updated_at DESC, published_at DESC`
  ).bind(session.user.id).all();

  return { posts: results ?? [], user: session.user };
}

export default function Dashboard() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-medium text-white">Posts</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => authClient.signOut({ 
              fetchOptions: { onSuccess: () => window.location.href = "/" } 
            })}
            className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors"
          >
            Logout
          </button>
          <Link
            to="/dashboard/new"
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
          >
            New Post
          </Link>
        </div>
      </div>

      <div className="border-t border-zinc-800">
        {posts.length === 0 ? (
          <p className="py-16 text-center text-zinc-500">Belum ada tulisan.</p>
        ) : (
          posts.map((p: any) => (
            <Link
              key={p.id}
              to={`/dashboard/${p.id}/edit`}
              className="flex items-center justify-between border-b border-zinc-800 py-5 hover:bg-zinc-900/40 -mx-6 px-6"
            >
              <div>
                <div className="text-zinc-100">{p.title}</div>
                <div className="mt-1 text-xs text-zinc-600 font-mono">
                  /{p.slug} • {p.publishedAt ? "Published" : "Draft"}
                </div>
              </div>
              <div className="text-zinc-600">→</div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}