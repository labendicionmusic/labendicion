'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const SHOPIFY_URL = 'https://labendicionmusic.com';

const previews = [
  { src: '/merch-lp.webp',        alt: 'Vol. 1 LP' },
  { src: '/merch-shirt.jpg',      alt: 'Playera' },
  { src: '/merch-cap-black.jpg',  alt: 'Gorra Negra' },
  { src: '/merch-coasters.jpg',   alt: 'Porta vasos' },
];

export default function MerchPage() {
  return (
    <div className="w-full min-h-screen bg-background text-on-background flex flex-col">

      {/* Watermark */}
      <div className="fixed top-[20%] right-0 whitespace-nowrap opacity-[0.02] pointer-events-none z-0 overflow-hidden origin-bottom-right -rotate-90">
        <span className="font-display text-[15vw] font-black tracking-tighter text-white">MERCH</span>
      </div>

      {/* Hero CTA */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-24 relative z-10">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.5em] text-primary font-bold mb-6"
        >
          Drop Oficial // Temporada 2026
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-6xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter uppercase leading-none text-center mb-6"
        >
          Viste la<br />
          <span className="text-primary">Bendición</span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif italic text-xl md:text-2xl text-on-surface-variant text-center max-w-lg mb-14"
        >
          Stock limitado. Piezas que cargan el ritmo.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href={SHOPIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-flex items-center gap-4 bg-primary text-black font-mono text-sm uppercase tracking-[0.3em] font-black px-14 py-6 hover:bg-primary-container transition-all duration-300 group"
        >
          <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
          Ir a la Tienda
          <span className="material-symbols-outlined text-[22px] group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/40 mt-6"
        >
          labendicionmusic.com
        </motion.p>

        {/* Product Previews */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24 w-full max-w-4xl"
        >
          {previews.map((item, i) => (
            <motion.a
              key={item.src}
              href={SHOPIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="relative aspect-square overflow-hidden border border-outline-variant/30 group bg-surface-container"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-contain p-6 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/30 mt-8 text-center"
        >
          Click en cualquier pieza para ver la tienda completa
        </motion.p>

      </main>
    </div>
  );
}
