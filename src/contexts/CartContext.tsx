import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';
import * as dataService from '../lib/dataService';
import type { CartItem as CartItemType, Fruit } from '../types/data';

interface CartItemWithProduct extends Omit<CartItemType, 'addedAt'> {
  product: Fruit;
  addedAt: string;
}

interface CartContextType {
  cartItems: CartItemWithProduct[];
  loading: boolean;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCart = useCallback(async () => {
    if (!user?.id) {
      setCartItems([]);
      return;
    }

    setLoading(true);
    try {
      const cart = dataService.getCart(user.id);
      const items: CartItemWithProduct[] = [];
      const now = new Date().toISOString();
      
      for (const item of cart.items) {
        const product = dataService.getFruitById(item.fruitId);
        if (product) {
          items.push({
            fruitId: item.fruitId,
            quantity: item.quantity,
            addedAt: item.addedAt || now,
            product: {
              ...product,
              slug: product.name.toLowerCase().replace(/\s+/g, '-')
            }
          } as CartItemWithProduct);
        }
      }
      
      setCartItems(items);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Load cart when user changes
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = async (productId: number, quantity: number = 1) => {
    if (!user?.id) return;

    try {
      dataService.addToCart(user.id, productId, quantity);
      await loadCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (!user?.id) return;
    
    try {
      if (quantity < 1) {
        await removeFromCart(productId);
      } else {
        dataService.updateCartItemQuantity(user.id, productId, quantity);
        await loadCart();
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId: number) => {
    if (!user?.id) return;

    try {
      dataService.removeFromCart(user.id, productId);
      await loadCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    if (!user?.id) return;

    try {
      dataService.clearCart(user.id);
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      loading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartTotal,
      cartCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
