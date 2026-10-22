import { CSSProperties } from "react";

export default function Hacks() {
  return (
    <div className="flex flex-col pt-10 pb-6">
      <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-medium tracking-[-0.08em] md:tracking-[-0.1em] leading-[0.9] text-center w-full relative break-words">
        I love{" "}
        <span
          className="relative bg-clip-text text-transparent pr-2 pb-[0.12em] inline-block"
          style={{
            backgroundImage: "url(/clip.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            display: "inline-block",
            lineHeight: "0.9",
            wordBreak: "break-word",
          } as CSSProperties}
        >
          building
        </span>
      </h1>
    </div>
  );
}
