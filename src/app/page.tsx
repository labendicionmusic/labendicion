'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="w-full bg-background overflow-hidden selection:bg-primary selection:text-black">
      
      {/* Brutalist Watermark */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full whitespace-nowrap opacity-[0.03] pointer-events-none z-0 overflow-hidden mix-blend-screen">
        <h1 className="font-display text-[15vw] font-black tracking-tighter text-white">LA BENDICIÓN</h1>
      </div>

      {/* Kinetic Hero Section */}
      <section className="relative w-full h-[85vh] md:h-screen flex items-end justify-center z-10">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-index.jpg"
            alt="La Bendición Hero"
            fill
            className="object-cover opacity-90 contrast-110 object-top md:object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        </div>

        <motion.div 
          className="relative z-10 px-6 w-full max-w-[1440px] mx-auto flex flex-col justify-end h-full md:grid md:grid-cols-12 gap-2 md:gap-8 items-end pb-12 md:pb-32"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="md:col-span-8 md:col-start-1">
            <h1 className="font-display text-2xl sm:text-4xl md:text-7xl lg:text-8xl text-white leading-[0.85] font-black tracking-tighter uppercase">
              Ritmo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Salvaje.</span>
            </h1>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="md:col-span-4 md:col-start-9 flex flex-col items-start md:items-end text-left md:text-right border-l md:border-l-0 md:border-r-4 border-primary pl-6 md:pl-0 md:pr-6">
            <p className="font-sans text-base md:text-xl text-on-surface-variant font-light leading-relaxed mb-4 md:mb-8 max-w-sm">
              Salsa romántica y ritmos afrocaribeños fusionados con sonidos urbanos contemporáneos. No escuches, <strong>siente</strong>.
            </p>
            <div className="flex flex-col gap-4 w-full sm:w-auto">
              <Link href="/discografia" className="bg-primary text-black font-mono text-sm uppercase tracking-[0.2em] font-black px-12 py-5 hover:bg-white hover:scale-105 transition-all duration-300 text-center">
                Escuchar Ahora
              </Link>
              <Link href="/tour" className="border border-outline-variant text-white font-mono text-sm uppercase tracking-[0.2em] font-bold px-12 py-5 hover:border-primary hover:text-primary transition-all duration-300 text-center">
                Tour '26
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Asymmetric Roots Collage */}
      <section className="py-32 relative z-10 border-t border-outline-variant/30">
        <div className="w-full max-w-[1440px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-24 md:pl-24"
          >
            <h2 className="font-display text-5xl md:text-8xl font-black text-white uppercase tracking-tighter">Sangre <br/><span className="text-outline-variant">Mezclada</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
            {/* Left Column: Massive Kinetic Typography */}
            <motion.div 
              className="md:col-span-7 bg-surface-container border border-outline-variant/30 p-12 lg:p-20 flex flex-col justify-center relative overflow-hidden group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
              
              <h3 className="font-display text-4xl text-on-surface-variant font-bold uppercase tracking-tight mb-8">Nuestra Identidad</h3>
              
              <div className="flex flex-col gap-0 font-display text-7xl md:text-8xl lg:text-[7rem] font-black leading-[0.8] uppercase tracking-tighter">
                <span className="text-white hover:text-primary transition-colors duration-300">TRADICIÓN</span>
                <span className="text-outline-variant hover:text-secondary transition-colors duration-300">&amp;</span>
                <span className="text-white hover:text-primary transition-colors duration-300">MODERNIDAD</span>
              </div>
              
              <p className="font-sans text-xl text-on-surface-variant font-light mt-12 max-w-xl">
                Evocamos la nostalgia de los sonidos clásicos del Caribe que durante décadas han conmovido a generaciones.
              </p>
            </motion.div>

            {/* Right Column: Split Bento Boxes */}
            <div className="md:col-span-5 flex flex-col gap-8">
              
              {/* Top Box: Neon Primary (High Contrast) */}
              <motion.div 
                className="bg-primary p-10 lg:p-14 flex flex-col justify-between h-[50%] relative group overflow-hidden"
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

              {/* Bottom Box: Dark Variant */}
              <motion.div 
                className="bg-surface-variant p-10 lg:p-14 border border-outline-variant/30 flex flex-col justify-end h-[50%] relative"
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
                  Revitalizamos la riqueza de los ritmos afrocaribeños, fusionándolos con sonidos urbanos contemporáneos. Somos la nueva ola de salsa hecha en México.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Spacer to allow scrolling to see effects */}
      <div className="h-32"></div>
    </div>
  );
}
