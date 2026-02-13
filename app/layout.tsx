import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Poppins } from 'next/font/google';
import { Cookiebot } from "@/components/Cookiebot";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { PageTracking } from "@/components/analytics/PageTracking";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ntechcolab.com"),
  title: {
    default: "Techco.lab | NETZSCH Digital Innovation Hub",
    template: "%s | Techco.lab",
  },
  description:
    "Techco.lab builds industrial AI solutions for NETZSCH – connected platforms, predictive analytics, and digital experiences for global industries.",
  keywords: [
    "Techco.lab",
    "NETZSCH",
    "digital innovation",
    "industrial AI",
    "technology careers Brazil",
    "hybrid work",
    "digital transformation",
  ],
  authors: [{ name: "Techco.lab" }],
  creator: "Techco.lab",
  publisher: "NETZSCH Group",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Techco.lab",
    locale: "en_US",
    alternateLocale: "pt_BR",
    images: [
      {
        url: "https://ntechcolab.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Techco.lab - NETZSCH Digital Innovation Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://ntechcolab.com/images/og-image.jpg"],
  },
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
  icons: {
    icon: "/favicon.webp",
    shortcut: "/favicon.webp",
    apple: "/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to optimize font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Techco.lab",
              alternateName: "Techco.lab",
              url: "https://ntechcolab.com",
              logo: "https://ntechcolab.com/logo.png",
              sameAs: [
                "https://www.linkedin.com/company/techco-lab",
                "https://www.netzsch.com/en/",
              ],
              description:
                "Techco.lab is the digital innovation hub of NETZSCH, hiring professionals in Data, Cloud, Software, UX and Product for hybrid roles in Brazil.",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "careers",
                email: "info@netzsch.com",
                url: "https://ntechcolab.com/open-positions",
              },
              address: [
                {
                  "@type": "PostalAddress",
                  addressLocality: "Curitiba",
                  addressRegion: "PR",
                  addressCountry: "BR",
                  name: "Nex Coworking",
                },
                {
                  "@type": "PostalAddress",
                  addressLocality: "Pomerode",
                  addressRegion: "SC",
                  addressCountry: "BR",
                  name: "NEM Headquarters",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Techco.lab",
              url: "https://ntechcolab.com",
              inLanguage: ["en", "pt-BR"],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} ${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Cookiebot - deve vir primeiro para bloquear scripts */}
        <Cookiebot />
        {/* GA4 */}
        <GoogleAnalytics />
        {/* Page Tracking */}
        <PageTracking />
        {children}
      </body>
    </html>
  );
}
