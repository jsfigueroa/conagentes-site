import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "conagentes — Agentes IA que venden por WhatsApp";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          background: "linear-gradient(135deg, #111110 0%, #1a1a18 50%, #111110 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
          <svg width="48" height="48" viewBox="0 0 200 200" fill="none">
            <rect x="28" y="100" width="80" height="80" rx="10" fill="#e8e5df" />
            <rect x="68" y="60" width="80" height="80" rx="10" fill="#e8e5df" />
            <rect x="108" y="20" width="80" height="80" rx="10" fill="#ff8121" />
          </svg>
          <span
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#e8e5df",
              letterSpacing: "-0.02em",
            }}
          >
            conagentes
          </span>
        </div>

        <h1
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            margin: 0,
            marginBottom: "24px",
            letterSpacing: "-0.03em",
            maxWidth: "900px",
          }}
        >
          Agentes IA que venden
          <br />
          por WhatsApp
        </h1>

        <p
          style={{
            fontSize: "28px",
            color: "#a3a09a",
            margin: 0,
            lineHeight: 1.4,
            maxWidth: "740px",
          }}
        >
          Reservan, suben el ticket y recuperan clientes 24/7. Para hoteles y
          pymes en Colombia y Latinoamérica.
        </p>

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
