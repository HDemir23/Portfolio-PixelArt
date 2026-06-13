import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { profile } from "@/data/portfolio/profile";
import "./globals.css";

const pixelifySans = localFont({
  src: "../Pixelify_Sans/PixelifySans-VariableFont_wght.ttf",
  variable: "--font-pixelify-sans",
  weight: "400 700",
  style: "normal",
  display: "swap",
});

const siteUrl = "https://hakandemir.com.tr";
const siteDescription =
  "Interactive pixel-art portfolio for A.Hakan Demir, a frontend-focused software engineer building React, Next.js, TypeScript and full-stack web apps.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hakandemir.com.tr"),
  applicationName: "A.Hakan Demir Portfolio",
  title: {
    default: "A.Hakan Demir | Software Engineer",
    template: "%s | A.Hakan Demir"
  },
  description: siteDescription,
  keywords: [
    "A.Hakan Demir",
    "Ahmet Hakan Demir",
    "Software Engineer",
    "Frontend Developer",
    "Mobile Developer",
    "Next.js",
    "React",
    "React Native",
    "Full-stack engineer",
    "Freelance web developer",
    "Technical instructor",
    "Sui Move",
    "AI-assisted workflows",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: "A.Hakan Demir",
  publisher: "A.Hakan Demir",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "A.Hakan Demir | Software Engineer",
    description: siteDescription,
    url: siteUrl,
    siteName: "A.Hakan Demir Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/WB/Background.png",
        width: 2816,
        height: 1536,
        alt: "A.Hakan Demir interactive pixel-art studio portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A.Hakan Demir | Software Engineer",
    description: siteDescription,
    images: ["/WB/Background.png"],
  },
  category: "portfolio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#120d0b",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      alternateName: profile.shortName,
      jobTitle: profile.title,
      email: profile.email,
      telephone: profile.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ankara",
        addressCountry: "TR",
      },
      url: siteUrl,
      sameAs: [profile.github, profile.linkedin],
      knowsAbout: [
        "Frontend engineering",
        "Next.js",
        "React",
        "TypeScript",
        "Full-stack web apps",
        "React Native",
        "Technical workshops",
        "Sui Move",
        "AI-assisted workflows",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "A.Hakan Demir Portfolio",
      description: siteDescription,
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pixelifySans.variable} ${pixelifySans.className}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
