import type { Metadata } from 'next';

const BASE_URL = 'https://labendicionofficial.com';

export const metadata: Metadata = {
  title: 'La Bendición — Booking & EPK',
  description: "Electronic Press Kit y contacto de booking para La Bendición. Salsa y música tropical contemporánea desde la Ciudad de México.",
  metadataBase: new URL(BASE_URL),
  robots: { index: false, follow: false }, // Privado — no indexar
  openGraph: {
    title: 'La Bendición — Booking & EPK',
    description: "Información profesional, videos, música y contacto de booking para La Bendición.",
    url: `${BASE_URL}/booking`,
    siteName: 'La Bendición',
    images: [
      {
        url: `${BASE_URL}/bio-hero.webp`,
        width: 1200,
        height: 800,
        alt: 'La Bendición — Foto de prensa',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Bendición — Booking & EPK',
    images: [`${BASE_URL}/bio-hero.webp`],
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
