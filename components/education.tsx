import { GeistMono } from "geist/font/mono";

const courses = [
  "database management",
  "software qa & testing",
  "probability & statistics",
  "machine learning",
  "artificial intelligence",
  "social media mining",
  "computer systems security",
  "human computer interaction",
];

export default function Education() {
  return (
    <div id="education" className="w-full py-10">
      <div className="flex flex-col lg:flex-row items-stretch gap-10">
        <div className="w-full lg:w-1/2 bg-black p-6 flex flex-col min-h-[420px]">
          <div className="flex-1 flex flex-col">
            <div className="text-2xl font-medium tracking-tighter text-white mb-10">
              <span className="font-light">b.s. in</span> computer science
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-white text-5xl md:text-7xl font-medium tracking-tighter mb-4">
                  Arizona State University
                  <br />
                  <span style={{ color: "#FFC627" }}>
                    go{" "}
                    <span
                      className={`font-medium text-gray-400 ${GeistMono.className}`}
                    >
                      devils.
                    </span>
                  </span>
                </h2>
              </div>
              <div>
                <p
                  className={`text-gray-400 text-sm tracking-tighter text-right ${GeistMono.className}`}
                >
                  tempe, az
                </p>
                <p
                  className={`text-white text-sm tracking-tighter text-right ${GeistMono.className}`}
                >
                  aug 2023 &ndash; dec 2026 &bull; gpa 3.91 / 4.0
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 bg-white border border-black border-dashed p-6 flex flex-col">
          <div className="text-sm uppercase tracking-wider text-gray-400 mb-4">
            coursework
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
          <div className="flex justify-between items-center mt-6">
            <span className={`text-xs text-gray-400 ${GeistMono.className}`}>
              8 courses &amp; counting
            </span>
            <a
              href="/Resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-colors duration-200"
            >
              my resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
