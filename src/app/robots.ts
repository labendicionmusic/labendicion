import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Permite indexar el sitio principal
        userAgent: '*',
        allow: '/',
        disallow: [
          '/booking',        // EPK privado
          '/labendicionvol1', // FYC privado
          '/api/',           // Rutas de API
        ],
      },
    ],
    sitemap: 'https://labendicionofficial.com/sitemap.xml',
  };
}
