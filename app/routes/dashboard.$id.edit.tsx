import { Form, useLoaderData, redirect } from "react-router";
import { useState } from "react";
import { getAuth } from "~/lib/auth/auth.server";
import Editor from "~/components/ui/editor";
import type { Route } from "./+types/dashboard.$id.edit";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const session = await getAuth(context).api.getSession({ headers: request.headers });
  if (!session) return redirect("/login");

  const { results } = await context.cloudflare.env.D1.prepare(
    "SELECT * FROM posts WHERE id =?1"
  ).bind(params.id).all();

  return { post: results[0] };
}

export async function action({ request, params, context }: Route.ActionArgs) {
  const session = await getAuth(context).api.getSession({ headers: request.headers });
  if (!session) return redirect("/login");

  const fd = await request.formData();

  if (fd.get("_method") === "delete") {
    await context.cloudflare.env.D1.prepare(
      "DELETE FROM posts WHERE id =?1"
    ).bind(params.id).run();
    return redirect("/dashboard");
  }

  await context.cloudflare.env.D1.prepare(
    "UPDATE posts SET title =?1, excerpt =?2, body =?3 WHERE id =?4"
  ).bind(
    fd.get("title"),
    fd.get("excerpt"),
    fd.get("body"),
    params.id
  ).run();

  return redirect("/dashboard");
}

export default function Edit() {
  const { post } = useLoaderData<typeof loader>();
  const [content, setContent] = useState<string>(post.body || "");

  return (
    <Form method="post" className="space-y-6 text-white">
      <h1 className="text-2xl font-medium">Edit: {post.title}</h1>

      <input
        name="title"
        defaultValue={post.title}
        required
        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3"
      />

      <input
        name="excerpt"
        defaultValue={post.excerpt}
        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3"
      />

      <div className="mt-8">
        <Editor value={content} onChange={setContent} />
        <input type="hidden" name="body" value={content} />
      </div>

      <div className="flex gap-3">
        <button className="rounded-full bg-white text-black px-5 py-2.5 text-sm">
          Save
        </button>
        <button
          name="_method"
          value="delete"
          className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900"
        >
          Delete
        </button>
      </div>
    </Form>
  );
}