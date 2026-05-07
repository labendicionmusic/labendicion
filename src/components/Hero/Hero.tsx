'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlayCircle, Calendar } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.imageWrapper}>
        <Image
          src="/images/hero.webp"
          alt="La Bendición Live Performance"
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.glassContent}
        >
          <span className={styles.badge}>Nuevo Sencillo Disponible</span>
          <h1 className={styles.title}>
            Siente el <span className="text-gradient">Ritmo</span> del Alma
          </h1>
          <p className={styles.description}>
            Una fusión vibrante de raíces latinas, energía tropical y sonidos modernos. 
            La Bendición te invita a bailar, sentir y vivir la música sin fronteras.
          </p>
          
          <div className={styles.ctaGroup}>
            <button className="btn-gradient">
              <PlayCircle size={20} />
              Escuchar Ahora
            </button>
            <button className={styles.secondaryBtn}>
              <Calendar size={20} />
              Fechas del Tour
            </button>
          </div>
        </motion.div>
      </div>

      <div className={styles.scrollIndicator}>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={styles.dot}
        />
      </div>
    </section>
  );
}
