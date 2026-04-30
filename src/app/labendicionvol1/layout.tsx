import type { Metadata } from 'next';

const BASE_URL = 'https://labendicionofficial.com';

export const metadata: Metadata = {
  title: 'La Bendición Vol. 1 — For Your Consideration | Latin Grammy',
  description:
    "El primer álbum completo de La Bendición. Salsa afrocaribeña contemporánea desde México. «Agua bendita pa to' el mundo.»",
  metadataBase: new URL(BASE_URL),
  robots: { index: false, follow: false }, // Página privada — no indexar
  openGraph: {
    title: 'La Bendición Vol. 1 — For Your Consideration',
    description:
      "Salsa, sudor y bendición. El debut de álbum de La Bendición llega con colaboraciones de lujo y producción de primer nivel. Escúchalo ahora.",
    url: `${BASE_URL}/labendicionvol1`,
    siteName: 'La Bendición',
    images: [
      {
        url: `${BASE_URL}/merch-lp.webp`,
        width: 1200,
        height: 1200,
        alt: 'La Bendición Vol. 1 — Portada oficial',
      },
    ],
    locale: 'es_MX',
    type: 'music.album',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Bendición Vol. 1 — For Your Consideration',
    description: "Salsa afrocaribeña contemporánea desde México. «Agua bendita pa to' el mundo.»",
    images: [`${BASE_URL}/merch-lp.webp`],
  },
};

export default function FYCLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
