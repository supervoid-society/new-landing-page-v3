import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import { getAuth } from "~/lib/auth/auth.server";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const auth = getAuth(context as any);
  return auth.handler(request);
}

export async function action({ request, context }: ActionFunctionArgs) {
  const auth = getAuth(context as any);
  return auth.handler(request);
}