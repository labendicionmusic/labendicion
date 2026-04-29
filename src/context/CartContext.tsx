'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  shopifyFetch,
  CREATE_CART,
  ADD_CART_LINES,
  REMOVE_CART_LINES,
  UPDATE_CART_LINES,
  type ShopifyCart,
} from '@/lib/shopify';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CartContextValue {
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  totalQuantity: number;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

const CART_ID_KEY = 'lb_cart_id';

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart]       = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen]   = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Recupera el carrito guardado en localStorage al montar
  useEffect(() => {
    const savedId = localStorage.getItem(CART_ID_KEY);
    if (savedId) {
      // Si hay carrito guardado lo usamos directamente (se actualizará en el próximo add)
      setCart((prev) => prev ? prev : ({ id: savedId } as ShopifyCart));
    }
  }, []);

  const openCart  = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    setIsLoading(true);
    try {
      const cartId = cart?.id ?? localStorage.getItem(CART_ID_KEY);
      const lines  = [{ merchandiseId: variantId, quantity }];

      let data: { cartCreate?: { cart: ShopifyCart }; cartLinesAdd?: { cart: ShopifyCart } };

      if (cartId) {
        data = await shopifyFetch(ADD_CART_LINES, { cartId, lines });
        setCart(data.cartLinesAdd!.cart);
      } else {
        data = await shopifyFetch(CREATE_CART, { lines });
        const newCart = data.cartCreate!.cart;
        localStorage.setItem(CART_ID_KEY, newCart.id);
        setCart(newCart);
      }

      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart) return;
    setIsLoading(true);
    try {
      const data: { cartLinesRemove: { cart: ShopifyCart } } =
        await shopifyFetch(REMOVE_CART_LINES, { cartId: cart.id, lineIds: [lineId] });
      setCart(data.cartLinesRemove.cart);
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    if (!cart) return;
    setIsLoading(true);
    try {
      if (quantity <= 0) {
        await removeItem(lineId);
        return;
      }
      const data: { cartLinesUpdate: { cart: ShopifyCart } } =
        await shopifyFetch(UPDATE_CART_LINES, {
          cartId: cart.id,
          lines: [{ id: lineId, quantity }],
        });
      setCart(data.cartLinesUpdate.cart);
    } finally {
      setIsLoading(false);
    }
  }, [cart, removeItem]);

  const totalQuantity = cart?.totalQuantity ?? 0;

  return (
    <CartContext.Provider value={{
      cart, isOpen, isLoading,
      openCart, closeCart,
      addItem, removeItem, updateItem,
      totalQuantity,
    }}>
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
}
