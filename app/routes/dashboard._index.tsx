import { Link, useLoaderData, Form, redirect } from "react-router";
import { getAuth } from "~/lib/auth/auth.server";

export async function loader({ request, context }: any) {
  const auth = getAuth(context);
  let session = null;
  try {
    session = await auth.api.getSession({ headers: request.headers });
  } catch (e) {
    console.error("getSession error:", e);
  }

  if (!session?.user) return redirect("/login");

  const { results } = await context.cloudflare.env.D1
   .prepare("SELECT id, slug, title, excerpt, body, author_id as authorId FROM posts WHERE author_id =?1 ORDER BY updated_at DESC")
   .bind(session.user.id)
   .all();

  return { posts: results?? [] };
}

export async function action({ request, context }: any) {
  const auth = getAuth(context);
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) return redirect("/login");

  const form = await request.formData();

  if (form.get("intent") === "delete") {
    const id = String(form.get("id"));
    await context.cloudflare.env.D1
     .prepare("DELETE FROM posts WHERE id =?1 AND author_id =?2")
     .bind(id, session.user.id)
     .run();
  }

  return null;
}

export default function DashboardIndex() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link to="/dashboard/new" className="bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-zinc-200 transition">
          New post
        </Link>
      </div>

      <div className="space-y-1">
        {posts.length === 0? (
          <p className="text-zinc-500 text-center py-12 border-t border-zinc-800">Belum ada post.</p>
        ) : (
          posts.map((post: any) => (
            <div key={post.id} className="flex justify-between items-center border-t border-zinc-800 py-4 group">
              <div>
                <p className="font-medium group-hover:text-white">{post.title}</p>
                <p className="text-sm text-zinc-500">/{post.slug}</p>
              </div>
              <div className="flex items-center gap-4">
                <Link to={`/dashboard/${post.id}/edit`} className="text-zinc-400 hover:text-white text-sm">Edit</Link>
                <Form method="post" onSubmit={(e) => { if (!confirm(`Hapus "${post.title}"?`)) e.preventDefault(); }}>
                  <input type="hidden" name="intent" value="delete" />
                  <input type="hidden" name="id" value={post.id} />
                  <button type="submit" className="text-zinc-500 hover:text-red-400 text-sm">Delete</button>
                </Form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}