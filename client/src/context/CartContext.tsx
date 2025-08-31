import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  thumb: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totals: {
    count: number;
    amount: number;
  };
  add: (item: Omit<CartItem, 'quantity'>) => void;
  remove: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("xpr_cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch {
        localStorage.removeItem("xpr_cart");
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("xpr_cart", JSON.stringify(items));
  }, [items]);

  const add = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item._id === newItem._id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item._id === newItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentItems, { ...newItem, quantity: 1 }];
    });
  };

  const remove = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item._id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      remove(id);
      return;
    }
    
    setItems(currentItems =>
      currentItems.map(item =>
        item._id === id ? { ...item, quantity } : item
      )
    );
  };

  const clear = () => {
    setItems([]);
  };

  const totals = {
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    amount: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
  };

  return (
    <CartContext.Provider value={{ items, totals, add, remove, updateQuantity, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

export { CartContext };
