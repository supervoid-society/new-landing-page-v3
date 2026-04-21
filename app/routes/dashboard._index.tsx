import { Link, useLoaderData } from "react-router";
import type { AppLoadContext } from "react-router";

export async function loader({ context }: { context: AppLoadContext }) {
  return { posts: [] };
}

export default function Dashboard() {
  const { posts } = useLoaderData() as any;
  return (
    <div className="p-8 text-white">
      <h1>Dashboard</h1>
      {posts.map((p: any) => <div key={p.id}>{p.title}</div>)}
      <Link to="/dashboard/new">New</Link>
    </div>
  );
}