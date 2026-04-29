import type { Metadata } from "next";
import { Be_Vietnam_Pro, Playfair_Display, Spline_Sans, Noto_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AudioPlayer from "@/components/Player/AudioPlayer";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-be-vietnam',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const splineSans = Spline_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-spline',
  display: 'swap',
});

const notoSerif = Noto_Serif({
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-noto-serif',
  display: 'swap',
});

const BASE_URL = 'https://labendicion.mhuri.tech';

export const metadata: Metadata = {
  title: "La Bendición | La Nueva Ola de la Salsa Afrocaribeña Contemporánea",
  description: "Descubre a La Bendición, la agrupación que fusiona la tradición de la salsa con el sonido urbano contemporáneo. Explora nuestra música, merch oficial y tour 2026.",
  metadataBase: new URL(BASE_URL),
  robots: { index: true, follow: true },
  openGraph: {
    title: "La Bendición | La Nueva Ola de la Salsa Contemporánea",
    description: "Salsa, sudor y ritmo. Conoce la propuesta musical que está revolucionando la escena afrocaribeña desde Ciudad de México y La Habana.",
    url: BASE_URL,
    siteName: 'La Bendición',
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'La Bendición - La Nueva Ola de la Salsa',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Bendición | La Nueva Ola de la Salsa',
    description: 'Salsa contemporánea fusionada con el sonido urbano. Ciudad de México - La Habana.',
    images: [`${BASE_URL}/og-image.jpg`],
  },
  icons: {
    icon: '/favicon-black.svg',
    shortcut: '/favicon-black.svg',
    apple: '/favicon-black.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${beVietnamPro.variable} ${playfairDisplay.variable} ${splineSans.variable} ${notoSerif.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MusicGroup',
              name: 'La Bendición',
              description: 'Grupo de salsa afrocaribeña contemporánea desde México. Fusión de tradición caribeña con sonidos urbanos.',
              genre: ['Salsa', 'Afrocaribbean', 'Latin', 'Urban Latin'],
              url: BASE_URL,
              image: `${BASE_URL}/og-image.jpg`,
              sameAs: [
                'https://open.spotify.com/artist/12Q80WdWl4ubLTb7SYzX4K',
                'https://youtube.com/@labendicionmusic',
                'https://www.tiktok.com/@labendicionmusic',
                'https://www.instagram.com/labendicionofficial',
                'https://music.apple.com/us/artist/la-bendici%C3%B3n/1705054677',
              ],
            }),
          }}
        />
      </head>
      <body className="bg-background text-on-background min-h-screen flex flex-col font-sans selection:bg-primary-container selection:text-on-primary-container">
        <Navbar />
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
        {/* AudioPlayer could be injected here or conditionally loaded */}
      </body>
    </html>
  );
}
