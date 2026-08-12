import { GeistMono } from "geist/font/mono";

const roles = [
  {
    company: "Lumity Media",
    title: "software developer intern",
    dates: "jan 2026 – present",
    accent: "text-cyan-400",
    stack:
      "next.js • typescript • node.js • mysql • docker • github actions",
    bullets: [
      "Architected and built a full-stack web platform (Next.js, TypeScript, Node.js) with RESTful APIs, secure authentication, and a shared MySQL schema, supporting real-time data consistency across web and mobile systems used by 7,000+ users.",
      "Containerized multi-service architecture with Docker and implemented automated CI/CD via GitHub Actions, reducing deployment time by 40% and enabling reliable, reproducible production releases.",
    ],
  },
  {
    company: "Sherlocks.ai",
    title: "software engineer intern",
    dates: "may 2025 – aug 2025",
    accent: "text-lime-300",
    stack: "python • typescript • docker • kubernetes • rest apis",
    bullets: [
      "Developed scalable backend services and RESTful APIs using Python and TypeScript in a cloud-native environment, improving system response time by 20% while supporting production-scale relational and NoSQL data workflows.",
      "Deployed containerized services using Docker and Kubernetes and contributed to testing, debugging, and automation pipelines, reducing environment/setup overhead by 30% and improving system reliability.",
    ],
  },
];

function RoleRow({
  role,
  reverse,
}: {
  role: (typeof roles)[number];
  reverse?: boolean;
}) {
  return (
    <div
      className={`flex flex-col ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-stretch gap-10`}
    >
      <div className="w-full lg:w-1/2 bg-black p-6 flex flex-col min-h-[350px]">
        <div className="flex-1 flex flex-col">
          <div
            className={`text-sm tracking-tighter text-gray-400 mb-10 ${GeistMono.className}`}
          >
            {role.dates}
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <h2 className="text-white text-5xl md:text-7xl font-medium tracking-tighter mb-4">
              {role.company}
            </h2>
            <p
              className={`${role.accent} text-2xl font-medium tracking-tighter text-right`}
            >
              {role.title}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-white border border-black border-dashed p-6 flex flex-col justify-between">
        <ul className="space-y-4">
          {role.bullets.map((bullet, i) => (
            <li
              key={i}
              className="text-sm tracking-tighter text-gray-700 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-black"
            >
              {bullet}
            </li>
          ))}
        </ul>
        <div
          className={`text-xs text-gray-400 mt-6 text-right ${GeistMono.className}`}
        >
          {role.stack}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <div id="experience" className="w-full py-10 flex flex-col gap-10">
      {roles.map((role, i) => (
        <RoleRow key={role.company} role={role} reverse={i % 2 === 1} />
      ))}
    </div>
  );
}
