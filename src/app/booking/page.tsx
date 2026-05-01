'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// ══════════════════════════════════════════════════════════════════════════════
//  CONFIGURACIÓN — actualiza los TODOs cuando tengas los datos
// ══════════════════════════════════════════════════════════════════════════════

const ARTIST = {
  name: 'La Bendición',
  slogan: "Agua bendita pa to' el mundo",
  heroPhoto: '/bio-hero.webp',
  genre: 'Salsa · Tropical Contemporánea · Afrocaribeño',
  origin: 'Ciudad de México',
  since: '2022',
};

// TODO: subir el PDF del EPK completo a /public/epk-labendicion.pdf
const EPK_PDF = '/epk-labendicion.pdf';

const BIO_SHORT = [
  'La Bendición es una agrupación de salsa y música tropical contemporánea originaria de la Ciudad de México, integrada por personalidades de trayectoria reconocida en la industria. Su propuesta busca honrar la herencia de la música afrocaribeña mediante la fusión de sonidos urbanos con un estilo fresco, poderoso y original.',
  'Desde su nacimiento en 2022, La Bendición ha evolucionado en forma y fondo, integrando nuevos talentos, explorando nuevas sonoridades y consolidándose como una de las propuestas más interesantes dentro del panorama tropical contemporáneo.',
];

const BIO_FULL = [
  'La Bendición nace cuando sus cuatro integrantes: Gabriel Melgarejo, Michael Rincón, Geovanis Alcántara (x3 Latin Grammy Winner) y Julián Bernal (x2 Latin Grammy Nominee) se juntan por primera vez para una jam session sin la expectativa de crear una banda. La inesperada sorpresa de concebir los primeros tres temas de la banda en esa sesión sembró la intriga de lo que pudiera pasar si se le imprimiera un poco de compromiso y disciplina a la creación en conjunto.',
  'Después de unos meses se tomó la decisión de reservar un día de estudio de grabación donde se grabaron esos primeros temas: "Delito", "I Don\'t Love U" y "Una Noche De Éstas". Los cuales se grabaron en bloque como se usaba grabar antes de la era digital. Sorprendidos por el resultado, la duda creció más fuerte y se tomó la decisión de formalizar la relación y afirmar el compromiso. Es así que la banda comienza a ensayar y a presentarse en escenarios de la Ciudad de México como "Café Paraíso", "Babalú", "Barba Azul" entre otros.',
  'Un año más tarde la banda lanza su primer EP homónimo "La Bendición" en donde recopilan todo el trabajo que se registró en ese período. Al ver que el público, la prensa y la industria recibían esa creación con brazos abiertos, la banda decide emprender el trabajo de su primer obra discográfica "Vol. 1". Este álbum comienza con la idea de atar los cabos de la escena tropical contemporánea a través de diferentes exponentes del género para lograr un sonido homogéneo en donde se pueda ver reflejada esta nueva visión de la salsa.',
  'Esta obra llega a un giro importante cuando la banda decide viajar a Cuba y a Miami en búsqueda de este sonido y personalidades afines a su visión, logrando concretar colaboraciones con personalidades como Andrés Levin (Grammy Winner), Donovan Morales, Camila Guevara (Grammy Nominee), Luis Figueroa, Dav Julca (Latin Grammy Winner), Melanie Santiler, Kid Pistola, América Valdés, Jambene y Ramón Álvarez. El resultado superó las expectativas de la banda y desde su lanzamiento ha sido acogido como una obra imprescindible de la música tropical contemporánea.',
];

const VIDEOS = [
  { title: 'Mal De Amor (feat. Camila Guevara)', youtubeId: 'QMYZJRabbYA' },
  { title: "Cuidao' Por Ahí (Visualizer)", youtubeId: '2fXAj_6F5jw' },
  { title: 'La Perla', youtubeId: 'zcyeXJZ-FRY' },
];

// Spotify track IDs — TODO: reemplazar con IDs individuales de cada track
// Para encontrarlos: abrir canción en Spotify → Share → Copy Song Link → el ID es el último segmento
const TRACKS = [
  { title: 'Mal De Amor (feat. Camila Guevara)', spotifyId: 'TODO_track_id_mal_de_amor' },
  { title: "Cuidao' Por Ahí", spotifyId: '5Svcfa7y1gKrdcRju04V24' },
  { title: 'La Perla', spotifyId: '4PxciYwCkUh4hvFuzBrBWi' },
];

// TODO: reemplazar con las fotos reales cuando las tengas
// Al menos 2 horizontales (aspect-video) y 2 verticales (aspect-[3/4])
const GALLERY: { src: string; alt: string; orientation: 'h' | 'v'; downloadable?: boolean }[] = [
  { src: '/bio-hero.webp',     alt: 'La Bendición — Foto de prensa 1', orientation: 'h', downloadable: true },
  { src: '/tour-live.webp',    alt: 'La Bendición — En vivo',          orientation: 'h', downloadable: true },
  { src: '/bio-landing.webp',  alt: 'La Bendición — Foto de prensa 2', orientation: 'v', downloadable: true },
  { src: '/hero-index.webp',   alt: 'La Bendición — Foto de prensa 3', orientation: 'v', downloadable: true },
  // TODO: añadir más fotos aquí
];

const SETLIST: string[] = [
  // TODO: completar el setlist
  '— Setlist por confirmar —',
];

const CALENDAR: { date: string; venue: string; city: string; tickets?: string }[] = [
  // TODO: actualizar con fechas reales
  { date: '— Por confirmar —', venue: '— Venue por confirmar —', city: 'Ciudad de México' },
];

const CONTACTS = [
  // TODO: completar con datos reales de contacto
  { role: 'Booking / Management', name: '— Por confirmar —', email: '— Por confirmar —', phone: '' },
  { role: 'Prensa', name: '— Por confirmar —', email: '— Por confirmar —', phone: '' },
];

// Archivos técnicos descargables
// TODO: subir los PDFs a /public/ y actualizar las rutas
const TECH_DOCS = [
  { label: 'Rider Técnico', icon: 'speaker', file: '/rider-tecnico-labendicion.pdf' },
  { label: 'Stage Plot', icon: 'stage', file: '/stage-plot-labendicion.pdf' },
  { label: 'Hospitality', icon: 'hotel', file: '/hospitality-labendicion.pdf' },
];

// ══════════════════════════════════════════════════════════════════════════════

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-mono text-[10px] text-primary tracking-[0.4em] uppercase">{number}</span>
      <div className="flex-1 h-px bg-white/10" />
      <span className="font-mono text-[10px] text-white/40 tracking-[0.4em] uppercase">{label}</span>
    </div>
  );
}

function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="relative w-full aspect-video bg-black overflow-hidden">
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

export default function BookingPage() {
  const [bioExpanded, setBioExpanded] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen bg-background text-on-background overflow-x-hidden selection:bg-primary selection:text-black">

      {/* ── TOP BAR ─────────────────────────────────────────────── */}
      <div className="w-full bg-black border-b border-white/10 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="relative h-7 w-7">
            <Image src="/logo-bendicion.svg" alt="La Bendición" fill className="object-contain" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/50 hidden sm:block">
            La Bendición
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="border border-white/20 text-white/50 font-mono text-[10px] uppercase tracking-[0.3em] px-3 py-1 hidden sm:block">
            Booking & EPK
          </span>
          <a
            href={EPK_PDF}
            download
            className="inline-flex items-center gap-2 bg-primary text-black font-mono text-[10px] uppercase tracking-[0.25em] font-black px-4 py-2 hover:bg-white transition-all duration-300"
          >
            <span className="material-symbols-outlined text-[14px]">download</span>
            EPK PDF
          </a>
        </div>
      </div>

      {/* ── 01 · HERO ───────────────────────────────────────────── */}
      <section className="relative w-full min-h-[70vh] md:min-h-screen flex items-end overflow-hidden">
        {/* Foto */}
        <div className="absolute inset-0">
          <Image
            src={ARTIST.heroPhoto}
            alt={ARTIST.name}
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        {/* Texto */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary mb-4">
              {ARTIST.genre}
            </p>
            <h1 className="font-display text-6xl sm:text-8xl md:text-[9rem] font-black tracking-tighter uppercase leading-[0.85] text-white mb-4">
              {ARTIST.name}
            </h1>
            <p className="font-serif italic text-xl md:text-2xl text-white/70 mb-8">
              &ldquo;{ARTIST.slogan}&rdquo;
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="font-mono text-xs text-white/40 uppercase tracking-[0.3em]">
                📍 {ARTIST.origin}
              </span>
              <span className="font-mono text-xs text-white/40 uppercase tracking-[0.3em]">
                Desde {ARTIST.since}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENIDO ───────────────────────────────────────────── */}
      <div className="w-full max-w-5xl mx-auto px-6">

        {/* ── 02 · BIO ──────────────────────────────────────────── */}
        <section className="py-16 md:py-20 border-t border-white/10">
          <SectionLabel number="01" label="Biografía" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-8 flex flex-col gap-6">
              {BIO_SHORT.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="font-sans text-white/75 text-base md:text-lg leading-relaxed"
                >
                  {p}
                </motion.p>
              ))}

              <AnimatePresence>
                {bioExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-6 overflow-hidden"
                  >
                    {BIO_FULL.map((p, i) => (
                      <p key={i} className="font-sans text-white/75 text-base md:text-lg leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setBioExpanded((v) => !v)}
                className="self-start inline-flex items-center gap-2 border border-white/20 text-white font-mono text-xs uppercase tracking-[0.25em] font-black px-6 py-3 hover:bg-sky-retro hover:text-black hover:border-sky-retro transition-all duration-300 mt-2"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {bioExpanded ? 'expand_less' : 'expand_more'}
                </span>
                {bioExpanded ? 'Leer menos' : 'Leer historia completa'}
              </button>
            </div>

            {/* Sidebar con datos clave */}
            <div className="md:col-span-4 flex flex-col gap-4">
              {[
                { label: 'Integrantes', value: 'Gabriel Melgarejo, Michael Rincón, Geovanis Alcántara, Julián Bernal' },
                { label: 'Reconocimientos', value: 'x3 Latin Grammy Winner · x2 Latin Grammy Nominee (miembros)' },
                { label: 'Género', value: ARTIST.genre },
                { label: 'Origen', value: ARTIST.origin },
                { label: 'Activos desde', value: ARTIST.since },
              ].map((item) => (
                <div key={item.label} className="border border-white/10 p-5 bg-surface-container">
                  <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary mb-2">{item.label}</p>
                  <p className="font-sans text-sm text-white/80 leading-snug">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 03 · VIDEOS ───────────────────────────────────────── */}
        <section className="py-16 md:py-20 border-t border-white/10">
          <SectionLabel number="02" label="Video" />

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {VIDEOS.map((v, i) => (
              <button
                key={i}
                onClick={() => setActiveVideo(i)}
                className={`font-mono text-xs uppercase tracking-[0.15em] px-5 py-3 transition-all duration-300 border text-left ${
                  activeVideo === i
                    ? 'bg-primary text-black border-primary font-black'
                    : 'border-white/20 text-white/60 hover:border-white/50 hover:text-white'
                }`}
              >
                {v.title}
              </button>
            ))}
          </div>

          <motion.div
            key={activeVideo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="border border-white/10"
          >
            <YouTubeEmbed
              videoId={VIDEOS[activeVideo].youtubeId}
              title={`La Bendición — ${VIDEOS[activeVideo].title}`}
            />
          </motion.div>
        </section>

        {/* ── 04 · TRACKS ───────────────────────────────────────── */}
        <section className="py-16 md:py-20 border-t border-white/10">
          <SectionLabel number="03" label="Escuchar" />

          <div className="flex flex-col gap-4">
            {TRACKS.map((track, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">
                  {track.title}
                </p>
                <iframe
                  src={`https://open.spotify.com/embed/album/${track.spotifyId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="152"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="border-0"
                  title={`La Bendición — ${track.title}`}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 05 · GALERÍA ──────────────────────────────────────── */}
        <section className="py-16 md:py-20 border-t border-white/10">
          <SectionLabel number="04" label="Galería de prensa" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {GALLERY.map((photo, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setLightboxSrc(photo.src)}
                className={`relative overflow-hidden bg-surface-container border border-white/10 group ${
                  photo.orientation === 'v' ? 'aspect-[3/4]' : 'aspect-video'
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    open_in_full
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Botones de descarga */}
          <div className="flex flex-wrap gap-3 mt-6">
            {GALLERY.filter((p) => p.downloadable).map((photo, i) => (
              <a
                key={i}
                href={photo.src}
                download
                className="inline-flex items-center gap-2 border border-white/20 text-white/60 font-mono text-[10px] uppercase tracking-[0.2em] px-4 py-2 hover:text-primary hover:border-primary transition-all duration-300"
              >
                <span className="material-symbols-outlined text-[14px]">download</span>
                Foto {i + 1}
              </a>
            ))}
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20 mt-4">
            {/* TODO: agregar más fotos en GALLERY cuando las tengas */}
            Click en cualquier foto para ampliar · Descargables en alta resolución
          </p>
        </section>

        {/* ── 06 · RIDER TÉCNICO ────────────────────────────────── */}
        <section className="py-16 md:py-20 border-t border-white/10">
          <SectionLabel number="05" label="Documentos técnicos" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10">
            {TECH_DOCS.map((doc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background p-8 flex flex-col items-center gap-5 text-center"
              >
                <span className="material-symbols-outlined text-primary text-4xl">{doc.icon}</span>
                <h3 className="font-display text-xl font-black uppercase tracking-tight text-white">
                  {doc.label}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                  {/* TODO: subir el PDF correspondiente a /public/ */}
                  PDF disponible próximamente
                </p>
                <a
                  href={doc.file}
                  download
                  className="inline-flex items-center gap-2 border border-white/20 text-white font-mono text-[10px] uppercase tracking-[0.25em] font-black px-6 py-3 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 opacity-40 pointer-events-none"
                  aria-disabled="true"
                >
                  <span className="material-symbols-outlined text-[14px]">download</span>
                  Descargar
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 07 · SETLIST ──────────────────────────────────────── */}
        <section className="py-16 md:py-20 border-t border-white/10">
          <SectionLabel number="06" label="Setlist" />

          <div className="border border-white/10 bg-surface-container p-8 md:p-12">
            {SETLIST[0] === '— Setlist por confirmar —' ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <span className="material-symbols-outlined text-primary/40 text-5xl">queue_music</span>
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-white/30">
                  {/* TODO: llenar el array SETLIST con las canciones */}
                  Setlist por confirmar
                </p>
              </div>
            ) : (
              <ol className="flex flex-col gap-3">
                {SETLIST.map((song, i) => (
                  <li key={i} className="flex items-baseline gap-5 border-b border-white/5 pb-3 last:border-0">
                    <span className="font-mono text-xs text-primary/50 w-6 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-lg font-bold text-white uppercase tracking-tight">{song}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>

        {/* ── 08 · CALENDARIO ───────────────────────────────────── */}
        <section className="py-16 md:py-20 border-t border-white/10">
          <SectionLabel number="07" label="Calendario" />

          <div className="flex flex-col gap-px bg-white/10">
            {CALENDAR[0].date === '— Por confirmar —' ? (
              <div className="bg-background flex flex-col items-center gap-4 py-12 text-center">
                <span className="material-symbols-outlined text-primary/40 text-5xl">calendar_month</span>
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-white/30">
                  {/* TODO: llenar el array CALENDAR con las fechas de tour */}
                  Fechas por confirmar
                </p>
              </div>
            ) : (
              CALENDAR.map((show, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="bg-background px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-sm text-primary font-bold">{show.date}</span>
                    <div>
                      <p className="font-display text-lg font-black uppercase tracking-tight text-white">{show.venue}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">{show.city}</p>
                    </div>
                  </div>
                  {show.tickets && (
                    <a
                      href={show.tickets}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-white/20 text-white font-mono text-[10px] uppercase tracking-[0.2em] font-black px-5 py-2 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 self-start sm:self-auto"
                    >
                      Boletos
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </a>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* ── 09 · CONTACTO ─────────────────────────────────────── */}
        <section className="py-16 md:py-20 border-t border-white/10">
          <SectionLabel number="08" label="Contacto" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10">
            {CONTACTS.map((contact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background p-8 flex flex-col gap-3"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">{contact.role}</p>
                <p className="font-display text-2xl font-black text-white tracking-tight">{contact.name}</p>
                {contact.email && contact.email !== '— Por confirmar —' ? (
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-mono text-sm text-white/60 hover:text-primary transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">mail</span>
                    {contact.email}
                  </a>
                ) : (
                  <p className="font-mono text-sm text-white/20">
                    {/* TODO: agregar email real */}
                    {contact.email}
                  </p>
                )}
                {contact.phone && (
                  <a
                    href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-white/60 hover:text-primary transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">phone</span>
                    {contact.phone}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </section>

      </div>{/* /max-w-5xl */}

      {/* ── FOOTER MINIMAL ──────────────────────────────────────── */}
      <footer className="w-full border-t border-white/10 bg-black py-8 px-6 mt-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-6 w-6">
              <Image src="/logo-bendicion.svg" alt="La Bendición" fill className="object-contain" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
              La Bendición © {new Date().getFullYear()}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20 text-center">
            Documento confidencial — solo para uso profesional
          </span>
          <a href="/" className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">
            labendicionofficial.com
          </a>
        </div>
      </footer>

      {/* ── LIGHTBOX ────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
            onClick={() => setLightboxSrc(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              onClick={() => setLightboxSrc(null)}
            >
              <span className="material-symbols-outlined text-4xl">close</span>
            </button>
            <div className="relative max-w-4xl w-full max-h-[90vh] aspect-auto">
              <Image
                src={lightboxSrc}
                alt="Foto de prensa"
                fill
                className="object-contain"
              />
            </div>
            <a
              href={lightboxSrc}
              download
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 bg-primary text-black font-mono text-xs uppercase tracking-[0.25em] font-black px-6 py-3 hover:bg-white transition-all duration-300"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Descargar foto
            </a>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
