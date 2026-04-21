import { GithubLogo, XLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";

const members = [
  {
    name: "Alya Paramitha",
    role: "Web architect. Obsesi Core Web Vitals.",
    joined: "2025-06-12",
    avatar: "https://picsum.photos/seed/alya/80/80",
    socials: { github: "#", x: "#", ig: "#" },
  },
  {
    name: "Rafi Mahendra",
    role: "Android. Compose performance nerd.",
    joined: "2025-06-19",
    avatar: "https://picsum.photos/seed/rafi/80/80",
    socials: { github: "#", linkedin: "#" },
  },
  {
    name: "Kenzo Wijaya",
    role: "Cyber. Threat modeling & reverse.",
    joined: "2025-07-03",
    avatar: "https://picsum.photos/seed/kenzo/80/80",
    socials: { github: "#", x: "#" },
  },
  {
    name: "Nadia Safira",
    role: "AI/ML. Tiny models, fast infer.",
    joined: "2025-07-21",
    avatar: "https://picsum.photos/seed/nadia/80/80",
    socials: { github: "#", linkedin: "#" },
  },
  {
    name: "Dimas Prakoso",
    role: "Full-stack. Edge runtimes.",
    joined: "2025-08-08",
    avatar: "https://picsum.photos/seed/dimas/80/80",
    socials: { github: "#", ig: "#" },
  },
  {
    name: "Saskia Larasati",
    role: "Design engineer. Systems & tokens.",
    joined: "2025-08-14",
    avatar: "https://picsum.photos/seed/saskia/80/80",
    socials: { x: "#", ig: "#" },
  },
];

export default function Members() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-20">
      <h1 className="text-3xl font-medium tracking-tight text-white">Members</h1>

      <div className="mt-10 border-t border-zinc-800">
        {members.map((m) => (
          <div key={m.name} className="group border-b border-zinc-800 py-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={m.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
                <div>
                  <div className="text- text-zinc-100">{m.name}</div>
                  <div className="mt-0.5 text-sm leading-snug text-zinc-500">{m.role}</div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <time className="hidden text-xs text-zinc-600 sm:block" style={{ fontFamily: "JetBrains Mono" }}>
                  {m.joined}
                </time>
                <div className="flex items-center gap-2.5 text-zinc-500">
                  {m.socials.github && (
                    <a href={m.socials.github} className="hover:text-white transition-colors">
                      <GithubLogo size={16} />
                    </a>
                  )}
                  {m.socials.x && (
                    <a href={m.socials.x} className="hover:text-white transition-colors">
                      <XLogo size={16} />
                    </a>
                  )}
                  {m.socials.ig && (
                    <a href={m.socials.ig} className="hover:text-white transition-colors">
                      <InstagramLogo size={16} />
                    </a>
                  )}
                  {m.socials.linkedin && (
                    <a href={m.socials.linkedin} className="hover:text-white transition-colors">
                      <LinkedinLogo size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
