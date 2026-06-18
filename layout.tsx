import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://vantax.agency";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "VantaX — Performance Marketing & Customer Acquisition Agency",
    template: "%s | VantaX",
  },
  description:
    "VantaX helps businesses generate more customers through Meta Ads management, lead generation systems, landing page optimization, and AI-powered follow-up automation. Book a free strategy call.",
  keywords: [
    "performance marketing agency",
    "meta ads agency",
    "media buying agency",
    "lead generation agency",
    "paid advertising agency",
    "Facebook ads management",
    "customer acquisition",
    "conversion optimization",
    "AI marketing automation",
    "growth marketing",
  ],
  authors: [{ name: "VantaX Agency" }],
  creator: "VantaX Agency",
  publisher: "VantaX Agency",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "VantaX",
    title: "VantaX — Performance Marketing & Customer Acquisition Agency",
    description:
      "Scale revenue through smarter customer acquisition. Meta Ads, lead generation systems, and AI automation built to maximize ROI.",
    images: [
      {
        url: `${APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "VantaX — Performance Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VantaX — Performance Marketing & Customer Acquisition Agency",
    description:
      "Scale revenue through smarter customer acquisition. Meta Ads, lead generation systems, and AI automation built to maximize ROI.",
    images: [`${APP_URL}/og-image.png`],
    creator: "@vantaxagency",
  },
  alternates: {
    canonical: APP_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "VantaX",
              description:
                "Performance marketing agency specializing in Meta Ads management, lead generation systems, and AI-powered growth automation.",
              url: APP_URL,
              email: "hello@vantax.agency",
              serviceType: [
                "Performance Marketing",
                "Media Buying",
                "Lead Generation",
                "Marketing Automation",
              ],
              areaServed: {
                "@type": "Country",
                name: "United States",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Marketing Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Meta Ads Management",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Lead Generation Systems",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Landing Page Optimization",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Follow-Up Automation",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
