import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import { getAuth } from "~/lib/auth/auth.server";

// Better Auth butuh GET dan POST — jadi kita export loader + action
export async function loader({ request, context }: LoaderFunctionArgs) {
  // penting: pass cloudflare context biar env.D1 kebaca
  const auth = getAuth({ cloudflare: context.cloudflare } as any);
  return auth.handler(request);
}

export async function action({ request, context }: ActionFunctionArgs) {
  const auth = getAuth({ cloudflare: context.cloudflare } as any);
  return auth.handler(request);
}