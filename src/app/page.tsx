'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import MerchTeaser from './merch/MerchTeaser';

// --- CONFIGURACIÓN DEL HERO ---
const HERO_TYPE: 'image' | 'video' = 'video';
const YOUTUBE_ID = 'nuClYq_09vE';
// ------------------------------

const featuredReleases = [
  {
    title: 'Vol 1.',
    year: '2026',
    type: 'ÁLBUM',
    description: 'La culminación de años de sencillos. El primer álbum completo de La Bendición.',
    spotifyUrl: 'https://open.spotify.com/album/2dgIwDHlAmKP3E3jqjUS5e',
    youtubeId: null as string | null,
  },
  {
    title: "Cuidao' Por Ahí",
    year: '2026',
    type: 'SENCILLO // NUEVO',
    description: 'Una advertencia con ritmo. Picardía caribeña con la energía urbana de la Ciudad de México.',
    spotifyUrl: 'https://open.spotify.com/album/5Svcfa7y1gKrdcRju04V24',
    youtubeId: '2fXAj_6F5jw' as string | null,
  },
  {
    title: 'La Perla',
    year: '2025',
    type: 'SENCILLO',
    description: 'Con una melodía envolvente que evoca la nostalgia de los sonidos clásicos del Caribe.',
    spotifyUrl: 'https://open.spotify.com/album/4PxciYwCkUh4hvFuzBrBWi',
    youtubeId: 'zcyeXJZ-FRY' as string | null,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className="mb-16 border-l-8 border-primary pl-8"
    >
      <p className="font-mono text-xs uppercase tracking-[0.4em] font-bold text-primary mb-3">{label}</p>
      <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
        {title}
      </h2>
      {subtitle && (
        <p className="font-mono text-xs uppercase tracking-[0.4em] font-bold text-on-surface-variant mt-4">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="w-full bg-background overflow-x-hidden selection:bg-primary selection:text-black">

      {/* Brutalist Watermark */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full whitespace-nowrap opacity-[0.03] pointer-events-none z-0 overflow-hidden mix-blend-screen">
        <h1 className="font-display text-[15vw] font-black tracking-tighter text-white">LA BENDICIÓN</h1>
      </div>

      {/* ═══════════════════════════════════════════
          01 · HERO
      ═══════════════════════════════════════════ */}
      <section id="inicio" className="relative w-full h-[75vh] md:h-screen flex items-end justify-center z-10 pb-8 md:pb-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[400px] md:h-full z-0 overflow-hidden bg-black">
          {HERO_TYPE === 'image' ? (
            <Image
              src="/hero-index.webp"
              alt="La Bendición Hero"
              fill
              className="object-cover opacity-90 contrast-110 object-top md:object-center"
              priority
            />
          ) : (
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden scale-110 md:scale-125">
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${YOUTUBE_ID}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
                className="absolute top-1/2 left-1/2 w-[300%] h-[300%] md:w-[150%] md:h-[150%] -translate-x-1/2 -translate-y-1/2"
                allow="autoplay; encrypted-media"
                title="Hero Video Background"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
        </div>

        <motion.div
          className="relative z-10 px-6 w-full max-w-[1440px] mx-auto flex flex-col justify-end h-full md:grid md:grid-cols-12 gap-1 md:gap-8 items-end md:pb-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Título — sobre el video en mobile y desktop */}
          <motion.div variants={fadeInUp} className="md:col-span-8 md:col-start-1 w-full">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.85] font-black tracking-tighter uppercase text-left">
              La <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Bendición.</span>
            </h1>
            <p className="font-serif italic text-base text-white/70 font-light mt-3 md:hidden">
              Agua bendita pa to&apos; el mundo
            </p>
          </motion.div>

          {/* Subtítulo + botones — desktop a la derecha, mobile abajo */}
          <motion.div variants={fadeInUp} className="md:col-span-4 md:col-start-9 flex flex-col items-start md:items-end text-left md:text-right md:border-r-4 border-primary md:pr-6 mt-3 md:mt-0 w-full">
            <p className="hidden md:block font-serif italic text-xl text-white/80 font-light leading-relaxed mb-8">
              Agua bendita pa to&apos; el mundo
            </p>
            <div className="flex flex-row gap-3 md:flex-col md:gap-4">
              <a href="#musica" className="inline-flex items-center justify-center bg-primary text-black font-mono text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] font-black px-6 md:px-12 py-4 md:py-5 hover:bg-white hover:scale-105 transition-all duration-300 whitespace-nowrap">
                Escuchar
              </a>
              <a href="#tour" className="inline-flex items-center gap-2 border border-white/30 text-white font-mono text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] font-black px-6 md:px-10 py-4 md:py-5 hover:bg-sky-retro hover:text-black hover:border-sky-retro transition-all duration-300 group/btn whitespace-nowrap">
                Tour &apos;26
                <span className="material-symbols-outlined text-[16px] md:text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          02 · SANGRE MEZCLADA / NOSOTROS
      ═══════════════════════════════════════════ */}
      <section id="nosotros" className="py-16 md:py-24 relative z-10 border-t border-outline-variant/30">
        <div className="w-full max-w-[1440px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="mb-24 md:pl-24"
          >
            <h2 className="font-display text-5xl md:text-8xl font-black text-white uppercase tracking-tighter">
              El sonido <br /><span className="text-outline-variant">de la calle</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
            {/* Left Column: Kinetic Typography */}
            <motion.div
              className="md:col-span-7 bg-surface-container border border-outline-variant/30 p-12 lg:p-20 flex flex-col justify-center relative overflow-hidden group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
              <h3 className="font-display text-4xl text-on-surface-variant font-bold uppercase tracking-tight mb-8">Nuestra Identidad</h3>
              <div className="flex flex-col gap-0 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] uppercase tracking-tight">
                <span className="text-white hover:text-primary transition-colors duration-300">TRADICIÓN</span>
                <span className="text-outline-variant hover:text-secondary transition-colors duration-300">&amp;</span>
                <span className="text-white hover:text-primary transition-colors duration-300">MODERNIDAD</span>
              </div>
              <p className="font-sans text-xl text-on-surface-variant font-light mt-12 max-w-xl">
                Evocamos la nostalgia de los sonidos clásicos del Caribe que durante décadas han conmovido a generaciones.
              </p>
            </motion.div>

            {/* Right Column: Bento Boxes */}
            <div className="md:col-span-5 flex flex-col gap-8">
              <motion.div
                className="bg-primary p-10 lg:p-14 flex flex-col justify-between relative group overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="absolute left-0 top-0 w-full h-1 bg-white/50 -translate-y-full group-hover:translate-y-[400px] transition-transform duration-[2s] ease-in-out"></div>
                <h3 className="font-mono text-sm text-black uppercase tracking-[0.3em] font-black mb-8 border-b border-black/20 pb-4">La Misión</h3>
                <h4 className="font-display text-4xl lg:text-5xl font-black text-black leading-[0.9] tracking-tighter uppercase">
                  Una nueva manera de hablar del <span className="text-white">amor</span> dentro de la música latina actual.
                </h4>
              </motion.div>

              <motion.div
                className="bg-surface-variant p-10 lg:p-14 border border-outline-variant/30 flex flex-col justify-end relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-outline-variant/50 flex items-center justify-center bg-background text-primary font-mono text-xs font-bold">
                  2022
                </div>
                <h3 className="font-mono text-xs text-primary uppercase tracking-[0.2em] font-bold mb-4">El Sonido</h3>
                <p className="font-sans text-xl text-white font-light leading-relaxed">
                  Revitalizamos la riqueza de los ritmos afrocaribeños, fusionándolos con sonidos urbanos contemporáneos. Somos la nueva ola de <span className="text-secondary">salsa</span> hecha en México.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          03 · HISTORIA / BIO TEASER
      ═══════════════════════════════════════════ */}
      <section id="bio" className="py-16 md:py-24 relative z-10 border-t border-outline-variant/30">
        <div className="w-full max-w-[1440px] mx-auto px-6">
          <SectionHeader label="§ 01 — Historia" title="HISTORIA" subtitle="Nuestra Historia // La Nueva Ola" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Narrative */}
            <motion.div
              className="lg:col-span-7 flex flex-col gap-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.p variants={fadeInUp} className="font-serif text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                <span className="float-left text-7xl md:text-9xl font-black text-primary pr-6 pt-2 leading-[0.8] tracking-tighter font-display">T</span>
                odo comenzó en 2022. La Bendición no es solo una agrupación; somos la nueva ola de la <span className="text-secondary">salsa</span> hecha en México, el resultado de un choque cultural hermoso entre las raíces afrocaribeñas y el sonido urbano contemporáneo.
              </motion.p>

              <motion.p variants={fadeInUp} className="font-sans text-lg text-on-surface-variant leading-relaxed font-light">
                Buscamos revitalizar la riqueza de los ritmos clásicos del Caribe que durante décadas han conmovido a generaciones. Fusionamos esa nostalgia con un estilo fresco y poderoso para proponer una nueva manera de hablar del amor.
              </motion.p>

              <motion.blockquote variants={fadeInUp} className="relative pl-8 md:pl-12 border-l-4 border-secondary">
                <p className="font-serif italic text-2xl md:text-3xl text-white leading-snug">
                  &ldquo;No hacemos música para ser escuchada, hacemos música para ser sentida en el pecho y bailada con el espíritu.&rdquo;
                </p>
              </motion.blockquote>

              <motion.p variants={fadeInUp} className="font-sans text-base text-on-surface-variant/70 leading-relaxed font-light">
                Respaldados por productores de la talla de Geovanis Alcántara (3× Latin Grammy), Julián Bernal (2× nominado al Latin Grammy) y Gabriel Melgarejo.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <Link
                  href="/bio"
                  className="inline-flex items-center gap-3 border border-white/30 text-white font-mono text-sm uppercase tracking-[0.2em] font-black px-10 py-5 hover:bg-sky-retro hover:text-black hover:border-sky-retro transition-all duration-300 group/btn"
                >
                  Leer Historia Completa
                  <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Bio Hero Image */}
            <motion.div
              className="lg:col-span-5 h-[500px] lg:h-[720px] relative overflow-hidden border border-outline-variant/30"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <Image
                src="/bio-landing.webp"
                alt="La Bendición en vivo"
                fill
                className="object-cover object-top grayscale contrast-110 hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.5em] text-white/30">
                [ ARCHIVE_REF_23JSBV ]
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          04 · MÚSICA / DISCOGRAFÍA TEASER
      ═══════════════════════════════════════════ */}
      <section id="musica" className="py-16 md:py-24 relative z-10 border-t border-outline-variant/30">
        <div className="w-full max-w-[1440px] mx-auto px-6">
          <SectionHeader label="§ 02 — Discografía" title="MÚSICA" subtitle="Catálogo Oficial // Súbele al Volumen" />

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap gap-8 md:gap-16 mb-16 pb-8 border-b border-outline-variant/30"
          >
            <div>
              <span className="font-display text-4xl md:text-5xl font-black text-primary">10.3K</span>
              <span className="block font-mono text-xs text-on-surface-variant uppercase tracking-widest mt-1">Oyentes Mensuales</span>
            </div>
            <div>
              <span className="font-display text-4xl md:text-5xl font-black text-white">9</span>
              <span className="block font-mono text-xs text-on-surface-variant uppercase tracking-widest mt-1">Lanzamientos</span>
            </div>
            <div>
              <span className="font-display text-4xl md:text-5xl font-black text-secondary">2024–26</span>
              <span className="block font-mono text-xs text-on-surface-variant uppercase tracking-widest mt-1">Años Activos</span>
            </div>
          </motion.div>

          {/* Featured Releases */}
          <motion.div
            className="flex flex-col gap-0 mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {featuredReleases.map((release, index) => (
              <motion.article
                key={release.title}
                variants={fadeInUp}
                className="group relative border-b border-outline-variant/20 hover:bg-surface-container transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 p-8 md:p-10 w-full">
                  <div className="hidden md:block min-w-[60px]">
                    <span className="font-mono text-on-surface-variant/40 text-sm font-bold">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="min-w-[80px]">
                    <span className="font-mono text-sm font-black tracking-widest text-secondary">{release.year}</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-4 mb-2">
                      <h3 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight leading-none text-white group-hover:text-primary transition-colors duration-300">
                        {release.title}
                      </h3>
                      <span className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] font-black border border-outline-variant text-on-surface-variant">
                        {release.type}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-on-surface-variant font-light leading-relaxed max-w-2xl">{release.description}</p>
                  </div>
                  <div className="flex items-center gap-4 min-w-[120px] justify-end">
                    {release.youtubeId && (
                      <button
                        onClick={() => setSelectedVideo(release.youtubeId)}
                        className="w-12 h-12 rounded-full border-2 border-secondary/30 text-secondary hover:border-secondary hover:bg-secondary hover:text-black flex items-center justify-center transition-all duration-300"
                        aria-label={`Ver video de ${release.title}`}
                      >
                        <span className="material-symbols-outlined text-xl">smart_display</span>
                      </button>
                    )}
                    <a
                      href={release.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Escuchar ${release.title} en Spotify`}
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-outline-variant/30 hover:border-primary hover:bg-primary flex items-center justify-center transition-all duration-300 group/play">
                        <span className="material-symbols-outlined text-white group-hover/play:text-black text-xl ml-0.5 transition-colors duration-300">play_arrow</span>
                      </div>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Streaming + CTA */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex flex-wrap gap-3">
              <a
                href="https://open.spotify.com/intl-es/artist/12Q80WdWl4ubLTb7SYzX4K"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-outline-variant text-white px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] font-black flex items-center gap-3 hover:bg-[#1DB954] hover:border-[#1DB954] hover:text-black transition-all duration-300"
              >
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Spotify
              </a>
              <a
                href="https://music.apple.com/us/artist/la-bendici%C3%B3n/1705054677"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-outline-variant text-white px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] font-bold hover:border-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Apple Music
              </a>
              <a
                href="https://youtube.com/@labendicionmusic"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-outline-variant text-white px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] font-bold hover:border-[#FF0000] hover:bg-[#FF0000] transition-all duration-300"
              >
                YouTube
              </a>
            </div>
            <Link
              href="/discografia"
              className="inline-flex items-center gap-3 border border-white/30 text-white font-mono text-sm uppercase tracking-[0.2em] font-black px-10 py-5 hover:bg-sky-retro hover:text-black hover:border-sky-retro transition-all duration-300 group/btn"
            >
              Ver Catálogo Completo
              <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          05 · TOUR / EN VIVO TEASER
      ═══════════════════════════════════════════ */}
      <section id="tour" className="py-16 md:py-24 relative z-10 border-t border-outline-variant/30">
        <div className="w-full max-w-[1440px] mx-auto px-6">
          <SectionHeader
            label="§ 03 — En Vivo"
            title={<>Tour <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">2026</span></>}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Tour date + CTAs */}
            <motion.div
              className="lg:col-span-7 flex flex-col gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <article className="group relative bg-surface-container border border-outline-variant/30 p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between transition-colors hover:bg-surface-variant overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300"></div>
                <div className="flex flex-col sm:flex-row items-center gap-8 w-full sm:w-auto mb-6 sm:mb-0 text-center sm:text-left">
                  <div className="min-w-[80px]">
                    <span className="block text-secondary font-mono text-sm uppercase tracking-widest font-bold">Abr</span>
                    <span className="block font-display text-7xl text-white font-black leading-none">29</span>
                    <span className="block font-mono text-xs text-on-surface-variant uppercase tracking-widest mt-1">2026</span>
                  </div>
                  <div>
                    <h3 className="font-display text-3xl text-white mb-2 font-bold uppercase tracking-tight">CDMX, México</h3>
                    <p className="font-sans text-on-surface-variant font-light flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                      Tonal
                    </p>
                  </div>
                </div>
                <a
                  href="https://www.tonaltonal.com/events/la-bendicion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-primary text-black font-mono text-xs uppercase tracking-[0.2em] font-black px-10 py-5 hover:bg-white hover:scale-105 transition-all duration-300 whitespace-nowrap text-center shadow-[0_0_20px_rgba(0,255,157,0.2)] hover:shadow-[0_0_30px_rgba(0,255,157,0.5)]"
                >
                  Boletos
                </a>
              </article>

              <p className="font-sans text-on-surface-variant font-light leading-relaxed max-w-xl">
                La Bendición llega a Tonal para una noche de <span className="text-secondary">salsa</span>, sudor y ritmo. Prepárate para la experiencia completa en vivo.
              </p>

              <div>
                <Link
                  href="/tour"
                  className="inline-flex items-center gap-3 border border-white/30 text-white font-mono text-sm uppercase tracking-[0.2em] font-black px-10 py-5 hover:bg-sky-retro hover:text-black hover:border-sky-retro transition-all duration-300 group/btn"
                >
                  Ver Todas las Fechas
                  <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </motion.div>

            {/* Live Photo */}
            <motion.div
              className="lg:col-span-5 h-[400px] lg:h-[520px] relative overflow-hidden border border-outline-variant/30"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <Image
                src="/tour-live.webp"
                alt="La Bendición Live"
                fill
                className="object-cover opacity-80 hover:opacity-100 transition-all duration-700 hover:scale-105 grayscale hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20 opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-6 border-t border-outline-variant">
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-primary mb-1">PRÓXIMA PARADA: CDMX</h4>
                <p className="font-sans text-on-surface-variant text-xs font-light">29 ABR — Tonal, Ciudad de México</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          06 · MERCH TEASER
      ═══════════════════════════════════════════ */}
      <section id="merch" className="py-16 md:py-24 relative z-10 border-t border-outline-variant/30">
        <div className="w-full max-w-[1440px] mx-auto px-6">

          <SectionHeader
            label="§ 04 — Tienda"
            title={<>TEMPORADA <span className="text-primary">2026</span></>}
            subtitle="Drop Oficial // Stock Limitado"
          />

          {/* Product previews — Shopify live */}
          <MerchTeaser />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link
              href="/merch"
              className="inline-flex items-center gap-3 bg-primary text-black font-mono text-sm uppercase tracking-[0.3em] font-black px-12 py-5 hover:bg-primary-container transition-all duration-300 group"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              Ver Tienda
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/40">
              labendicionofficial.com/merch
            </p>
          </motion.div>

        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <div
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              onClick={() => setSelectedVideo(null)}
            ></div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-[1200px] aspect-video bg-black shadow-2xl border border-white/10"
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-primary flex items-center gap-2 font-mono text-sm uppercase tracking-widest transition-colors"
              >
                <span className="material-symbols-outlined">close</span> Cerrar
              </button>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
