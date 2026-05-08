'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { formatMoney, type ShopifyCartLine } from '@/lib/shopify';

export default function CartDrawer() {
  const { cart, isOpen, isLoading, closeCart, removeItem, updateItem } = useCart();

  const lines: ShopifyCartLine[] = cart?.lines?.edges?.map((e) => e.node) ?? [];
  const isEmpty = lines.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-surface-container-low border-l border-outline-variant z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-outline-variant/40">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-on-surface-variant">
                  La Bendición
                </p>
                <h2 className="font-display text-2xl font-black text-white uppercase tracking-tighter leading-none mt-1">
                  Tu Carrito
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="text-on-surface-variant hover:text-white transition-colors"
                aria-label="Cerrar carrito"
              >
                <span className="material-symbols-outlined text-[28px]">close</span>
              </button>
            </div>

            {/* Lines */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {isEmpty ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
                  <span className="material-symbols-outlined text-[56px] text-on-surface-variant/30">
                    shopping_bag
                  </span>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-on-surface-variant">
                    Tu carrito está vacío
                  </p>
                  <button
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    Seguir comprando
                  </button>
                </div>
              ) : (
                lines.map((line) => (
                  <CartLineItem
                    key={line.id}
                    line={line}
                    onRemove={removeItem}
                    onUpdate={updateItem}
                    disabled={isLoading}
                  />
                ))
              )}
            </div>

            {/* Footer */}
            {!isEmpty && (
              <div className="border-t border-outline-variant/40 px-8 py-6 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-on-surface-variant">
                    Subtotal
                  </span>
                  <span className="font-display text-xl font-black text-primary">
                    {cart?.cost.subtotalAmount ? formatMoney(cart.cost.subtotalAmount) : '—'}
                  </span>
                </div>

                {/* Checkout CTA */}
                <a
                  href={cart?.checkoutUrl ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 bg-primary text-black font-mono text-sm uppercase tracking-[0.2em] font-black px-10 py-5 hover:bg-primary-container transition-all duration-300 group/btn"
                >
                  Proceder al Pago
                  <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </a>

                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/50 text-center">
                  Checkout seguro vía Shopify
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Line Item ────────────────────────────────────────────────────────────────

function CartLineItem({
  line,
  onRemove,
  onUpdate,
  disabled,
}: {
  line: ShopifyCartLine;
  onRemove: (id: string) => void;
  onUpdate: (id: string, qty: number) => void;
  disabled: boolean;
}) {
  const { merchandise, quantity } = line;
  const image = merchandise.product.featuredImage;

  return (
    <div className="flex gap-4">
      {/* Thumbnail */}
      <div className="relative w-20 h-20 shrink-0 border border-outline-variant/30 overflow-hidden bg-surface-container">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? merchandise.product.title}
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface-variant/30">image</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-sans text-sm text-white font-medium leading-tight truncate">
          {merchandise.product.title}
        </p>
        {merchandise.title !== 'Default Title' && (
          <p className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant mt-0.5">
            {merchandise.title}
          </p>
        )}
        <p className="font-display text-base font-black text-primary mt-1">
          {formatMoney(merchandise.price)}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => onUpdate(line.id, quantity - 1)}
            disabled={disabled}
            className="w-7 h-7 border border-outline-variant/40 text-on-surface-variant hover:border-white hover:text-white transition-colors flex items-center justify-center disabled:opacity-30"
            aria-label="Reducir cantidad"
          >
            <span className="material-symbols-outlined text-[16px]">remove</span>
          </button>

          <span className="font-mono text-sm text-white w-4 text-center">{quantity}</span>

          <button
            onClick={() => onUpdate(line.id, quantity + 1)}
            disabled={disabled}
            className="w-7 h-7 border border-outline-variant/40 text-on-surface-variant hover:border-white hover:text-white transition-colors flex items-center justify-center disabled:opacity-30"
            aria-label="Aumentar cantidad"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
          </button>

          <button
            onClick={() => onRemove(line.id)}
            disabled={disabled}
            className="ml-auto text-on-surface-variant/40 hover:text-secondary transition-colors disabled:opacity-30"
            aria-label="Eliminar"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
