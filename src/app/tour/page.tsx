import type { Metadata } from 'next';
import TourContent from './TourContent';

export const metadata: Metadata = {
  title: 'Tour 2026 | La Bendición',
  description: 'Fechas y boletos para ver a La Bendición en vivo. Próxima parada: CDMX, 29 de abril en Tonal. Salsa, sudor y ritmo en vivo.',
  openGraph: {
    title: 'Tour 2026 | La Bendición',
    description: 'Próxima parada: CDMX, 29 de abril en Tonal. Consigue tus boletos.',
    url: 'https://labendicion.mhuri.tech/tour',
  },
  twitter: {
    title: 'Tour 2026 | La Bendición',
    description: 'Próxima parada: CDMX, 29 de abril en Tonal. Consigue tus boletos.',
  },
};

export default function TourPage() {
  return <TourContent />;
}
