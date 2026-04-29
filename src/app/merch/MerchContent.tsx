'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MerchPage() {
  const categories = ['Todo', 'Música', 'Ropa', 'Accesorios'];
  
  const products = [
    {
      id: 1,
      name: 'La Bendición - Vol. 1 LP',
      price: '$500 MXN',
      description: '',
      image: '/merch-lp.webp',
      isFeatured: true,
      badge: 'PIEZA MAESTRA'
    },
    {
      id: 2,
      name: 'Playera "Agua bendita pa to el mundo"',
      price: '$450 MXN',
      description: '',
      image: '/merch-shirt.jpg',
      isFeatured: false
    },
    {
      id: 3,
      name: 'Gorra "LB" (Negra)',
      price: '$350 MXN',
      description: 'Gorra 100% gabardina deslavada con broche de belcro.',
      image: '/merch-cap-black.jpg',
      isFeatured: false
    },
    {
      id: 4,
      name: 'Gorra "LB" (Gris)',
      price: '$350 MXN',
      description: 'Gorra 100% gabardina deslavada con broche de belcro.',
      image: '/merch-cap-grey.jpg',
      isFeatured: false
    },
    {
      id: 5,
      name: 'Gorra Naranja "Rumba"',
      price: '$350 MXN',
      description: 'Gorra 100% gabardina deslavada con broche de belcro.',
      image: '/merch-cap-orange.jpg',
      isFeatured: false
    },
    {
      id: 6,
      name: 'Set 4 porta vasos "Vol. 1"',
      price: '$400 MXN',
      description: 'Colección de 4 porta vasos "Vol. 1". El complemento ideal para tu zona de escucha.',
      image: '/merch-coasters.jpg',
      isFeatured: false
    }
  ];

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const popIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <div className="w-full pt-32 pb-32 bg-background min-h-screen text-on-background selection:bg-secondary selection:text-white">
      
      {/* Brutalist Watermark */}
      <div className="fixed top-[20%] right-0 whitespace-nowrap opacity-[0.02] pointer-events-none z-0 overflow-hidden mix-blend-screen origin-bottom-right -rotate-90">
        <h1 className="font-display text-[15vw] font-black tracking-tighter text-white">MERCH</h1>
      </div>

      <main className="w-full max-w-[1440px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-outline-variant pb-8 gap-8"
        >
          <div>
            <h1 className="font-display text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
              TEMPORADA <span className="text-primary">2026</span>
            </h1>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-on-surface-variant mt-4 font-bold">
              Drop Oficial // Stock Limitado
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <button 
                key={cat} 
                className={`px-6 py-2 font-mono text-xs uppercase tracking-[0.1em] font-bold transition-all duration-300 ${
                  i === 0 
                    ? 'bg-white text-black' 
                    : 'bg-transparent text-on-surface-variant border border-outline-variant hover:border-white hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.header>

        {/* Merch Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[minmax(400px,auto)]"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => (
            <motion.article 
              key={product.id} 
              variants={popIn}
              className={`${
                product.isFeatured ? 'md:col-span-8 md:flex-row' : 'md:col-span-4 flex-col'
              } bg-surface-container border border-outline-variant/50 overflow-hidden flex group relative`}
            >
              {/* Image Container */}
              <div className={`${
                product.isFeatured ? 'w-full md:w-1/2 h-[400px] md:h-full' : 'w-full h-[320px]'
              } relative overflow-hidden bg-black flex items-center justify-center p-8`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-8 transition-transform duration-1000 group-hover:scale-110 drop-shadow-2xl grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                
                {product.badge && (
                  <span className="absolute top-6 left-6 bg-secondary text-white px-4 py-1 font-mono text-[10px] font-black uppercase tracking-[0.2em] z-10 animate-pulse">
                    {product.badge}
                  </span>
                )}
              </div>
              
              {/* Content Container */}
              <div className={`${
                product.isFeatured ? 'w-full md:w-1/2 p-10 md:p-14' : 'p-8 flex-grow'
              } flex flex-col justify-between bg-surface-container`}>
                <div>
                  <h2 className={`font-display font-black text-white uppercase tracking-tight mb-2 ${
                    product.isFeatured ? 'text-4xl lg:text-5xl' : 'text-2xl'
                  }`}>
                    {product.name}
                  </h2>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-8 font-light">
                    {product.description}
                  </p>
                </div>
                
                {/* Price & Action */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 w-full border-t border-outline-variant/30 pt-6">
                  <span className={`font-mono font-black text-white ${
                    product.isFeatured ? 'text-4xl' : 'text-2xl'
                  }`}>
                    {product.price}
                  </span>
                  <button className="w-full sm:w-auto bg-white text-black px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] font-black flex items-center justify-center gap-2 hover:bg-primary transition-colors duration-300">
                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                    Comprar
                  </button>
                </div>
              </div>

              {/* Neo-brutalist decorative corner */}
              <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-outline-variant bg-background z-10 pointer-events-none"></div>
            </motion.article>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
