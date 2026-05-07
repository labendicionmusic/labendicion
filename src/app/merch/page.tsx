import type { Metadata } from 'next';
import MerchContent from './MerchContent';

export const metadata: Metadata = {
  alternates: { canonical: 'https://labendicionofficial.com/merch' },
  title: 'Merch | La Bendición',
  description: 'Tienda oficial de La Bendición. LP Vol. 1, playeras, gorras y accesorios. Drop Temporada 2026 — stock limitado.',
  openGraph: {
    title: 'Merch | La Bendición',
    description: 'Drop oficial Temporada 2026. LP, playeras, gorras y accesorios. Stock limitado.',
    url: 'https://labendicion.mhuri.tech/merch',
  },
  twitter: {
    title: 'Merch | La Bendición',
    description: 'Drop oficial Temporada 2026. LP, playeras, gorras y accesorios. Stock limitado.',
  },
};

export default function MerchPage() {
  return <MerchContent />;
}
