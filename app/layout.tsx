import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hakandemir.com.tr"),
  title: {
    default: "A.Hakan Demir | Software Engineer",
    template: "%s | A.Hakan Demir"
  },
  description:
    "Interactive pixel-art portfolio for A.Hakan Demir, a software engineer building web apps, mobile products, blockchain systems and AI workflows.",
  keywords: [
    "A.Hakan Demir",
    "Software Engineer",
    "Next.js",
    "React Native",
    "Blockchain",
    "AI workflows",
    "Sui",
  ],
  authors: [{ name: "A.Hakan Demir", url: "https://hakandemir.com.tr" }],
  creator: "A.Hakan Demir",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "A.Hakan Demir | Software Engineer",
    description:
      "Interactive pixel-art portfolio for web apps, mobile products, blockchain systems and AI workflows.",
    url: "https://hakandemir.com.tr",
    siteName: "A.Hakan Demir Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "A.Hakan Demir | Software Engineer",
    description:
      "Interactive pixel-art portfolio for web apps, mobile products, blockchain systems and AI workflows.",
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
