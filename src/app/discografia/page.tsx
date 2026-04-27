import type { Metadata } from 'next';
import DiscografiaContent from './DiscografiaContent';

export const metadata: Metadata = {
  title: 'Música | La Bendición',
  description: 'Explora el catálogo oficial de La Bendición: Vol. 1, singles, EPs y sesiones en vivo. Disponible en Spotify, Apple Music y YouTube.',
  openGraph: {
    title: 'Música | La Bendición',
    description: 'Catálogo oficial: Vol. 1, singles y EPs. 10.3K oyentes mensuales en Spotify.',
    url: 'https://labendicion.mhuri.tech/discografia',
  },
  twitter: {
    title: 'Música | La Bendición',
    description: 'Catálogo oficial: Vol. 1, singles y EPs. 10.3K oyentes mensuales en Spotify.',
  },
};

export default function DiscografiaPage() {
  return <DiscografiaContent />;
}
