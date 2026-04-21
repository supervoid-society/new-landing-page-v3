import { authClient } from "../lib/auth/auth-client";

export default function Login() {
  return (
    <div className="bg-[#09090b] min-h-dvh">
      <div className="mx-auto max-w- px-6 md:px-10 lg:px-16 pt-40 md:pt-48 pb-24">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-start">
          <div>
            <div className="text- uppercase tracking-[0.2em] text-zinc-600 mb-8">
              supervoid / access
            </div>
            <h1 className="text-[clamp(72px,11vw,140px)] leading-[0.8] tracking-[-0.03em] font-medium text-zinc-100">
              Login
            </h1>
          </div>

          <div className="lg:pt-3">
            <p className="text- leading-relaxed text-zinc-400 max-w- mb-10">
              Workspace internal. Masuk dengan GitHub yang sudah join organisasi. Tanpa password, tanpa tracking.
            </p>
            <button
              onClick={() => authClient.signIn.social({ provider: "github", callbackURL: "/dashboard" })}
              className="h-11 px-5 bg-white text-black text- hover:opacity-90 active:opacity-80 transition-opacity"
            >
              Continue with GitHub →
            </button>
            <div className="mt-20 text- uppercase tracking-widest text-zinc-600 flex items-center gap-3">
              <span className="w-8 h-px bg-white/15" /> member only
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}