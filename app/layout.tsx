import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import CookieNotice from "@/components/CookieNotice";
import { profile } from "@/data/portfolio/profile";
import { siteConfig } from "@/data/portfolio/site";
import "./globals.css";

const pixelifySans = localFont({
  src: "../Pixelify_Sans/PixelifySans-VariableFont_wght.ttf",
  variable: "--font-pixelify-sans",
  weight: "400 700",
  style: "normal",
  display: "swap",
});

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: "%s | A.Hakan Demir"
  },
  description: siteConfig.description,
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
  authors: [{ name: profile.name, url: siteConfig.url }],
  creator: "A.Hakan Demir",
  publisher: "A.Hakan Demir",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/brand/hd-logo-192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/brand/hd-logo-180.png", type: "image/png", sizes: "180x180" },
    ],
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: siteConfig.socialImage,
        width: 1200,
        height: 630,
        alt: "A.Hakan Demir — frontend-focused software engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.socialImage],
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.shortName,
    statusBarStyle: "black-translucent",
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
      "@id": `${siteConfig.url}/#person`,
      name: profile.name,
      alternateName: profile.shortName,
      jobTitle: profile.title,
      email: profile.email,
      telephone: profile.phone,
      image: `${siteConfig.url}/brand/hd-logo-512.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ankara",
        addressCountry: "TR",
      },
      url: siteConfig.url,
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
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      publisher: {
        "@id": `${siteConfig.url}/#person`,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteConfig.url}/#webpage`,
      url: siteConfig.url,
      name: siteConfig.title,
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      mainEntity: {
        "@id": `${siteConfig.url}/#person`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
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
    <html lang={siteConfig.language}>
      <body className={`${pixelifySans.variable} ${pixelifySans.className}`}>
        {gtmId ? (
          <>
            <Script
              id="google-tag-manager"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${gtmId}');
                `,
              }}
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <CookieNotice />
      </body>
    </html>
  );
}
