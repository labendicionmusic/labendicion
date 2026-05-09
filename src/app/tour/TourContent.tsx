'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { TourDate } from '@/lib/airtable';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MESES: Record<number, string> = {
  1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun',
  7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic',
};

function parseDateParts(iso: string): { month: string; day: string; year: string } {
  const [y, m, d] = iso.split('-').map(Number);
  return { month: MESES[m] ?? '—', day: String(d).padStart(2, '0'), year: String(y) };
}

// ─── Animations ───────────────────────────────────────────────────────────────

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function TourContent() {
  const [dates, setDates]     = useState<TourDate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tour-dates')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setDates(data);
      })
      .catch(() => {/* silently use empty list */})
      .finally(() => setLoading(false));
  }, []);

  const next = dates[0];

  return (
    <div className="w-full pt-32 pb-32 bg-background min-h-screen text-on-background selection:bg-primary selection:text-black">

      {/* Brutalist Watermark */}
      <div className="fixed top-1/2 left-0 w-full whitespace-nowrap opacity-[0.02] pointer-events-none z-0 overflow-hidden mix-blend-screen -rotate-12 translate-y-32">
        <h1 className="font-display text-[20vw] font-black tracking-tighter text-white">WORLD TOUR</h1>
      </div>

      <main className="w-full max-w-[1440px] mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 border-l-8 border-primary pl-8"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.8] tracking-tighter uppercase">
            Tour <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">2026</span>
          </h1>
        </motion.header>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Left Column: Event List */}
          <div className="w-full lg:w-3/5 flex flex-col gap-6">

            {loading && (
              <div className="flex flex-col items-center justify-center py-32 gap-4">
                <span className="material-symbols-outlined text-primary/40 text-5xl animate-spin">progress_activity</span>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/30">Cargando fechas…</p>
              </div>
            )}

            {!loading && dates.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 gap-4">
                <span className="material-symbols-outlined text-white/20 text-5xl">event_busy</span>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/30">
                  Próximas fechas en preparación
                </p>
              </div>
            )}

            {!loading && dates.length > 0 && (
              <motion.div
                className="flex flex-col gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {dates.map((event) => {
                  const { month, day, year } = parseDateParts(event.date);
                  return (
                    <motion.article
                      key={event.id}
                      variants={fadeInUp}
                      className="bg-surface-container hover:bg-surface-variant border border-outline-variant/30 p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between transition-colors group relative overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />

                      <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-12 w-full sm:w-auto mb-6 sm:mb-0 text-center sm:text-left">
                        <div className="min-w-[80px]">
                          <span className="block text-secondary font-mono text-sm uppercase tracking-widest font-bold">{month}</span>
                          <span className="block font-display text-5xl text-white font-black">{day}</span>
                          <span className="block font-mono text-xs text-on-surface-variant uppercase tracking-widest">{year}</span>
                        </div>
                        <div>
                          <h3 className="font-display text-2xl text-white mb-2 font-bold uppercase tracking-tight">
                            {event.city}, {event.country}
                          </h3>
                          <p className="font-sans text-on-surface-variant font-light flex items-center justify-center sm:justify-start gap-2">
                            <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                            {event.venue}
                          </p>
                        </div>
                      </div>

                      {event.ticketsUrl ? (
                        <a
                          href={event.ticketsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto font-mono text-xs uppercase tracking-[0.2em] font-black px-10 py-5 transition-all duration-300 whitespace-nowrap text-center bg-primary text-black hover:bg-white hover:scale-105 shadow-[0_0_20px_rgba(0,255,157,0.2)] hover:shadow-[0_0_30px_rgba(0,255,157,0.5)]"
                        >
                          Boletos
                        </a>
                      ) : (
                        <span className="w-full sm:w-auto font-mono text-xs uppercase tracking-[0.2em] font-black px-10 py-5 whitespace-nowrap text-center border border-white/20 text-white/40">
                          Próximamente
                        </span>
                      )}
                    </motion.article>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Right Column: Live Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-2/5 h-[500px] lg:h-[700px] sticky top-32 border border-outline-variant bg-surface-container relative flex items-center justify-center overflow-hidden"
          >
            <Image
              src="/tour-live.webp"
              alt="La Bendición Live"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover opacity-80 hover:opacity-100 transition-all duration-700 grayscale hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background opacity-80" />

            <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md p-8 border-t border-outline-variant">
              {next ? (
                <>
                  <h4 className="font-mono text-sm uppercase tracking-[0.2em] font-bold text-primary mb-2">
                    PRÓXIMA PARADA: {next.city.toUpperCase()}
                  </h4>
                  <p className="font-sans text-on-surface-variant text-sm font-light leading-relaxed">
                    La Bendición llega a <span className="text-white">{next.venue}</span> para una noche de{' '}
                    <span className="text-secondary">salsa</span>, sudor y ritmo.
                  </p>
                </>
              ) : (
                <>
                  <h4 className="font-mono text-sm uppercase tracking-[0.2em] font-bold text-primary mb-2">
                    PRÓXIMAMENTE
                  </h4>
                  <p className="font-sans text-on-surface-variant text-sm font-light">
                    Nuevas fechas en preparación. Síguenos para no perderte nada.
                  </p>
                </>
              )}
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
