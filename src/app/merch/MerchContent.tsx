'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { shopifyFetch, GET_PRODUCTS, formatMoney, type ShopifyProduct } from '@/lib/shopify';

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: ShopifyProduct }) {
  const { addItem, isLoading, openCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  const variants = product.variants.edges.map((e) => e.node);
  const selectedVariant = variants[selectedVariantIdx];
  const images = product.images.edges.map((e) => e.node);
  const image = images[0] ?? product.featuredImage;
  const hoverImage = images[1] ?? null;
  const hasMultipleVariants = variants.length > 1 && variants[0].title !== 'Default Title';

  async function handleAddToCart() {
    if (!selectedVariant?.availableForSale) return;
    setAdding(true);
    try {
      await addItem(selectedVariant.id);
      openCart();
    } finally {
      setAdding(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col bg-surface-container border border-outline-variant/30 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Imagen */}
      <div className="relative aspect-square overflow-hidden bg-black">
        {image ? (
          <>
            <Image
              src={image.url}
              alt={image.altText ?? product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-contain p-6 transition-all duration-500 ${hovered && hoverImage ? 'opacity-0' : 'opacity-100 scale-100 group-hover:scale-105'}`}
            />
            {hoverImage && (
              <Image
                src={hoverImage.url}
                alt={hoverImage.altText ?? product.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={`object-contain p-6 transition-all duration-500 ${hovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-white/20 text-6xl">image</span>
          </div>
        )}

        {/* Badge agotado */}
        {!selectedVariant?.availableForSale && (
          <div className="absolute top-3 left-3 bg-black/80 border border-white/20 font-mono text-[9px] uppercase tracking-[0.3em] text-white/60 px-3 py-1">
            Agotado
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <h3 className="font-display text-lg font-black uppercase tracking-tight text-white leading-tight">
            {product.title}
          </h3>
          {product.description && (
            <p className="font-sans text-xs text-white/40 mt-1 leading-relaxed line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        {/* Selector de variantes */}
        {hasMultipleVariants && (
          <div className="flex flex-wrap gap-2">
            {variants.map((v, i) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariantIdx(i)}
                disabled={!v.availableForSale}
                className={`font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 border transition-all duration-200 ${
                  i === selectedVariantIdx
                    ? 'bg-primary text-black border-primary font-black'
                    : v.availableForSale
                    ? 'border-white/20 text-white/60 hover:border-white/50'
                    : 'border-white/10 text-white/20 line-through cursor-not-allowed'
                }`}
              >
                {v.title}
              </button>
            ))}
          </div>
        )}

        {/* Precio + botón */}
        <div className="flex items-center justify-between gap-4 mt-auto">
          <div>
            <p className="font-display text-2xl font-black text-primary leading-none">
              {selectedVariant ? formatMoney(selectedVariant.price) : formatMoney(product.priceRange.minVariantPrice)}
            </p>
            {selectedVariant?.compareAtPrice && (
              <p className="font-mono text-xs text-white/30 line-through mt-0.5">
                {formatMoney(selectedVariant.compareAtPrice)}
              </p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant?.availableForSale || adding || isLoading}
            className="inline-flex items-center gap-2 bg-primary text-black font-mono text-[10px] uppercase tracking-[0.2em] font-black px-5 py-3 hover:bg-white transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none"
          >
            <span className="material-symbols-outlined text-[16px]">
              {adding ? 'hourglass_top' : 'add_shopping_cart'}
            </span>
            {adding ? 'Agregando…' : 'Agregar'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Cart Button flotante ──────────────────────────────────────────────────────

function CartButton() {
  const { openCart, totalQuantity } = useCart();
  return (
    <button
      onClick={openCart}
      className="fixed bottom-8 right-8 z-30 w-14 h-14 bg-primary text-black flex items-center justify-center shadow-2xl hover:bg-white transition-all duration-300 hover:scale-110"
      aria-label="Ver carrito"
    >
      <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
      <AnimatePresence>
        {totalQuantity > 0 && (
          <motion.span
            key="badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 bg-black text-primary font-mono text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-primary"
          >
            {totalQuantity}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MerchContent() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>(
      GET_PRODUCTS,
      { first: 24 }
    )
      .then((data) => setProducts(data.products.edges.map((e) => e.node)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full min-h-screen bg-background text-on-background">

      {/* Watermark */}
      <div className="fixed top-[20%] right-0 whitespace-nowrap opacity-[0.02] pointer-events-none z-0 overflow-hidden origin-bottom-right -rotate-90">
        <span className="font-display text-[15vw] font-black tracking-tighter text-white">MERCH</span>
      </div>

      {/* Hero */}
      <div className="w-full pt-32 pb-16 px-6 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.5em] text-primary font-bold mb-6"
        >
          Drop Oficial // Temporada 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-4"
        >
          Viste la <span className="text-primary">Bendición</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif italic text-xl text-white/50"
        >
          Stock limitado. Piezas que cargan el ritmo.
        </motion.p>
      </div>

      {/* Productos */}
      <div className="w-full max-w-6xl mx-auto px-6 pb-32 relative z-10">

        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <span className="material-symbols-outlined text-primary/40 text-5xl animate-spin">progress_activity</span>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/30">Cargando productos…</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <span className="material-symbols-outlined text-secondary/60 text-5xl">error</span>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
              No se pudieron cargar los productos
            </p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <span className="material-symbols-outlined text-white/20 text-5xl">inventory_2</span>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/30">
              Próximamente — Drop en preparación
            </p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Carrito flotante */}
      <CartButton />
    </div>
  );
}
