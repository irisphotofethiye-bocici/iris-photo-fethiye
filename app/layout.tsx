import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/app/context/LangContext";
import { ThemeProvider } from "@/app/context/ThemeContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iris Photo Fethiye — Unique Souvenir in Ölüdeniz | Free Iris Photography",
  description:
    "The most unique thing to do in Ölüdeniz. Free iris photography at Art Street — fine art print, necklace or bracelet. Walk in, no appointment.",
  keywords:
    "things to do Ölüdeniz, unique souvenir Fethiye, best souvenir Fethiye, unique souvenir Ölüdeniz, iris photography Fethiye, personalised gift Turkey, personalised souvenir Turkey, souvenir shop Ölüdeniz Art Street, unique gift Fethiye, handmade souvenir Turkey, after paragliding Ölüdeniz",
  metadataBase: new URL("https://www.irisphotofethiye.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Iris Photo Fethiye — Unique Souvenir in Ölüdeniz",
    description:
      "Free iris photography at Ölüdeniz Art Street. Fine art prints, necklaces, bracelets. Walk in, no appointment.",
    url: "https://www.irisphotofethiye.com",
    siteName: "Iris Photo Fethiye",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Iris Photo Fethiye — Free iris photography at Ölüdeniz Art Street",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iris Photo Fethiye — Unique Souvenir in Ölüdeniz",
    description:
      "Free iris photography at Ölüdeniz Art Street. Fine art prints, necklaces, bracelets. Walk in, no appointment.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Iris Photo Fethiye",
  image: "https://www.irisphotofethiye.com/og-image.jpg",
  telephone: "+905427469297",
  email: "irisphotofethiye@gmail.com",
  url: "https://www.irisphotofethiye.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ölüdeniz Art Street",
    addressLocality: "Fethiye",
    addressRegion: "Muğla",
    addressCountry: "TR",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday", "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday", "Sunday",
    ],
    opens: "15:00",
    closes: "24:00",
  },
  sameAs: [
    "https://instagram.com/irisphotofethiye",
    "https://facebook.com/irisphotofethiye",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <meta name="geo.region" content="TR-MU" />
        <meta name="geo.placename" content="Fethiye, Muğla, Turkey" />
        <meta name="geo.position" content="36.6218;29.1168" />
        <meta name="ICBM" content="36.6218, 29.1168" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('iris-theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',s||p);}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
