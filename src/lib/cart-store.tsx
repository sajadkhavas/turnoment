import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./mock-data";

export interface CartItem {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartCtx {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (p: Product, qty?: number) => void;
  remove: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "ima-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = useCallback((p: Product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === p.id);
      if (existing) return prev.map((i) => i.id === p.id ? { ...i, quantity: i.quantity + qty } : i);
      return [...prev, { id: p.id, slug: p.slug, name: p.name, price: p.salePrice ?? p.price, image: p.image, quantity: qty }];
    });
  }, []);

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: number, qty: number) => {
    if (qty <= 0) { setItems((prev) => prev.filter((i) => i.id !== id)); return; }
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartCtx>(() => ({
    items,
    count: items.reduce((s, i) => s + i.quantity, 0),
    subtotal: items.reduce((s, i) => s + i.price * i.quantity, 0),
    add, remove, setQty, clear,
  }), [items, add, remove, setQty, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used within CartProvider");
  return v;
}