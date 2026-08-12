"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductById, type Size } from "@/data/products";
import {
  cartItemKey,
  getCartSubtotal,
  getCartTotals,
  type CartItem,
} from "@/lib/cart";
import { pushAddToCartEvent, pushRemoveFromCartEvent } from "@/lib/gtm";

const STORAGE_KEY = "sadwell-cart";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (productId: string, size: Size, quantity?: number) => void;
  removeItem: (productId: string, size: Size) => void;
  updateItemSize: (productId: string, oldSize: Size, newSize: Size) => void;
  updateItemQuantity: (productId: string, size: Size, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    (productId: string, size: Size, quantity = 1) => {
      const amount = Math.max(1, Math.min(10, quantity));

      setItems((current) => {
        const key = cartItemKey(productId, size);
        const existing = current.find(
          (item) => cartItemKey(item.productId, item.size) === key,
        );

        const product = getProductById(productId);
        if (product) {
          pushAddToCartEvent(product, size, amount);
        }

        if (existing) {
          return current.map((item) =>
            cartItemKey(item.productId, item.size) === key
              ? {
                  ...item,
                  quantity: Math.min(10, item.quantity + amount),
                }
              : item,
          );
        }

        return [...current, { productId, size, quantity: amount }];
      });
      setIsOpen(true);
    },
    [],
  );

  const removeItem = useCallback((productId: string, size: Size) => {
    const key = cartItemKey(productId, size);
    setItems((current) => {
      const item = current.find(
        (entry) => cartItemKey(entry.productId, entry.size) === key,
      );
      const product = getProductById(productId);

      if (item && product) {
        pushRemoveFromCartEvent(product, size, item.quantity);
      }

      return current.filter(
        (entry) => cartItemKey(entry.productId, entry.size) !== key,
      );
    });
  }, []);

  const updateItemSize = useCallback(
    (productId: string, oldSize: Size, newSize: Size) => {
      if (oldSize === newSize) return;

      setItems((current) => {
        const oldKey = cartItemKey(productId, oldSize);
        const newKey = cartItemKey(productId, newSize);
        const item = current.find(
          (entry) => cartItemKey(entry.productId, entry.size) === oldKey,
        );
        if (!item) return current;

        const withoutOld = current.filter(
          (entry) => cartItemKey(entry.productId, entry.size) !== oldKey,
        );
        const existing = withoutOld.find(
          (entry) => cartItemKey(entry.productId, entry.size) === newKey,
        );

        if (existing) {
          return withoutOld.map((entry) =>
            cartItemKey(entry.productId, entry.size) === newKey
              ? { ...entry, quantity: entry.quantity + item.quantity }
              : entry,
          );
        }

        return [...withoutOld, { ...item, size: newSize }];
      });
    },
    [],
  );

  const updateItemQuantity = useCallback(
    (productId: string, size: Size, quantity: number) => {
      const key = cartItemKey(productId, size);

      if (quantity <= 0) {
        setItems((current) =>
          current.filter((item) => cartItemKey(item.productId, item.size) !== key),
        );
        return;
      }

      setItems((current) =>
        current.map((item) =>
          cartItemKey(item.productId, item.size) === key
            ? { ...item, quantity: Math.min(10, quantity) }
            : item,
        ),
      );
    },
    [],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const getPrice = useCallback(
    (productId: string) => getProductById(productId)?.price,
    [],
  );

  const value = useMemo<CartContextValue>(() => {
    const { subtotal, shipping, total } = getCartTotals(items, getPrice);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items,
      itemCount,
      subtotal,
      shipping,
      total,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateItemSize,
      updateItemQuantity,
      clearCart,
    };
  }, [
    items,
    isOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    updateItemSize,
    updateItemQuantity,
    clearCart,
    getPrice,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

export function useCartSubtotal(items: CartItem[]) {
  return getCartSubtotal(items, (id) => getProductById(id)?.price);
}
