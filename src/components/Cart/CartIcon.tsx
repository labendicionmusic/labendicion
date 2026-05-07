'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

export default function CartIcon() {
  const { openCart, totalQuantity } = useCart();

  return (
    <button
      onClick={openCart}
      aria-label="Abrir carrito"
      className="relative text-on-surface-variant hover:text-white transition-colors duration-200"
    >
      <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
      {totalQuantity > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-black font-mono text-[9px] font-black flex items-center justify-center leading-none">
          {totalQuantity > 9 ? '9+' : totalQuantity}
        </span>
      )}
    </button>
  );
}
