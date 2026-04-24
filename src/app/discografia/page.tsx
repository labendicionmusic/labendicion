'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DiscografiaPage() {
  const releases = [
    {
      id: 1,
      title: 'Vol 1.',
      year: '2026',
      type: 'ÁLBUM // PRÓXIMAMENTE',
      description: 'El primer álbum completo de La Bendición. La culminación de años de sencillos, presentaciones en vivo y una visión que ahora se materializa en un cuerpo de trabajo completo.',
      spotifyUrl: 'https://open.spotify.com/album/2dgIwDHlAmKP3E3jqjUS5e',
      tracks: [],
      isUpcoming: true
    },
    {
      id: 2,
      title: "Cuidao' Por Ahí",
      year: '2026',
      type: 'SENCILLO // NUEVO',
      description: 'El más reciente sencillo de la agrupación. Una advertencia con ritmo que fusiona la picardía caribeña con la energía urbana de la Ciudad de México.',
      spotifyUrl: 'https://open.spotify.com/album/5Svcfa7y1gKrdcRju04V24',
      tracks: ["Cuidao' Por Ahí"],
      isUpcoming: false
    },
    {
      id: 3,
      title: 'Todo Lo Que Tengo',
      year: '2025',
      type: 'SENCILLO',
      description: 'Una declaración de entrega absoluta. Salsa romántica en su máxima expresión, con una melodía que se queda grabada en el alma.',
      spotifyUrl: 'https://open.spotify.com/album/0XlMjpposFCzJIP4yeWYOb',
      tracks: ['Todo Lo Que Tengo'],
      isUpcoming: false
    },
    {
      id: 4,
      title: 'La Perla',
      year: '2025',
      type: 'SENCILLO',
      description: 'Con una melodía envolvente y una letra que conecta con el corazón, "La Perla" evoca la nostalgia de los sonidos clásicos del Caribe de una manera contemporánea y fresca.',
      spotifyUrl: 'https://open.spotify.com/album/4PxciYwCkUh4hvFuzBrBWi',
      tracks: ['La Perla'],
      isUpcoming: false
    },
    {
      id: 5,
      title: 'La Bendición',
      year: '2025',
      type: 'EP // 6 TRACKS',
      description: 'Nuestro primer cuerpo de trabajo extenso. Seis canciones que recorren el espectro completo de nuestro sonido: desde la salsa romántica más pura hasta fusiones urbanas que desafían fronteras.',
      spotifyUrl: 'https://open.spotify.com/album/63KaIxpTKXag7t1YFfit0x',
      tracks: ['Delito', "I Don't Love U", 'La Bemba', 'Una Noche de Estas', 'Callaita', 'El Sonido de la Calle'],
      isUpcoming: false
    },
    {
      id: 6,
      title: 'El Sonido De La Calle',
      year: '2024',
      type: 'SENCILLO',
      description: 'La calle como inspiración. Un tema que captura la energía cruda de las noches en la Ciudad de México, donde la salsa se encuentra con el asfalto.',
      spotifyUrl: 'https://open.spotify.com/album/3qsFIAREUFbGCMQ2181GAA',
      tracks: ['El Sonido De La Calle'],
      isUpcoming: false
    },
    {
      id: 7,
      title: 'La Bemba',
      year: '2024',
      type: 'SENCILLO',
      description: 'Ritmo contagioso y letra directa. "La Bemba" es el track que demuestra que la salsa puede ser tan cruda y honesta como cualquier género urbano.',
      spotifyUrl: 'https://open.spotify.com/album/6s5pLwAiW2RIB5ufJKgL50',
      tracks: ['La Bemba'],
      isUpcoming: false
    },
    {
      id: 8,
      title: 'LIVE @ ESTUDIOS NOVIEMBRE',
      year: '2024',
      type: 'EP // EN VIVO',
      description: 'Grabado en vivo en Estudios Noviembre, CDMX. La energía pura de la banda capturada sin filtros ni edición. Así suena La Bendición cuando nadie los detiene.',
      spotifyUrl: 'https://open.spotify.com/album/6h8Mcsb7ioG8aaeSG3KhON',
      tracks: [],
      isUpcoming: false
    },
    {
      id: 9,
      title: "I Don't Love U",
      year: '2024',
      type: 'SENCILLO',
      description: 'El lado bilingüe de La Bendición. Una ruptura cantada entre dos idiomas, dos culturas y un solo dolor universal.',
      spotifyUrl: 'https://open.spotify.com/album/3yOZ9wwvGMNOe4CpmLeVkR',
      tracks: ["I Don't Love U"],
      isUpcoming: false
    }
  ];

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="w-full pt-32 pb-32 bg-background min-h-screen text-on-background selection:bg-primary selection:text-black">
      <main className="w-full max-w-[1440px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 border-l-8 border-primary pl-8"
        >
          <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] font-black text-white tracking-tighter uppercase leading-[0.85]">
            MÚSICA
          </h1>
          <p className="font-mono text-xs uppercase tracking-[0.4em] font-bold text-on-surface-variant mt-6">
            Catálogo Oficial // Súbele al Volumen
          </p>
        </motion.header>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-wrap gap-8 md:gap-16 mb-20 pb-8 border-b border-outline-variant/30"
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

        {/* Releases Grid */}
        <motion.div 
          className="flex flex-col gap-0"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {releases.map((release, index) => (
            <motion.article 
              key={release.id} 
              variants={fadeInUp}
              className={`group relative border-b border-outline-variant/20 ${
                release.isUpcoming 
                  ? 'bg-primary/5 border-l-4 border-l-primary' 
                  : 'hover:bg-surface-container'
              } transition-colors duration-300`}
            >
              <a 
                href={release.spotifyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 p-8 md:p-10 w-full"
              >
                {/* Index Number */}
                <div className="hidden md:block min-w-[60px]">
                  <span className="font-mono text-on-surface-variant/40 text-sm font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Year Badge */}
                <div className="min-w-[80px]">
                  <span className={`font-mono text-sm font-black tracking-widest ${
                    release.isUpcoming ? 'text-primary animate-pulse' : 'text-secondary'
                  }`}>
                    {release.year}
                  </span>
                </div>

                {/* Title & Type */}
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-4 mb-2">
                    <h2 className={`font-display text-3xl md:text-4xl font-black uppercase tracking-tight leading-none ${
                      release.isUpcoming ? 'text-primary' : 'text-white group-hover:text-primary'
                    } transition-colors duration-300`}>
                      {release.title}
                    </h2>
                    <span className={`px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] font-black border ${
                      release.isUpcoming 
                        ? 'border-primary text-primary bg-primary/10' 
                        : 'border-outline-variant text-on-surface-variant'
                    }`}>
                      {release.type}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-on-surface-variant font-light leading-relaxed max-w-2xl">
                    {release.description}
                  </p>
                  
                  {/* Tracklist (only for EPs) */}
                  {release.tracks.length > 1 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {release.tracks.map((track, i) => (
                        <span key={i} className="font-mono text-[10px] text-on-surface-variant/60 uppercase tracking-wider border border-outline-variant/20 px-2 py-1">
                          {track}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Play Icon */}
                <div className={`min-w-[60px] flex items-center justify-center ${
                  release.isUpcoming ? 'opacity-50' : ''
                }`}>
                  <div className="w-12 h-12 rounded-full border-2 border-outline-variant/30 group-hover:border-primary group-hover:bg-primary flex items-center justify-center transition-all duration-300">
                    <span className="material-symbols-outlined text-white group-hover:text-black text-xl ml-0.5 transition-colors duration-300">
                      {release.isUpcoming ? 'schedule' : 'play_arrow'}
                    </span>
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </motion.div>

        {/* Streaming CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 pt-16 border-t-4 border-primary"
        >
          <h3 className="font-display text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
            Escúchanos en <span className="text-primary">todas</span> las plataformas
          </h3>
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://open.spotify.com/intl-es/artist/12Q80WdWl4ubLTb7SYzX4K" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#1DB954] text-black px-10 py-5 font-mono text-xs uppercase tracking-[0.2em] font-black flex items-center gap-3 hover:bg-white transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              Spotify
            </a>
            <a 
              href="https://music.apple.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-transparent border border-outline-variant text-white px-10 py-5 font-mono text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-3 hover:border-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Apple Music
            </a>
            <a 
              href="https://youtube.com/@labendicionmusic" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-transparent border border-outline-variant text-white px-10 py-5 font-mono text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-3 hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all duration-300"
            >
              YouTube
            </a>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
