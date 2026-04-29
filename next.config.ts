import type { NextConfig } from "next";

const securityHeaders = [
  // Evita que el sitio se cargue dentro de un iframe (clickjacking)
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Evita que el browser "adivine" el tipo de contenido (MIME sniffing)
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Fuerza HTTPS por 1 año e incluye subdominios
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // Solo envía el origen al hacer referencia a otros sitios (no la URL completa)
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Desactiva APIs del browser que el sitio no necesita
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(self)',
  },
  // Permite embeds de YouTube y Spotify, bloquea el resto
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://cdn.shopify.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://cdn.shopify.com https://img.youtube.com https://i.ytimg.com https://lh3.googleusercontent.com",
      "frame-src https://www.youtube.com https://open.spotify.com",
      "connect-src 'self' https://*.myshopify.com https://cdn.shopify.com",
      "media-src 'self' https://cdn.shopify.com",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
