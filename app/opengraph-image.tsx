import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio/profile";

export const runtime = "nodejs";
export const alt = "A.Hakan Demir — frontend-focused software engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function toDataUrl(data: Buffer, type: "image/png") {
  return `data:${type};base64,${data.toString("base64")}`;
}

export default async function OpenGraphImage() {
  const [background, logo, font] = await Promise.all([
    readFile(join(process.cwd(), "public/WB/Background.png")),
    readFile(join(process.cwd(), "public/brand/hd-logo.png")),
    readFile(
      join(
        process.cwd(),
        "Pixelify_Sans/static/PixelifySans-Bold.ttf"
      )
    ),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#120d0b",
          color: "#f8f3ee",
          fontFamily: "Pixelify Sans",
        }}
      >
        <img
          src={toDataUrl(background, "image/png")}
          width={1200}
          height={630}
          alt=""
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.52,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: "flex",
            background:
              "linear-gradient(90deg, rgba(11,8,13,0.98) 0%, rgba(11,8,13,0.91) 49%, rgba(11,8,13,0.55) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 34,
            right: 34,
            bottom: 34,
            left: 34,
            display: "flex",
            border: "4px solid rgba(233,167,95,0.78)",
            boxShadow: "0 0 0 8px rgba(18,13,11,0.88)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "68px 82px",
          }}
        >
          <div
            style={{
              width: 720,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#75f4ff",
                fontSize: 25,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              Interactive pixel-art portfolio
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 68,
                lineHeight: 0.98,
                color: "#f8f3ee",
                marginBottom: 24,
              }}
            >
              {profile.shortName}
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: 650,
                color: "#ffd18a",
                fontSize: 33,
                lineHeight: 1.15,
                marginBottom: 38,
              }}
            >
              {profile.title}
            </div>
            <div
              style={{
                display: "flex",
                color: "#e4d9cf",
                fontSize: 23,
                letterSpacing: "0.06em",
              }}
            >
              React · Next.js · TypeScript · React Native
            </div>
          </div>

          <div
            style={{
              width: 290,
              height: 290,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(12,8,10,0.84)",
              border: "4px solid rgba(117,244,255,0.64)",
              boxShadow: "12px 12px 0 rgba(18,13,11,0.88)",
            }}
          >
            <img
              src={toDataUrl(logo, "image/png")}
              width={270}
              height={270}
              alt="HD pixel-art logo"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Pixelify Sans",
          data: font,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
