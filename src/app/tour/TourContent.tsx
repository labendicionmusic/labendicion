'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const tourDates = [
  {
    month: 'Abr',
    day: '29',
    city: 'CDMX, México',
    venue: 'Tonal',
    status: 'Boletos',
    url: 'https://www.tonaltonal.com/events/la-bendicion',
    soldOut: false
  }
];

export default function TourPage() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

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

        {/* Filters */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-16 border-b border-outline-variant pb-8"
        >
          <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
            {['Global', 'México'].map((region, i) => (
              <button key={region} className={`px-6 py-2 font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 hover:text-primary ${
                i === 0 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-on-surface-variant'
              }`}>
                {region}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Event List */}
          <motion.div 
            className="w-full lg:w-3/5 flex flex-col gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {tourDates.map((event, index) => (
              <motion.article 
                key={index} 
                variants={fadeInUp}
                className="bg-surface-container hover:bg-surface-variant border border-outline-variant/30 p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between transition-colors group relative overflow-hidden"
              >
                {/* Neon Hover Border Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300"></div>
                
                <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-12 w-full sm:w-auto mb-6 sm:mb-0 text-center sm:text-left">
                  <div className="min-w-[80px]">
                    <span className="block text-secondary font-mono text-sm uppercase tracking-widest font-bold">{event.month}</span>
                    <span className="block font-display text-5xl text-white font-black">{event.day}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-white mb-2 font-bold uppercase tracking-tight">{event.city}</h3>
                    <p className="font-sans text-on-surface-variant font-light flex items-center justify-center sm:justify-start gap-2">
                      <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                      {event.venue}
                    </p>
                  </div>
                </div>
                
                <a 
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full sm:w-auto font-mono text-xs uppercase tracking-[0.2em] font-black px-10 py-5 transition-all duration-300 whitespace-nowrap text-center ${
                    event.soldOut
                      ? 'border border-secondary text-secondary hover:bg-secondary hover:text-black pointer-events-none opacity-50'
                      : 'bg-primary text-black hover:bg-white hover:scale-105 shadow-[0_0_20px_rgba(0,255,157,0.2)] hover:shadow-[0_0_30px_rgba(0,255,157,0.5)]'
                  }`}
                >
                  {event.status}
                </a>
              </motion.article>
            ))}
          </motion.div>

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
              className="object-cover opacity-80 hover:opacity-100 transition-all duration-700 grayscale hover:grayscale-0" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background opacity-80"></div>
            
            {/* Live Info Legend */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md p-8 border-t border-outline-variant">
              <h4 className="font-mono text-sm uppercase tracking-[0.2em] font-bold text-primary mb-2">PRÓXIMA PARADA: CDMX</h4>
              <p className="font-sans text-on-surface-variant text-sm font-light leading-relaxed">
                La Bendición llega a Tonal para una noche de <span className="text-secondary">salsa</span>, sudor y ritmo. Prepárate para la experiencia completa en vivo.
              </p>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
