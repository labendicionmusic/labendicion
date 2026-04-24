'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const tourDates = [
  {
    month: 'Oct',
    day: '12',
    city: 'Bogotá, Colombia',
    venue: 'Movistar Arena',
    status: 'Boletos',
    soldOut: false
  },
  {
    month: 'Oct',
    day: '15',
    city: 'Medellín, Colombia',
    venue: 'Atanasio Girardot',
    status: 'Boletos',
    soldOut: false
  },
  {
    month: 'Nov',
    day: '02',
    city: 'CDMX, México',
    venue: 'Auditorio Nacional',
    status: 'Agotado',
    soldOut: true
  },
  {
    month: 'Nov',
    day: '18',
    city: 'Miami, USA',
    venue: 'Kaseya Center',
    status: 'Boletos',
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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center md:text-left"
        >
          <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.8] tracking-tighter uppercase">
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
            {['Global', 'Colombia', 'México', 'Venezuela', 'Cuba', 'USA', 'Europa'].map((region, i) => (
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
                
                <button className={`w-full sm:w-auto font-mono text-xs uppercase tracking-[0.2em] font-black px-10 py-5 transition-all duration-300 whitespace-nowrap ${
                  event.soldOut
                    ? 'border border-secondary text-secondary hover:bg-secondary hover:text-black'
                    : 'bg-primary text-black hover:bg-white hover:scale-105 shadow-[0_0_20px_rgba(0,255,157,0.2)] hover:shadow-[0_0_30px_rgba(0,255,157,0.5)]'
                }`}>
                  {event.status}
                </button>
              </motion.article>
            ))}
          </motion.div>

          {/* Right Column: Interactive Map */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-2/5 h-[500px] lg:h-[700px] sticky top-32 border border-outline-variant bg-surface-container relative flex items-center justify-center overflow-hidden grayscale contrast-125"
          >
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF89dQYjLCQaF1suuNTTFKX1iB1YzH6oYGtGFR96kNGmso0ya5-buvS56n6qkhJnNv-auOjGAIAsdvq8x5Xg7TZGoxyDSKXrban9kRNOkujeJm2CUR67VNkoLqfuLBTmvgSTTJ_-uFkbrFp8q0RFdwg16JgMynp8Kx7xUyjXSUVwtjlRAwp_wZu_2iO11CLlT2ktBidIULxf8Aud9_qW95X1KTHMmKAhobVRYnVQ13Qex9uEdFNoIfxdTXV-yVzu4leziqSzMRYHc" 
              alt="Global Tour Map" 
              fill 
              className="object-cover opacity-30 mix-blend-screen" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background opacity-80"></div>
            
            {/* Map Pins - Neon */}
            <div className="absolute top-[35%] left-[25%] animate-pulse">
              <span className="material-symbols-outlined text-primary text-3xl drop-shadow-[0_0_10px_rgba(0,255,157,0.8)]">emergency</span>
            </div>
            <div className="absolute top-[50%] left-[50%] animate-pulse" style={{ animationDelay: '0.5s' }}>
              <span className="material-symbols-outlined text-secondary text-5xl drop-shadow-[0_0_15px_rgba(255,94,0,0.8)]">emergency</span>
            </div>
            <div className="absolute top-[25%] left-[65%] animate-pulse" style={{ animationDelay: '1s' }}>
              <span className="material-symbols-outlined text-primary text-2xl drop-shadow-[0_0_10px_rgba(0,255,157,0.8)]">emergency</span>
            </div>

            {/* Radar Sweep Effect (CSS overlay) */}
            <div className="absolute inset-0 rounded-full border border-primary/20 scale-[2] pointer-events-none animate-[spin_10s_linear_infinite] [mask-image:conic-gradient(transparent_80%,black_100%)]"></div>

            {/* Map Legend */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-8 border-t border-outline-variant">
              <h4 className="font-mono text-sm uppercase tracking-[0.2em] font-bold text-primary mb-2">Objetivo Fijado</h4>
              <p className="font-sans text-on-surface-variant text-sm font-light">
                Destrucción global inminente. Más de 15 ciudades comprometidas por la ola Afrocaribeña.
              </p>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
