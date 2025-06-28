import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Dynamiqtec";
  const locale = searchParams.get("locale") || "en";

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#000",
          color: "white",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "Inter, sans-serif",
          backgroundImage: "linear-gradient(to bottom, #000, #111)",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 600, marginBottom: 30 }}>
          {locale === "fr" ? "Jean-Eudes Assogba" : "Jean-Eudes Assogba"}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            lineHeight: 1.2,
            maxWidth: "1000px",
            wordBreak: "break-word",
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: "auto",
            fontSize: 24,
            opacity: 0.5,
          }}
        >
          dynamiqtec.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
