import type { Fruit, User, Order, Cart, CartItem } from '../types/data';

// Helper function to get data from localStorage
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Helper function to save data to localStorage
const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to ${key} in localStorage:`, error);
  }
};

// Initialize default data if not exists
const initializeDefaultData = () => {
  if (!localStorage.getItem('fruits')) {
    // Add some default fruits
    saveToStorage('fruits', { 
      fruits: [
        {
          id: 1,
          name: 'Apple',
          price: 1.99,
          description: 'A crisp, sweet red apple',
          image: '/images/apple.jpg',
          stock: 100
        },
        {
          id: 2,
          name: 'Banana',
          price: 0.99,
          description: 'A ripe, yellow banana',
          image: '/images/banana.jpg',
          stock: 150
        }
      ] 
    });
  }
  
  if (!localStorage.getItem('users')) {
    // Add a default admin user
    saveToStorage('users', {
      users: [{
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123', // In a real app, this should be hashed
        fullName: 'Admin User',
        isAdmin: true,
        address: '',
        phone: '',
        createdAt: new Date().toISOString()
      }]
    });
  }
  
  if (!localStorage.getItem('orders')) {
    saveToStorage('orders', { orders: [] });
  }
  
  if (!localStorage.getItem('carts')) {
    saveToStorage('carts', {});
  }
};

// Initialize data on module load
initializeDefaultData();

// Fruits operations
export const getFruits = (): Fruit[] => {
  return getFromStorage<{ fruits: Fruit[] }>('fruits', { fruits: [] }).fruits;
};

export const getFruitById = (id: number): Fruit | undefined => {
  const fruits = getFruits();
  return fruits.find(fruit => fruit.id === id);
};

export const createFruit = (fruitData: Omit<Fruit, 'id'>): Fruit => {
  const fruits = getFruits();
  const newFruit: Fruit = {
    id: fruits.length > 0 ? Math.max(...fruits.map(f => f.id)) + 1 : 1,
    ...fruitData
  };
  saveToStorage('fruits', { fruits: [...fruits, newFruit] });
  return newFruit;
};

// Users operations
export const getUsers = (): User[] => {
  return getFromStorage<{ users: User[] }>('users', { users: [] }).users;
};

export const getUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

export const createUser = (userData: Omit<User, 'id' | 'createdAt' | 'isAdmin'>): User => {
  const users = getUsers();
  const newUser: User = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    ...userData,
    isAdmin: false,
    createdAt: new Date().toISOString(),
    address: userData.address || '',
    phone: userData.phone || ''
  };
  saveToStorage('users', { users: [...users, newUser] });
  return newUser;
};

// Cart operations
export const getCart = (userId: number): Cart => {
  const carts = getFromStorage<{ [key: string]: Cart }>('carts', {});
  return carts[userId] || { userId, items: [] };
};

export const saveCart = (cart: Cart): void => {
  const carts = getFromStorage<{ [key: string]: Cart }>('carts', {});
  saveToStorage('carts', { ...carts, [cart.userId]: cart });
};

export const addToCart = (userId: number, fruitId: number, quantity: number = 1): Cart => {
  const cart = getCart(userId);
  const existingItem = cart.items.find(item => item.fruitId === fruitId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ 
      fruitId, 
      quantity,
      addedAt: new Date().toISOString()
    });
  }
  
  saveCart(cart);
  return cart;
};

export const updateCartItemQuantity = (userId: number, fruitId: number, quantity: number): Cart => {
  const cart = getCart(userId);
  const item = cart.items.find(item => item.fruitId === fruitId);
  
  if (item) {
    if (quantity <= 0) {
      cart.items = cart.items.filter(item => item.fruitId !== fruitId);
    } else {
      item.quantity = quantity;
    }
    saveCart(cart);
  }
  
  return cart;
};

export const removeFromCart = (userId: number, fruitId: number): Cart => {
  const cart = getCart(userId);
  cart.items = cart.items.filter(item => item.fruitId !== fruitId);
  saveCart(cart);
  return cart;
};

export const clearCart = (userId: number): void => {
  const carts = getFromStorage<{ [key: string]: Cart }>('carts', {});
  delete carts[userId];
  saveToStorage('carts', carts);
};

// Order operations
export const getOrders = (): Order[] => {
  const { orders } = getFromStorage<{ orders: Order[] }>('orders', { orders: [] });
  return orders;
}

export function createOrder(userId: number, items: Array<{ fruitId: number; quantity: number }>): Order {
  const orders = getOrders();
  const fruits = getFruits();
  const now = new Date().toISOString();
  
  const orderItems = items.map(item => {
    const fruit = fruits.find(f => f.id === item.fruitId);
    if (!fruit) {
      throw new Error(`Fruit with ID ${item.fruitId} not found`);
    }
    return {
      fruitId: item.fruitId,
      quantity: item.quantity,
      price: fruit.price,
      name: fruit.name,
      image: fruit.image
    };
  });
  
  const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const newOrder: Order = {
    id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
    userId,
    items: orderItems,
    total,
    status: 'pending',
    createdAt: now,
    updatedAt: now
  };
  
  saveToStorage('orders', { orders: [...orders, newOrder] });
  
  // Clear the user's cart after creating an order
  clearCart(userId);
  
  return newOrder;
};

export const getOrdersByUser = (userId: number): Order[] => {
  const orders = getOrders();
  return orders.filter(order => order.userId === userId);
};
