import { ImageResponse } from "next/og";

// Dedicated square brand logo for schema.org Organization/publisher `logo`
// (Google rich-results logo guidance prefers a proper logo over a 1200x630 OG
// image). Rendered to PNG so it works everywhere. (CON-025, B1.6)

export const runtime = "edge";

const SIZE = 512;

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1c1a17",
        }}
      >
        <svg width="320" height="320" viewBox="0 0 200 200" fill="none">
          <rect x="28" y="100" width="80" height="80" rx="10" fill="#e8e5df" />
          <rect x="68" y="60" width="80" height="80" rx="10" fill="#e8e5df" />
          <rect x="108" y="20" width="80" height="80" rx="10" fill="#ff8121" />
        </svg>
      </div>
    ),
    { width: SIZE, height: SIZE }
  );
}
