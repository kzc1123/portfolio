import { GeistMono } from "geist/font/mono";
import { Download } from "lucide-react";
import { CountUp } from "@/components/count-up";

const courses = [
  "Database Management",
  "Software QA & Testing",
  "Probability & Statistics",
  "Machine Learning",
  "Artificial Intelligence",
  "Social Media Mining",
  "Computer Systems Security",
  "Human Computer Interaction",
];

const skills = [
  {
    group: "Languages",
    items: "Python, Java, C, C++, JavaScript, TypeScript, SQL, NoSQL",
  },
  {
    group: "Frameworks",
    items: "React, Node.js, TensorFlow, PyTorch, Scikit-learn",
  },
  { group: "Cloud", items: "AWS, Azure, GCP, Docker, Kubernetes" },
  { group: "Tools", items: "Git, GitHub Actions, Postman, JIRA" },
] as const;

const gpa = { from: 0, to: 3.91, decimals: 2 } as const;

function DegreeCard() {
  return (
    <div className="w-full lg:w-1/2 bg-black text-white p-6 flex flex-col justify-between gap-16 min-h-[460px]">
      <div className="text-2xl font-medium tracking-tighter">
        <span className="font-light">B.S. in</span> Computer Science
      </div>

      <h2 className="text-5xl md:text-7xl font-medium tracking-tighter">
        Arizona State University
        <br />
        <span style={{ color: "#FFC627" }}>
          Go{" "}
          <span className={`font-medium text-gray-400 ${GeistMono.className}`}>
            Devils.
          </span>
        </span>
      </h2>

      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="text-6xl md:text-7xl font-medium tracking-tighter tabular-nums leading-none">
            <CountUp value={gpa} />
          </div>
          <p
            className={`mt-3 text-xs tracking-tighter text-gray-400 ${GeistMono.className}`}
          >
            GPA out of 4.0
          </p>
        </div>
        <div
          className={`text-sm tracking-tighter text-right ${GeistMono.className}`}
        >
          <p className="text-gray-400">Tempe, AZ</p>
          <p>Aug 2023 &ndash; May 2027</p>
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <div id="education" className="w-full py-10">
      <div className="flex flex-col lg:flex-row items-stretch gap-10">
        <DegreeCard />

        <div className="w-full lg:w-1/2 bg-white border border-black border-dashed p-6 flex flex-col">
          <div className="text-sm uppercase tracking-wider text-gray-400 mb-4">
            Coursework
          </div>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-0 flex-1 ${GeistMono.className}`}
          >
            {courses.map((course) => (
              <div
                key={course}
                className="border border-gray-300 p-4 flex items-center text-sm tracking-tighter text-gray-600"
              >
                {course}
              </div>
            ))}
          </div>
          <div className="text-sm uppercase tracking-wider text-gray-400 mt-8 mb-4">
            Skills
          </div>
          <dl
            className={`flex flex-col border-t border-gray-300 text-sm tracking-tighter ${GeistMono.className}`}
          >
            {skills.map((skill) => (
              <div
                key={skill.group}
                className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-gray-300 py-3"
              >
                <dt className="text-gray-400">{skill.group}</dt>
                <dd className="text-gray-700">{skill.items}</dd>
              </div>
            ))}
          </dl>
          <div className="flex justify-between items-center mt-6">
            <span className={`text-xs text-gray-400 ${GeistMono.className}`}>
              8 courses &amp; counting
            </span>
            <a
              href="/Resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium tracking-tighter bg-black text-white border border-black px-5 py-2.5 rounded-full hover:bg-white hover:text-black active:scale-[0.98] transition-colors duration-200"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              My resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
