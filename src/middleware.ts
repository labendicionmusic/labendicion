import { NextRequest, NextResponse } from 'next/server';

// ─── Rate Limiter ─────────────────────────────────────────────────────────────
// Protege contra ráfagas de peticiones (DDoS básico, scrapers, bots).
// Usa Edge Runtime — corre en el CDN de Vercel, no en el servidor.
//
// Límites actuales:
//   - Páginas normales:  60 peticiones / 60 segundos por IP
//   - Rutas de API:      20 peticiones / 60 segundos por IP

const WINDOW_MS   = 60_000; // 1 minuto
const MAX_PAGES   = 60;     // visitas de página
const MAX_API     = 20;     // llamadas a /api/*

// Store en memoria del Edge Runtime (se resetea por instancia/region)
const store = new Map<string, { count: number; reset: number }>();

function getLimit(pathname: string) {
  return pathname.startsWith('/api/') ? MAX_API : MAX_PAGES;
}

function getRealIp(req: NextRequest): string {
  return (
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'anonymous'
  );
}

function isRateLimited(ip: string, pathname: string): boolean {
  const key   = `${ip}:${pathname.startsWith('/api/') ? 'api' : 'page'}`;
  const now   = Date.now();
  const limit = getLimit(pathname);
  const entry = store.get(key);

  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  if (entry.count > limit) return true;

  return false;
}

// Limpia entradas expiradas cada ~500 peticiones para no crecer indefinidamente
let cleanupCounter = 0;
function maybeCleanup() {
  if (++cleanupCounter % 500 !== 0) return;
  const now = Date.now();
  for (const [key, val] of store.entries()) {
    if (now > val.reset) store.delete(key);
  }
}

// ─── Middleware ───────────────────────────────────────────────────────────────

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const ip = getRealIp(req);

  maybeCleanup();

  if (isRateLimited(ip, pathname)) {
    return new NextResponse(
      JSON.stringify({ error: 'Demasiadas peticiones. Intenta en un momento.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
          'X-RateLimit-Limit': String(getLimit(pathname)),
          'X-RateLimit-Reset': String(Math.ceil((Date.now() + WINDOW_MS) / 1000)),
        },
      }
    );
  }

  return NextResponse.next();
}

// Solo aplica a páginas y rutas API — excluye assets estáticos
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon|images|.*\\.(?:svg|png|jpg|jpeg|webp|ico|css|js|woff2?)).*)',
  ],
};
