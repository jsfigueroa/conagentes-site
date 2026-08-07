import { ImageResponse } from "next/og";
import { getPage } from "@/content/pages";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "conagentes";

/**
 * Per-page Open Graph image — a branded, title-specific preview for every
 * data-driven marketing page (social shares + AI answer citations). Atardecer
 * palette, generated from the page registry at build time.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = getPage(slug.join("/"));
  const title = page?.title ?? "Agentes IA que venden por WhatsApp";
  const eyebrow =
    page?.eyebrow ?? (page?.experience === "hotel" ? "Hoteles" : "conagentes");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background:
            "linear-gradient(135deg, #111110 0%, #1a1a18 50%, #111110 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo + wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "40px",
          }}
        >
          <svg width="42" height="42" viewBox="0 0 200 200" fill="none">
            <rect x="28" y="100" width="80" height="80" rx="10" fill="#e8e5df" />
            <rect x="68" y="60" width="80" height="80" rx="10" fill="#e8e5df" />
            <rect x="108" y="20" width="80" height="80" rx="10" fill="#ff8121" />
          </svg>
          <span
            style={{
              fontSize: "30px",
              fontWeight: 700,
              color: "#e8e5df",
              letterSpacing: "-0.02em",
            }}
          >
            conagentes
          </span>
        </div>

        {/* Eyebrow */}
        <span
          style={{
            fontSize: "22px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "#ff8121",
            marginBottom: "20px",
          }}
        >
          {eyebrow}
        </span>

        {/* Title */}
        <h1
          style={{
            fontSize: title.length > 48 ? "54px" : "66px",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.08,
            margin: 0,
            letterSpacing: "-0.03em",
            maxWidth: "1000px",
          }}
        >
          {title}
        </h1>

        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "6px",
            background: "linear-gradient(90deg, #ff8121 0%, #ff4d8d 100%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
