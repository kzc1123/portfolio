import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Kshitiz Chaurasia, software engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#09090b";
const PAPER = "#fafafa";
const MUTED = "#71717a";
const SEAM = "rgba(128, 128, 128, 0.35)";
const NAME = "KSHITIZ";

// Same tiles and colors the hero flap board cycles through.
const HOBBIES = [
  { text: "I CODE", tile: "#09090b", ink: "#fafafa" },
  { text: "I COOK", tile: "#bef264", ink: "#09090b" },
  { text: "I GOLF", tile: "#fb7185", ink: "#09090b" },
  { text: "I TRAVEL", tile: "#60a5fa", ink: "#09090b" },
] as const;

const FONT_DIR = join(process.cwd(), "node_modules/geist/dist/fonts");

function FlapTile({ ch }: { ch: string }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 128,
        height: 172,
        background: INK,
        color: PAPER,
        borderRadius: 10,
        fontSize: 124,
        fontFamily: "Geist",
      }}
    >
      {ch}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 85,
          height: 2,
          background: SEAM,
        }}
      />
    </div>
  );
}

export default async function OpengraphImage() {
  const [sans, mono] = await Promise.all([
    readFile(join(FONT_DIR, "geist-sans/Geist-Medium.ttf")),
    readFile(join(FONT_DIR, "geist-mono/GeistMono-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "56px 80px",
          background: PAPER,
          color: INK,
          fontFamily: "Geist Mono",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: MUTED }}>
          <span>©2026</span>
          <span>PORTFOLIO</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", gap: 12 }}>
            {NAME.split("").map((ch, i) => (
              <FlapTile key={i} ch={ch} />
            ))}
          </div>
          <div style={{ display: "flex", fontFamily: "Geist", fontSize: 46, letterSpacing: "-0.04em" }}>
            Software engineer. CS at Arizona State.
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, fontSize: 22 }}>
          {HOBBIES.map((h) => (
            <div
              key={h.text}
              style={{ display: "flex", padding: "8px 14px", borderRadius: 6, background: h.tile, color: h.ink }}
            >
              {h.text}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: sans, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    }
  );
}
