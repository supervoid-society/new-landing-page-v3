import { Form, redirect } from "react-router";
import { useState } from "react";
import { getAuth } from "~/lib/auth/auth.server";
import Editor from "~/components/ui/editor";
import type { Route } from "./+types/dashboard.new";

export async function action({ request, context }: Route.ActionArgs) {
  const session = await getAuth(context).api.getSession({ headers: request.headers });
  if (!session) return redirect("/login");

  const fd = await request.formData();
  const title = String(fd.get("title") || "");
  const excerpt = String(fd.get("excerpt") || "");
  const body = String(fd.get("body") || "");
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  await context.cloudflare.env.D1.prepare(
    "INSERT INTO posts (slug, title, excerpt, body, author_id, published_at) VALUES (?1,?2,?3,?4,?5, datetime('now'))"
  ).bind(slug, title, excerpt, body, session.user.id).run();

  return redirect("/dashboard");
}

export default function New() {
  const [content, setContent] = useState<string>("");

  return (
    <Form method="post" className="space-y-6 text-white">
      <h1 className="text-2xl font-medium">New Post</h1>

      <input
        name="title"
        placeholder="Judul"
        required
        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3"
      />

      <input
        name="excerpt"
        placeholder="Excerpt singkat"
        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3"
      />

      <div className="mt-8">
        <Editor value={content} onChange={setContent} />
        <input type="hidden" name="body" value={content} />
      </div>

      <button className="rounded-full bg-white text-black px-5 py-2.5 text-sm">
        Publish
      </button>
    </Form>
  );
}