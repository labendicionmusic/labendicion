'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

interface AddToCartButtonProps {
  variantId: string;
  available?: boolean;
  label?: string;
  className?: string;
}

export default function AddToCartButton({
  variantId,
  available = true,
  label = 'Agregar al carrito',
  className,
}: AddToCartButtonProps) {
  const { addItem, isLoading } = useCart();

  const baseClass =
    'inline-flex items-center justify-center gap-3 border border-white/30 text-white font-mono text-sm uppercase tracking-[0.2em] font-black px-10 py-5 transition-all duration-300 group/btn disabled:opacity-40 disabled:cursor-not-allowed';

  const activeClass = available
    ? 'hover:bg-sky-retro hover:text-black hover:border-sky-retro'
    : 'opacity-40 cursor-not-allowed';

  return (
    <button
      onClick={() => available && addItem(variantId)}
      disabled={!available || isLoading}
      className={`${baseClass} ${activeClass} ${className ?? ''}`}
    >
      {isLoading ? (
        <>
          <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
          Agregando...
        </>
      ) : available ? (
        <>
          {label}
          <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">
            shopping_bag
          </span>
        </>
      ) : (
        <>
          <span className="material-symbols-outlined text-[18px]">remove_shopping_cart</span>
          Agotado
        </>
      )}
    </button>
  );
}
