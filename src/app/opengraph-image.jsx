import { ImageResponse } from "next/og";
import { MARK_PATH } from "@/components/VantaMark";

export const alt = "Starlight Vanta, a username generator that runs in your browser";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SAMPLES = ["veyla", "corvane", "lumis", "tessaly", "ondra", "kaveth"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", background: "#050505", color: "#f2efff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg viewBox="8 8 50 48" width="64" height="62">
            <path d={MARK_PATH} fill="#f2efff" />
            <rect x="46" y="46" width="8" height="5" rx="1" fill="#8b5cf6" />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>Starlight Vanta</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, maxWidth: 900 }}>Usernames you can actually say out loud.</div>
          <div style={{ fontSize: 28, color: "rgba(242,239,255,0.55)" }}>Generated on your device. Nothing you make is uploaded.</div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {SAMPLES.map((name) => (
            <div key={name} style={{ display: "flex", padding: "10px 20px", borderRadius: 999, border: "1px solid rgba(139,92,246,0.45)", fontSize: 24, color: "#ddd6fe" }}>{name}</div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
