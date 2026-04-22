import { Outlet, redirect } from "react-router";
import { getAuth } from "~/lib/auth/auth.server";
import type { Route } from "./+types/dashboard";

export async function loader({ request, context }: Route.LoaderArgs) {
  const session = await getAuth(context).api.getSession({ headers: request.headers });
  if (!session) return redirect("/login");
  return null;
}

export default function DashboardLayout() {
  return (
    <div className="min-h-dvh bg-[#09090b]">
      <div className="mx-auto w-full max-w-5xl px-6 pt-40 md:pt-48 pb-24">
        <Outlet />
      </div>
    </div>
  );
}