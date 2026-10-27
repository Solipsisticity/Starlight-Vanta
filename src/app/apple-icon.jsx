import { ImageResponse } from "next/og";
import { MARK_PATH } from "@/components/VantaMark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0c" }}>
        <svg viewBox="0 0 64 64" width="132" height="132">
          <path d={MARK_PATH} fill="#f2efff" />
          <rect x="46" y="46" width="8" height="5" rx="1" fill="#8b5cf6" />
        </svg>
      </div>
    ),
    size,
  );
}
