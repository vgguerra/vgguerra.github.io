import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0a09",
          color: "#fafaf9",
          fontSize: 120,
          fontWeight: 600,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          letterSpacing: "-0.05em",
        }}
      >
        v
      </div>
    ),
    { ...size }
  );
}
