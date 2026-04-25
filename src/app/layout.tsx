import type { Metadata } from "next";
import { Be_Vietnam_Pro, Epilogue, Spline_Sans, Noto_Serif } from "next/font/google";
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

const epilogue = Epilogue({
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-epilogue',
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

export const metadata: Metadata = {
  title: "La Bendición | La Nueva Ola de la Salsa",
  description: "Agrupación de salsa contemporánea que fusiona la tradición afrocaribeña con el sonido urbano. Ciudad de México - La Habana.",
  metadataBase: new URL('https://labendicion.mhuri.tech'),
  openGraph: {
    title: "La Bendición",
    description: "La nueva ola de la salsa. Fusión contemporánea de raíces latinas y sonido urbano.",
    url: '/',
    siteName: 'La Bendición',
    images: [
      {
        url: '/hero-index-bw.jpg',
        width: 1200,
        height: 630,
        alt: 'La Bendición',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Bendición',
    description: 'La nueva ola de la salsa.',
    images: ['/hero-index-bw.jpg'],
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
    <html lang="es" className={`${beVietnamPro.variable} ${epilogue.variable} ${splineSans.variable} ${notoSerif.variable}`}>
      <head>
        {/* Material Symbols for consistent iconography */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
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
