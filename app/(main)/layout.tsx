import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unit Zero – Airsoft",
  description: "Das Airsoft-Team Unit Zero. Action. Taktik. Teamgeist.",
  openGraph: {
    title: "Unit Zero – Airsoft",
    description: "Das Airsoft-Team Unit Zero. Action. Taktik. Teamgeist.",
    url: "https://unit-zero.de",
    siteName: "Unit Zero Airsoft",
    images: [
      {
        url: "https://unit-zero.de/Fabian-Desktop.jpg",
        width: 1200,
        height: 630,
        alt: "Unit Zero Airsoft Titelbild",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unit Zero – Airsoft",
    description: "Das Airsoft-Team Unit Zero. Action. Taktik. Teamgeist.",
    images: ["https://unit-zero.de/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
