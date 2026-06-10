import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A.Hakan Demir | Full-Stack Developer",
  description:
    "Interactive pixel-art portfolio for A.Hakan Demir, full-stack web and mobile developer."
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
