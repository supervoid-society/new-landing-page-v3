import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "react-router";
import { getAuth } from "~/lib/auth/auth.server";
import type { Route } from "./+types/root";
import "./tailwind.css";

export async function loader({ request, context }: Route.LoaderArgs) {
  const session = await getAuth(context).api.getSession({ headers: request.headers }).catch(() => null);
  return { user: session?.user?? null };
}

export default function App() {
  const { user } = useLoaderData<typeof loader>();
  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/members", label: "Members" },
    { to: "/blog", label: "Blog" },
  ];

  return (
    <html lang="id" className="bg-[#09090b]">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta /><Links />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#09090b] text-zinc-100 antialiased" style={{ fontFamily: "Outfit,system-ui" }}>
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40">
          <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10">
            {links.map(i => (
              <a key={i.to} href={i.to} className="px-4 py-1.5 text- text-zinc-300 rounded-full hover:text-white hover:bg-white/5">
                {i.label}
              </a>
            ))}
            <div className="w-px h-4 bg-white/10 mx-1" />
            {user? (
              <a href="/dashboard" className="px-4 py-1.5 text- rounded-full bg-white text-black font-medium">Dashboard</a>
            ) : (
              <a href="/login" className="px-4 py-1.5 text- rounded-full text-zinc-300 hover:text-white hover:bg-white/5">Login</a>
            )}
          </div>
        </nav>

        {/* HAPUS pt-28 di sini */}
        <main>
          <Outlet />
        </main>

        <ScrollRestoration /><Scripts />
      </body>
    </html>
  );
}