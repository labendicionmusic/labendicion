'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TiendaPage() {
  const categories = ['Todo', 'Vinilos', 'Ropa', 'Accesorios'];
  
  const products = [
    {
      id: 1,
      name: 'LP.01 // BENDICIÓN',
      price: '$45',
      description: 'Doble vinilo verde esmeralda translúcido con arte brutalista exclusivo del álbum debut.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_VvjibICOjSpgW3AXnDtrGKxpXjfN90gIKRP1ARqc3qVfbZp6gxdRmNh_ETE50JYAdERhGG9hxm1Y-8-bAzbuuD6vgtHGHEqAIP8oaMrRuMxxvgO9JDdJUjG07AAuaAGXsB73-LBHnxkDdfHeboGBJU3K-O5uNzwK4oEl14yCG6JvSzFcb7WH1CwmiyO4sr0muuguHdCli4Sy6kOI1BoElx9EXeSLdNPrre6BBr1cBVJgSAPEAekKI7SZeO9o1IplOlWpNQTfJLY',
      isFeatured: true,
      badge: 'EDICIÓN LIMITADA'
    },
    {
      id: 2,
      name: 'PLAYERA // AMANECER',
      price: '$30',
      description: 'Heavyweight cotton orgánico. Fit boxy.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-OOOq9YeZafieVSjpFv28X4sGDvGOh5BjiSGNOGBs2BP8lcjsYvubQU4MmFov-ZBeY7SUH5HfZLGigrkQ7SWx9xg8HlzQgDnkAgOrFgm-6dTGOiTuDr5JdyprgK7QHULBM6VcnQZeBlMIZMUB1HeohEK3KUDQPADGgj5QJeN9yqxqQbwAxweRVjQc2BFHwwAWAcgmVO_e2wC23EB-A3vi3P6kxBNsNkF9bxeI5W3QMOJSAQ3dtbZ4kOS_8JQCaf-RIsgYk4Ldn48',
      isFeatured: false
    },
    {
      id: 3,
      name: 'PLAYERA // CORE',
      price: '$25',
      description: 'La básica. Blanca con logo bordado alta definición.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ3kd_391jk4u9w-dPMMbLWy6l1h5NLL3CDVDac6OWrRAUwDmD1Ox2j1ppvrWoQaUA_MG-8IpCcx1MxN20RZYSnc-l8awNwmOvB0TuDHIGkmOmQiaXKsG3Cow8Es1nrOOHurut_XquHEaas55KoOoD2m4GEHpMXdWmaFZzyCM1EKDSZIsRwWdexaz3y7e2i_TaXb2G443-Bik0RRkvs1ecRO1V0Mm03SPcqLgWOE2R8L73Ygf6tW0qQh3FfG2f8Ook-FhUj8AstpU',
      isFeatured: false
    },
    {
      id: 4,
      name: 'GORRA // TROPICAL',
      price: '$22',
      description: '100% algodón premium.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdX3NXVUvc99OfP0OBGIe9R_RIJk7SbR_tESD2nl4jJB8o9mX6SrfGLWNeBxBLgRsOelz0h0-mn9BxscAdtAMBLN-xDd019IaZ_F3lVJopSY55rbalCyKAf74ayy_UyL_y21UYTuUrgxvb__d9benmC6HfjP42jz6DLR9SUyRi8s-4i6HBTYQCRAwRwDCMcZrRazIVo4F0mc2EiNM-o5gkAsxWihGlmyuYeshtW6G9NMvRfQ11BzjMuTLa44DyuTz_Jo2ubZWx9w4',
      isFeatured: false
    },
    {
      id: 5,
      name: 'BOLSA // RITMO',
      price: '$18',
      description: 'Heavy duty tote bag.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDguw7GpenpqLAlOP5ztM-0YZ_7g_jmyDyNhaddrfvZQ4r7HeknITMxE655zabIDYfd4d6eqjUawq2z06tbYTTbcaInddG8dliKBCdsxeZYWrU7Jsl3xvjxHZL9thA5J3QvKL18nQ7qc3x-7isZmuylrsrapveLu1mEzZFHeUXyKj1B69RqQOxLjLZqUNajrxHBRjwFYcbodmbSQd7NboSe3OUEe99LCh6Q78GY19yBiPaiGJxBziylwa4zcnzzyHv2DsZ1XBMkx7A',
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
              Temporada <span className="text-primary">1</span>
            </h1>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-on-surface-variant mt-4 font-bold">
              Drop Oficial
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

        {/* Streetwear Bento Grid */}
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
                  <p className="font-mono text-xs text-on-surface-variant uppercase tracking-widest mb-8">
                    {product.description}
                  </p>
                </div>
                
                {/* Price & Action */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 w-full border-t border-outline-variant/30 pt-6">
                  <span className={`font-mono font-black text-white ${
                    product.isFeatured ? 'text-4xl' : 'text-3xl'
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
