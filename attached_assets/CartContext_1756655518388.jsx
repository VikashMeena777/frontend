import React, { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext();
const STORAGE_KEY = "xpr_cart_v1";

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { }
    }, [items]);

    const add = (p) => {
        setItems(prev => {
            const idx = prev.findIndex(x => x._id === p._id);
            if (idx >= 0) {
                const cp = [...prev]; cp[idx].qty += 1; return cp;
            }
            return [...prev, { ...p, qty: 1 }];
        });
    };
    const remove = (id) => setItems(prev => prev.filter(x => x._id !== id));
    const inc = (id) => setItems(prev => prev.map(x => x._id === id ? { ...x, qty: x.qty + 1 } : x));
    const dec = (id) => setItems(prev => prev.map(x => x._id === id && x.qty > 1 ? { ...x, qty: x.qty - 1 } : x));
    const clear = () => setItems([]);

    const totals = useMemo(() => {
        const subtotal = items.reduce((s, it) => s + (Number(it.price) || 0) * it.qty, 0);
        const gst = Math.round(subtotal * 0.18 * 100) / 100;
        return { count: items.reduce((s, it) => s + it.qty, 0), subtotal, gst, total: subtotal };
    }, [items]);

    return (
        <CartContext.Provider value={{ items, add, remove, inc, dec, clear, totals }}>
            {children}
        </CartContext.Provider>
    );
};
