'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './Roots.module.css';

const roots = [
  {
    name: 'Colombia',
    description: 'El latido del tambor y el aroma a café que fluye por las venas.',
    image: '/images/roots-colombia.png', // I'll copy the generated one here
    accent: 'var(--primary)',
  },
  {
    name: 'México',
    description: 'La pasión cruda, los metales vibrantes y la flor viva.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQmXgK2jV68M49_Uo07OItH5mH-W9-5m5G8rI0tUuI1_rR5mU5zP_y7T4T8aL0qM7h4pZ1JqTjR_nZ8U9y8O_t1QxY9K_Q9TzP8H3r6zQ7RjZ_xP_J9nI7_oZ5O9y_RjP_qM8T8lZ8m5U_G_kX7pZ8m5U_G_kX7pZ8m5U_G_kX7pZ8',
    accent: 'var(--secondary)',
  },
  {
    name: 'Cuba',
    description: 'El son que envuelve, el sabor antiguo y la pura sabrosura.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQmXgK2jV68M49_Uo07OItH5mH-W9-5m5G8rI0tUuI1_rR5mU5zP_y7T4T8aL0qM7h4pZ1JqTjR_nZ8U9y8O_t1QxY9K_Q9TzP8H3r6zQ7RjZ_xP_J9nI7_oZ5O9y_RjP_qM8T8lZ8m5U_G_kX7pZ8m5U_G_kX7pZ8m5U_G_kX7pZ8',
    accent: 'var(--tertiary)',
  },
];

export default function Roots() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nuestras Raíces</h2>
          <p className={styles.subtitle}>
            Una mezcla cultural que define nuestro sonido. Elementos icónicos de nuestra herencia latinoamericana.
          </p>
        </div>

        <div className={styles.grid}>
          {roots.map((root, index) => (
            <motion.div
              key={root.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className={styles.card}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={root.image}
                  alt={root.name}
                  fill
                  className={styles.image}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{root.name}</h3>
                <p className={styles.cardDescription}>{root.description}</p>
              </div>
            </motion.div>
          ))}
          
          <motion.div 
            className={`${styles.card} ${styles.fullWidth}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className={styles.fullWidthContent}>
              <div>
                <h3 className={styles.cardTitle}>Un Sonido Único</h3>
                <p className={styles.cardDescription}>
                  Nuestra música es un viaje por Latinoamérica. Mezclamos instrumentos tradicionales 
                  con sintetizadores modernos para crear una experiencia que te transporta.
                </p>
                <Link href="/bio" className={styles.link}>
                  Conoce nuestra historia <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Small helper since I used Link
import Link from 'next/link';
