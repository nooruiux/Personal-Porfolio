import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated social-share card. Uses brand tokens' literal values (this runs
 *  outside the DOM, so CSS variables aren't available here). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #17151F 0%, #4C32C3 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, opacity: 0.85 }}>{site.role}</div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 12 }}>
          {site.name}
        </div>
        <div style={{ fontSize: 30, opacity: 0.8, marginTop: 24, maxWidth: 900 }}>
          {site.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
