import { ImageResponse } from "next/og";
import { getPage } from "@/content/pages";

export const runtime = "edge";

/**
 * Dynamic per-page Open Graph image: GET /og?slug=<page-slug>.
 * A dedicated route handler (not the metadata-file convention) so it never
 * collides with the (marketing) [...slug] catch-all. Title-specific, Atardecer
 * palette — used by every data-driven marketing page for social + AI previews.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") ?? "";
  const page = getPage(slug);
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

        <div
          style={{
            display: "flex",
            fontSize: title.length > 48 ? "54px" : "66px",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>

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
    { width: 1200, height: 630 },
  );
}
