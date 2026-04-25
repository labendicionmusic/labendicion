'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BioPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  return (
    <div className="w-full pt-32 pb-32 bg-background min-h-screen text-on-background selection:bg-secondary selection:text-white">
      <main className="w-full max-w-[1440px] mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 border-l-8 border-primary pl-8"
        >
          <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] font-black text-white tracking-tighter uppercase leading-[0.85]">
            HISTORIA
          </h1>
          <p className="font-mono text-xs uppercase tracking-[0.4em] font-bold text-on-surface-variant mt-6">
            Nuestra Historia // La Nueva Ola
          </p>
        </motion.header>

        {/* Hero Image - Immersive Atmospheric Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative -mx-6 md:-mx-12 w-[calc(100%+3rem)] md:w-[calc(100%+6rem)] h-[400px] md:h-[850px] overflow-hidden mb-24"
        >
          <Image
            src="/bio-hero.jpg"
            alt="La Bendición en vivo"
            fill
            className="object-cover grayscale opacity-40 contrast-125 brightness-75"
            priority
          />
          
          {/* Blend Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-60"></div>

          {/* Minimal Archive Label */}
          <div className="absolute bottom-12 left-12 md:left-24 font-mono text-[10px] uppercase tracking-[0.5em] text-white/30">
            [ ARCHIVE_REF_23JSBV ]
          </div>
        </motion.div>

        {/* Narrative Content */}
        <article className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <p className="font-serif text-xl md:text-2xl text-white/90 leading-relaxed mb-10 font-light">
              <span className="float-left text-7xl md:text-9xl font-black text-primary pr-6 pt-2 leading-[0.8] tracking-tighter">T</span>
              odo comenzó en 2022. La Bendición no es solo una agrupación; somos la nueva ola de la salsa hecha en México, el resultado de un choque cultural hermoso entre las raíces afrocaribeñas y el sonido urbano contemporáneo.
            </p>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed mb-16 font-light">
              Buscamos revitalizar la riqueza de los ritmos clásicos del Caribe que durante décadas han conmovido a generaciones. Fusionamos esa nostalgia con nuestro propio estilo fresco y poderoso para proponer una nueva manera de hablar del amor dentro de la música latina.
            </p>
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="my-24 relative"
          >
            <div className="absolute -left-6 top-0 bottom-0 w-2 bg-gradient-to-b from-secondary to-primary"></div>
            <p className="pl-8 md:pl-12 font-serif italic text-3xl md:text-5xl text-white leading-tight">
              "No hacemos música para ser escuchada, hacemos música para ser sentida en el pecho y bailada con el espíritu."
            </p>
          </motion.blockquote>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="font-display text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">Evolución Musical</h2>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed mb-6 font-light">
              Al integrar metales ardientes, percusión profunda y ritmos urbanos, logramos forjar un sonido que desafía las fronteras. Nuestro compromiso es renovar la salsa con autenticidad, sensibilidad y estilo propio.
            </p>
            <p className="font-sans text-lg text-on-surface-variant leading-relaxed font-light">
              Este nivel de excelencia nos ha llevado a colaborar con titanes de la industria. Nuestro sonido está respaldado por productores de la talla de Geovanis Alcántara (ganador de tres Latin Grammy), Julián Bernal (dos veces nominado al Latin Grammy) y Gabriel Melgarejo, consolidando nuestra propuesta a nivel mundial.
            </p>
          </motion.div>
        </article>

        {/* Massive Typography Outro */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mt-32 pt-16 border-t-4 border-primary relative overflow-hidden"
        >
          <div className="flex justify-between items-center mb-8">
            <span className="font-mono text-primary font-bold tracking-[0.3em] uppercase text-sm">Origen_</span>
            <span className="font-mono text-on-surface-variant font-bold tracking-[0.3em] uppercase text-sm">Destino_</span>
          </div>

          <div className="w-full overflow-hidden flex flex-col gap-0 items-center justify-center py-12">
            <h2 className="font-display text-7xl md:text-[10rem] lg:text-[14rem] leading-[0.8] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-background uppercase tracking-tighter text-center w-full select-none">
              SIN
            </h2>
            <h2 className="font-display text-7xl md:text-[10rem] lg:text-[14rem] leading-[0.8] font-black text-primary uppercase tracking-tighter text-center w-full select-none mix-blend-screen -mt-4 md:-mt-12 relative z-10">
              FRONTERAS
            </h2>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
