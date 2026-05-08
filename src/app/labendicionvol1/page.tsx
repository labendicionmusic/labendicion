'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// ══════════════════════════════════════════════════════════════════════════════
//  CONFIGURACIÓN — actualiza estos valores cuando tengas los datos reales
// ══════════════════════════════════════════════════════════════════════════════

const ALBUM = {
  title: 'Vol. 1',
  artist: 'La Bendición',
  year: '2026',
  slogan: "Agua bendita pa to' el mundo",
  cover: '/merch-lp.webp',
  spotifyId: '2dgIwDHlAmKP3E3jqjUS5e',
};

// TODO: reemplazar con el ID del promo FYC de 1:30–2:00 cuando esté listo
const FYC_PROMO_VIDEO_ID = 'F6Pk272OEJo';

const LAUNCH_VIDEO_ID = 'QMYZJRabbYA';

// TODO: reemplazar con el path al poster promocional real (PNG/JPG de alta resolución)
const POSTER_SRC = '/Poster.jpg';
const POSTER_FILENAME = 'LaBendicion-Vol1-Poster.jpg';

const CREDITS: { role: string; name: string }[] = [
  { role: 'Producido por', name: 'Julián Bernal, Gabriel Melgarejo, Geovanis Alcántara y Michael Rincon' },
  { role: 'Colaboraciones', name: 'Camila Guevara, Melanie Santiler, Kid Pistola, Andres Levin, Jambene, América Valdes, Luis Figueroa, Ramon Alvarez, Donovan Morales y Dav Julca' },
  { role: 'Grabado por', name: 'Julián Bernal' },
  { role: 'Mezclado por', name: 'Julián Bernal' },
  { role: 'Masterizado por', name: 'Lewis Picket' },
  { role: 'Grabado en', name: 'Animales Distintos Rec.' },
];

const PRESS_QUOTES: { quote: string; source: string; url?: string }[] = [
  {
    quote: '"El inicio de un movimiento cultural en Latinoamérica que honra la riqueza del legado musical afrocaribeño."',
    source: '¡HOLA!',
    url: 'https://www.hola.com/us-es/entretenimiento/20260501899046/cazzu-carlos-vives-viernes-musica-nueva/',
  },
  {
    quote: '"Un manifiesto. Una pulsión de vida, un llamado a la rumba."',
    source: 'Diario Las Américas',
    url: 'https://www.diariolasamericas.com/grupo-mexicano-la-bendicion-presenta-su-primer-disco-honrar-el-legado-musical-afrocaribeno-n5389072',
  },
  {
    quote: '"Un sonido potente que respeta lo clásico mientras suena completamente actual."',
    source: 'Impacto Latino',
    url: 'https://impactolatino.com/grupo-mexicano-la-bendicion-presenta-su-primer-disco-para-honrar-el-legado-musical-afrocaribeno/',
  },
  {
    quote: '"Una de las agrupaciones más prometedoras dentro de la nueva ola de salsa hecha en México."',
    source: 'Líderes Latinos USA',
    url: 'https://lidereslatinosusa.com/grupo-mexicano-la-bendicion-presenta-su-primer-disco-para-honrar-el-legado-musical-afrocaribeno/',
  },
  {
    quote: '"Revive la esencia de la salsa brava al estilo de Fania, llevándola al lenguaje de una nueva generación."',
    source: 'Zeta (Panamá)',
    url: 'https://zeta.com.pa/noticias-del-dia/notistarz/74213-grupo-mexicano-la-bendicion-presenta-su-primer-disco-para-honrar-el-legado-musical-afrocaribeno',
  },
  {
    quote: '"Conquistando tanto a amantes del género como a nuevas audiencias."',
    source: 'Imparcial RD',
    url: 'https://www.imparcialrd.com/2026/04/grupo-mexicano-la-bendicion-presenta-su.html',
  },
];

const GUEST_QUOTES: { name: string; role: string; quote: string }[] = [
  // TODO: llenar con citas reales de cada artista invitado
  {
    name: 'Artista invitado 1',
    role: 'Colaborador',
    quote: '"— Cita por confirmar con el artista —"',
  },
  {
    name: 'Artista invitado 2',
    role: 'Colaborador',
    quote: '"— Cita por confirmar con el artista —"',
  },
];

// Tracks individuales para la sección de escucha (YouTube)
const TRACKS: { title: string; youtubeId: string }[] = [
  // TODO: llenar con todos los tracks del álbum
  { title: "Cuidao' Por Ahí", youtubeId: '2fXAj_6F5jw' },
  { title: 'La Perla', youtubeId: 'zcyeXJZ-FRY' },
];

// ══════════════════════════════════════════════════════════════════════════════

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: 'easeOut' as const },
  }),
};

function Divider() {
  return (
    <div className="w-full flex items-center gap-6 py-2">
      <div className="flex-1 h-px bg-white/10" />
      <span className="text-primary font-mono text-xs tracking-[0.4em] uppercase opacity-60">✦</span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}

function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="relative w-full aspect-video bg-black rounded-none overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

const PAGE_URL = 'https://labendicionofficial.com/labendicionvol1';

// Crossfade entre portada y contraportada cada 4 segundos
function AlbumCoverCrossfade({ alt }: { alt: string }) {
  const covers = ['/portada-oficial.webp', '/poster.webp'];
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((v) => (v + 1) % covers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {covers.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-contain transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          priority={i === 0}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}
    </>
  );
}
const SHARE_TEXT = "Escucha La Bendición Vol. 1 — Agua bendita pa to' el mundo 🎶";

const SHARE_OPTIONS = [
  {
    label: 'WhatsApp',
    icon: 'chat',
    color: 'hover:text-[#25D366]',
    href: `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + '\n' + PAGE_URL)}`,
  },
  {
    label: 'Facebook',
    icon: 'thumb_up',
    color: 'hover:text-[#1877F2]',
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(PAGE_URL)}`,
  },
  {
    label: 'X / Twitter',
    icon: 'tag',
    color: 'hover:text-white',
    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(PAGE_URL)}`,
  },
  {
    label: 'Telegram',
    icon: 'send',
    color: 'hover:text-[#229ED9]',
    href: `https://t.me/share/url?url=${encodeURIComponent(PAGE_URL)}&text=${encodeURIComponent(SHARE_TEXT)}`,
  },
];

function ShareButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Cierra el menú si se hace click fuera
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  async function handleShare() {
    // Usa el share nativo del OS si está disponible (móvil)
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'La Bendición Vol. 1', text: SHARE_TEXT, url: PAGE_URL });
      } catch {
        // usuario canceló — sin problema
      }
      return;
    }
    // Fallback desktop: abre el menú
    setOpen((v) => !v);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(PAGE_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={handleShare}
        className="inline-flex items-center justify-center gap-3 border border-white/20 text-white font-mono text-xs uppercase tracking-[0.25em] font-black px-8 py-4 hover:bg-sky-retro hover:text-black hover:border-sky-retro transition-all duration-300"
      >
        <span className="material-symbols-outlined text-[20px]">share</span>
        Compartir
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-full mb-3 left-0 z-50 bg-surface-container border border-outline-variant/40 shadow-2xl min-w-[220px] overflow-hidden"
          >
            {SHARE_OPTIONS.map((opt) => (
              <a
                key={opt.label}
                href={opt.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-5 py-4 font-mono text-xs uppercase tracking-[0.2em] text-white/70 ${opt.color} hover:bg-white/5 transition-all duration-200 border-b border-white/5 last:border-0`}
              >
                <span className="material-symbols-outlined text-[18px]">{opt.icon}</span>
                {opt.label}
              </a>
            ))}
            {/* Copiar enlace */}
            <button
              onClick={copyLink}
              className="w-full flex items-center gap-3 px-5 py-4 font-mono text-xs uppercase tracking-[0.2em] text-white/70 hover:text-primary hover:bg-white/5 transition-all duration-200"
            >
              <span className="material-symbols-outlined text-[18px]">
                {copied ? 'check_circle' : 'link'}
              </span>
              {copied ? '¡Copiado!' : 'Copiar enlace'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FYCPage() {

  return (
    <div className="w-full min-h-screen bg-background text-on-background overflow-x-hidden selection:bg-primary selection:text-black">

      {/* ── TOP BAR ─────────────────────────────────────────────── */}
      <div className="w-full bg-black border-b border-white/10 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8">
            <Image src="/logo-bendicion.svg" alt="La Bendición" fill sizes="32px" className="object-contain" />
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-white/60 hidden sm:block">
            La Bendición
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block border border-primary/60 text-primary font-mono text-[10px] uppercase tracking-[0.35em] px-3 py-1">
            For Your Consideration
          </span>
        </div>
      </div>

      {/* ── 01 · HERO — PORTADA + TÍTULO ────────────────────────── */}
      <section className="w-full">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12 md:gap-20">

          {/* Portada del disco */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="w-full max-w-[320px] md:max-w-[360px] flex-shrink-0 mx-auto md:mx-0"
          >
            <div className="relative aspect-square shadow-[0_0_80px_rgba(0,255,157,0.12)]">
              <AlbumCoverCrossfade alt={`${ALBUM.artist} – ${ALBUM.title}`} />
            </div>
          </motion.div>

          {/* Texto principal */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-5 w-full">
            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={0}
              className="font-mono text-[10px] uppercase tracking-[0.55em] text-primary"
            >
              Latin Grammy — For Your Consideration · {ALBUM.year}
            </motion.p>

            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="font-mono text-sm uppercase tracking-[0.3em] text-white/50"
            >
              {ALBUM.artist}
            </motion.p>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="font-display text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-white"
            >
              {ALBUM.title}
            </motion.h1>

            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={3}
              className="font-serif italic text-lg md:text-xl text-white/60 leading-relaxed max-w-md"
            >
              {ALBUM.slogan}
            </motion.p>

            <motion.div
              variants={fadeUp} initial="hidden" animate="visible" custom={4}
              className="flex flex-col sm:flex-row gap-3 mt-2 w-full sm:w-auto"
            >
              <a
                href={`https://open.spotify.com/album/${ALBUM.spotifyId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-black font-mono text-xs uppercase tracking-[0.25em] font-black px-8 py-4 hover:bg-white transition-all duration-300"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                Escuchar en Spotify
              </a>
              <a
                href={`#escuchar`}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-mono text-xs uppercase tracking-[0.25em] font-black px-8 py-4 hover:bg-sky-retro hover:text-black hover:border-sky-retro transition-all duration-300"
              >
                <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                Ver en YouTube
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6"><Divider /></div>

      {/* ── 02 · VIDEO FYC ──────────────────────────────────────── */}
      <section className="w-full py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-primary mb-3">Video Promocional</p>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
              Conoce La Bendición Vol. 1
            </h2>
            <p className="font-serif italic text-white/50 mt-2 text-base md:text-lg">
              La esencia del disco, las colaboraciones y las voces detrás de la música.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="border border-white/10"
          >
            <YouTubeEmbed videoId={FYC_PROMO_VIDEO_ID} title="La Bendición Vol. 1 – Promo FYC" />
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6"><Divider /></div>

      {/* ── 03 · PRENSA ─────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-primary mb-3">Prensa</p>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
              Lo que dicen
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {PRESS_QUOTES.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-background p-8 md:p-10 flex flex-col justify-between gap-6"
              >
                <p className="font-serif italic text-white/80 text-base md:text-lg leading-relaxed">
                  {item.quote}
                </p>
                <div className="border-t border-white/10 pt-4">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary hover:underline"
                    >
                      {item.source} ↗
                    </a>
                  ) : (
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                      {item.source}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6"><Divider /></div>

      {/* ── 04 · VIDEO CLIP ─────────────────────────────────────── */}
      <section className="w-full py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-primary mb-3">Video Clip Oficial</p>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
              Mal De Amor
            </h2>
            <p className="font-serif italic text-white/50 mt-2 text-base md:text-lg">
              feat. Camila Guevara — Vol. 1 ({ALBUM.year})
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="border border-white/10"
          >
            <YouTubeEmbed videoId={LAUNCH_VIDEO_ID} title="La Bendición – Mal De Amor feat. Camila Guevara (Video Oficial)" />
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6"><Divider /></div>

      {/* ── 05 · CRÉDITOS ───────────────────────────────────────── */}
      <section className="w-full py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-primary mb-3">Créditos</p>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
              El equipo
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10">
            {CREDITS.map((credit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-background p-6 md:p-8 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary flex-shrink-0 w-full sm:w-36">
                  {credit.role}
                </span>
                <span className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">
                  {credit.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6"><Divider /></div>

      {/* ── 06 · ESCUCHAR ───────────────────────────────────────── */}
      <section id="escuchar" className="w-full py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-primary mb-3">Escuchar</p>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
              El disco
            </h2>
            <p className="font-serif italic text-white/50 mt-2 text-sm md:text-base">
              Disponible en YouTube · Spotify · Apple Music · Amazon Music
            </p>
          </motion.div>

          {/* Spotify embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6"
          >
            <iframe
              src={`https://open.spotify.com/embed/album/${ALBUM.spotifyId}?utm_source=generator&theme=0`}
              width="100%"
              height="720"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="border-0"
              title="La Bendición Vol. 1 en Spotify"
            />
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6"><Divider /></div>

      {/* ── 07 · CITAS DE INVITADOS ─────────────────────────────── */}
      {/* ── SECCIÓN ARTISTAS INVITADOS — oculta hasta tener las citas reales ──
      <section className="w-full py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-primary mb-3">Artistas Invitados</p>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
              Sus palabras
            </h2>
          </motion.div>

          <div className="flex flex-col gap-px bg-white/10">
            {GUEST_QUOTES.map((guest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="bg-background p-8 md:p-12 flex flex-col md:flex-row gap-6 md:gap-12 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-surface-container border border-outline-variant/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl">person</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-serif italic text-xl md:text-2xl text-white/85 leading-relaxed">
                    {guest.quote}
                  </p>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary font-bold">{guest.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{guest.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6"><Divider /></div>
      ── FIN SECCIÓN ARTISTAS INVITADOS ── */}

      {/* ── 08 · POSTER DESCARGABLE ─────────────────────────────── */}
      <section className="w-full py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-primary mb-3">Material</p>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
              Poster oficial
            </h2>
            <p className="font-serif italic text-white/50 mt-2 text-sm md:text-base">
              Descargable y compartible. Úsalo para apoyar la campaña.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-xs flex-shrink-0 mx-auto md:mx-0"
            >
              <div className="relative aspect-[3/4] border border-white/20 overflow-hidden bg-surface-container">
                <Image
                  src={POSTER_SRC}
                  alt="Poster Oficial La Bendición Vol. 1"
                  fill
                  sizes="(max-width: 768px) 80vw, 320px"
                  className="object-contain p-6"
                />
              </div>
            </motion.div>

            {/* Texto + botón descarga */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col gap-6 justify-center"
            >
              <p className="font-serif italic text-lg text-white/70 leading-relaxed max-w-sm">
                Comparte este material con colegas, medios y votantes para apoyar la
                campaña de consideración de La Bendición Vol. 1.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={POSTER_SRC}
                  download={POSTER_FILENAME}
                  className="inline-flex items-center justify-center gap-3 bg-primary text-black font-mono text-xs uppercase tracking-[0.25em] font-black px-8 py-4 hover:bg-white transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  Descargar Poster
                </a>
                <ShareButton />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                labendicionofficial.com/labendicionvol1
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER MINIMAL ──────────────────────────────────────── */}
      <footer className="w-full border-t border-white/10 bg-black px-6 pt-8 pb-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative h-6 w-6">
              <Image src="/logo-bendicion.svg" alt="La Bendición" fill sizes="24px" className="object-contain" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
              La Bendición © {new Date().getFullYear()}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/50 text-center">
            For Your Consideration — Latin Grammy {new Date().getFullYear()}
          </span>
          <a href="/" className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">
            labendicionofficial.com
          </a>
        </div>
        <div className="max-w-5xl mx-auto pt-4 text-center">
          <a href="https://www.mhuri.tech" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-primary transition-colors duration-300">
            Powered by MHURI<span className="text-[8px] align-super">↗</span>
          </a>
        </div>
      </footer>

    </div>
  );
}
