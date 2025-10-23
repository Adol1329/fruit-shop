import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { getFruitById } from '../lib/dataService';

export interface CartItem {
  fruitId: number;
  quantity: number;
  addedAt: string;
}

interface CartContextType {
  cartItems: (CartItem & { fruit: any })[];
  loading: boolean;
  addToCart: (fruitId: number, quantity: number) => Promise<void>;
  updateQuantity: (fruitId: number, quantity: number) => void;
  removeFromCart: (fruitId: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fruits, setFruits] = useState<Record<number, any>>({});

  // Load cart from localStorage on initial load
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  // Load fruits data for cart items
  useEffect(() => {
    const loadFruits = async () => {
      if (cartItems.length === 0) return;

      try {
        const fruitIds = [...new Set(cartItems.map(item => item.fruitId))];
        const fruitsData: Record<number, any> = {};
        
        for (const id of fruitIds) {
          if (!fruits[id]) {
            const fruit = await getFruitById(id);
            if (fruit) {
              fruitsData[id] = fruit;
            }
          }
        }
        
        setFruits(prev => ({ ...prev, ...fruitsData }));
      } catch (error) {
        console.error('Failed to load fruits:', error);
      }
    };

    loadFruits();
  }, [cartItems]);

  const saveCart = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const addToCart = async (fruitId: number, quantity: number = 1) => {
    try {
      setLoading(true);
      const fruit = await getFruitById(fruitId);
      if (!fruit) {
        throw new Error('Product not found');
      }

      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.fruitId === fruitId);
        let newItems;

        if (existingItem) {
          newItems = prevItems.map(item =>
            item.fruitId === fruitId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newItems = [
            ...prevItems,
            {
              fruitId,
              quantity,
              addedAt: new Date().toISOString(),
            },
          ];
        }

        saveCart(newItems);
        return newItems;
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (fruitId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(fruitId);
      return;
    }

    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.fruitId === fruitId ? { ...item, quantity } : item
      );
      saveCart(newItems);
      return newItems;
    });
  };

  const removeFromCart = (fruitId: number) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.fruitId !== fruitId);
      saveCart(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  // Calculate cart total and count
  const cartTotal = cartItems.reduce((total, item) => {
    const fruit = fruits[item.fruitId];
    return total + (fruit ? fruit.price * item.quantity : 0);
  }, 0);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Enrich cart items with fruit data
  const enrichedCartItems = cartItems.map(item => ({
    ...item,
    fruit: fruits[item.fruitId] || null,
  }));

  const value = {
    cartItems: enrichedCartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
