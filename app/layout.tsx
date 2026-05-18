import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        {children}
        <a href="https://www.instagram.com/unitzeroairsoft/" target="_blank" className="hidden h-12 w-12 lg:flex fixed bottom-4 right-4 bg-white z-10 rounded-full justify-center items-center group hover:scale-115 transition-all">
          <img src="/Instagram.svg" className="w-6 h-6"/>
        </a>
      </body>
    </html>
  );
}
