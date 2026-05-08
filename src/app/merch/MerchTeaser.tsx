'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { shopifyFetch, GET_PRODUCTS, type ShopifyProduct, type ShopifyImage } from '@/lib/shopify';

const STATIC_FALLBACK = [
  { src: '/merch-lp.webp',      alt: 'Vol. 1 LP',    badge: 'NUESTRO LP' },
  { src: '/merch-shirt.jpg',    alt: 'Playera',       badge: null },
  { src: '/merch-cap-black.jpg',alt: 'Gorra Negra',   badge: null },
  { src: '/merch-coasters.jpg', alt: 'Porta vasos',   badge: null },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function TeaserCard({ item }: {
  item: { src: string; hoverSrc: string | null; alt: string; badge: string | null; href: string }
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={item.href}
      className="relative aspect-square overflow-hidden border border-outline-variant/30 group bg-surface-container block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className={`object-contain p-6 transition-all duration-500 ${hovered && item.hoverSrc ? 'opacity-0' : 'opacity-100 group-hover:scale-105'}`}
      />
      {item.hoverSrc && (
        <Image
          src={item.hoverSrc}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={`object-contain p-6 transition-all duration-500 ${hovered ? 'opacity-100 scale-105' : 'opacity-0'}`}
        />
      )}
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {item.badge && (
        <span className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 font-mono text-[9px] font-black uppercase tracking-[0.2em] animate-pulse">
          {item.badge}
        </span>
      )}
    </Link>
  );
}

export default function MerchTeaser() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>(
      GET_PRODUCTS,
      { first: 4 }
    )
      .then((data) => setProducts(data.products.edges.map((e) => e.node)))
      .catch(() => {/* silently fall back to static */});
  }, []);

  const items = products.length >= 4
    ? products.slice(0, 4).map((p, i) => ({
        src: p.images.edges[0]?.node.url ?? p.featuredImage?.url ?? STATIC_FALLBACK[i].src,
        hoverSrc: p.images.edges[1]?.node.url ?? null,
        alt: p.title,
        badge: i === 0 ? 'NUESTRO LP' : null,
        href: '/merch',
      }))
    : STATIC_FALLBACK.map((f) => ({ ...f, hoverSrc: null, href: '/merch' }));

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 mb-16"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {items.map((item) => (
        <motion.div key={item.src} variants={fadeInUp}>
          <TeaserCard item={item} />
        </motion.div>
      ))}
    </motion.div>
  );
}
