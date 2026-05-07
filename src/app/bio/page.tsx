import type { Metadata } from 'next';
import BioContent from './BioContent';

export const metadata: Metadata = {
  alternates: { canonical: 'https://labendicionofficial.com/bio' },
  title: 'Historia | La Bendición',
  description: 'Todo comenzó en 2022. Conoce la historia de La Bendición, la nueva ola de la salsa hecha en México: raíces afrocaribeñas fusionadas con el sonido urbano contemporáneo.',
  openGraph: {
    title: 'Historia | La Bendición',
    description: 'Todo comenzó en 2022. Conoce la historia de La Bendición, la nueva ola de la salsa hecha en México.',
    url: 'https://labendicion.mhuri.tech/bio',
  },
  twitter: {
    title: 'Historia | La Bendición',
    description: 'Todo comenzó en 2022. Conoce la historia de La Bendición, la nueva ola de la salsa hecha en México.',
  },
};

export default function BioPage() {
  return <BioContent />;
}
