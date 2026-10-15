import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HUM Sapphire Borivali West | 2 & 3 BHK Luxury Apartments",
  description:
    "Discover HUM Sapphire in Borivali West, Mumbai. A G+21 storey luxury residential tower offering premium 2 & 3 BHK residences with modern amenities & seamless connectivity. MahaRERA: PM1180002601373.",
  keywords: [
    "HUM Sapphire",
    "HUM Sapphire Borivali West",
    "HUM Developers",
    "2 BHK in Borivali West",
    "3 BHK in Borivali West",
    "Luxury Apartments Borivali West",
    "Real Estate Mumbai",
    "G+21 Storey Tower Borivali",
    "New Residential Projects Borivali West",
    "MahaRERA PM1180002601373",
  ],
  authors: [{ name: "HUM Developers", url: "https://humsapphire.com" }],
  creator: "HUM Developers",
  publisher: "HUM Developers",
  robots: { index: true, follow: true },
  openGraph: {
    title: "HUM Sapphire Borivali West | 2 & 3 BHK Luxury Apartments",
    description:
      "Discover HUM Sapphire by HUM Developers in Borivali West. Luxury 2 & 3 BHK residences in a G+21 storey tower with modern amenities and top connectivity.",
    url: "https://humsapphire.com",
    siteName: "HUM Sapphire",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HUM Sapphire Borivali West | 2 & 3 BHK Luxury Apartments",
    description:
      "Luxury 2 & 3 BHK residences in Borivali West by HUM Developers. G+21 storey tower with modern amenities. MahaRERA: PM1180002601373.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
