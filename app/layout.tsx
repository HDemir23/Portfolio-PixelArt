import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A.Hakan Demir | Software Engineer",
  description:
    "Interactive pixel-art portfolio for A.Hakan Demir, a software engineer building web apps, mobile products, blockchain systems and AI workflows."
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
