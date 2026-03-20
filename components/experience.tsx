import { GeistMono } from "geist/font/mono";

const roles = [
  {
    company: "Lumity Media",
    title: "Software Developer Intern",
    dates: "Jan. 2026 \u2013 Present",
    bullets: [
      "Architected and built a full-stack web platform (Next.js, TypeScript, Node.js) with RESTful APIs, secure authentication, and a shared MySQL schema, supporting real-time data consistency across web and mobile systems used by 7,000+ users.",
      "Containerized multi-service architecture with Docker and implemented automated CI/CD via GitHub Actions, reducing deployment time by 40% and enabling reliable, reproducible production releases.",
    ],
  },
  {
    company: "Sherlocks.ai",
    title: "Software Engineer Intern",
    dates: "May 2025 \u2013 Aug. 2025",
    bullets: [
      "Developed scalable backend services and RESTful APIs using Python and TypeScript in a cloud-native environment, improving system response time by 20% while supporting production-scale relational and NoSQL data workflows.",
      "Deployed containerized services using Docker and Kubernetes and contributed to testing, debugging, and automation pipelines, reducing environment/setup overhead by 30% and improving system reliability.",
    ],
  },
];

function RoleCard({ role }: { role: (typeof roles)[number] }) {
  return (
    <div className="relative pl-6">
      {/* border removed */}

      <div>
        <div className="text-4xl font-semibold tracking-tighter text-black">
          {role.company}
        </div>
        <div className="text-2xl font-medium tracking-tighter text-black mt-1">
          {role.title}
        </div>
        <div className={`text-base tracking-tighter text-gray-500 mt-1 ${GeistMono.className}`}>
          {role.dates}
        </div>

        <ul className="mt-4 space-y-3">
          {role.bullets.map((bullet, i) => (
            <li
              key={i}
              className="text-sm tracking-tighter text-gray-700 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-black before:rounded-full"
            >
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <div id="experience" className="w-full flex flex-col items-center py-20 px-4">
      <div className="w-full max-w-3xl">
        <div className="flex flex-col gap-12">
          {roles.map((role) => (
            <RoleCard key={role.company} role={role} />
          ))}
        </div>
      </div>
    </div>
  );
}
