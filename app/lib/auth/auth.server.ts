import { betterAuth } from "better-auth";
import { Kysely, CamelCasePlugin } from "kysely";
import { D1Dialect } from "kysely-d1";
import { createAuthMiddleware } from "better-auth/api";
import type { AppLoadContext } from "react-router";

interface Env {
  D1: D1Database;
  BETTER_AUTH_API_KEY: string;
  BETTER_AUTH_URL: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  GITHUB_ORG: string;
}

// cache biar tidak bikin Kysely baru tiap request (ini penyebab crash di Windows)
const authCache = new WeakMap<D1Database, any>();

export function getAuth(ctx: AppLoadContext): any {
  const env = ctx.cloudflare.env as Env;

  if (!env.D1) {
    throw new Error("D1 binding 'D1' tidak ditemukan di wrangler.json");
  }
  if (!env.BETTER_AUTH_API_KEY || env.BETTER_AUTH_API_KEY.length < 32) {
    throw new Error("BETTER_AUTH_API_KEY harus minimal 32 karakter - cek .dev.vars");
  }

  // pakai cache
  if (authCache.has(env.D1)) {
    return authCache.get(env.D1);
  }

  const auth = betterAuth({
    database: {
      db: new Kysely({
        dialect: new D1Dialect({ database: env.D1 }),
        plugins: [new CamelCasePlugin()],
      }),
      type: "sqlite",
    },
    secret: env.BETTER_AUTH_API_KEY,
    baseURL: env.BETTER_AUTH_URL,
    emailAndPassword: { enabled: false },
    socialProviders: {
      github: {
        clientId: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
        scope: ["read:user", "read:org"],
      },
    },
    plugins: [
      {
        id: "org-guard",
        hooks: {
          after: [
            {
              matcher: (c) => c.path === "/callback/github",
              handler: createAuthMiddleware(async (c) => {
                const session = c.context.newSession;
                if (!session?.user) return;

                const account: any = await c.context.adapter.findOne({
                  model: "account",
                  where: [{ field: "userId", value: session.user.id }],
                });

                let orgs: { login: string }[] = [];
                try {
                  const res = await fetch("https://api.github.com/user/orgs", {
                    headers: {
                      Authorization: `Bearer ${account?.accessToken}`,
                      "User-Agent": "supervoid",
                    },
                  });
                  orgs = await res.json();
                } catch {
                  orgs = [];
                }

                const isMember = orgs.some(
                  (o) => o.login.toLowerCase() === env.GITHUB_ORG.toLowerCase()
                );

                if (!isMember) {
                  await c.context.adapter.delete({
                    model: "user",
                    where: [{ field: "id", value: session.user.id }],
                  });
                  throw c.error(403, { message: "Not in organization" });
                }
              }),
            },
          ],
        },
      },
    ],
  });

  authCache.set(env.D1, auth);
  return auth;
}