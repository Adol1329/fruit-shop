interface Fruit {
  id: number;
  name: string;
  price: number;
  unit: string;
  category: string;
  image: string;
  description: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  fullName: string;
  isAdmin: boolean;
  address: string;
  phone: string;
  createdAt: string;
}

interface OrderItem {
  fruitId: number;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

interface CartItem {
  fruitId: number;
  quantity: number;
  addedAt: string;
}

interface Cart {
  userId: number;
  items: CartItem[];
}

// Data store interfaces
interface FruitsData {
  fruits: Fruit[];
  categories: Category[];
}

interface UsersData {
  users: User[];
  orders: Order[];
  carts: Cart;
}

export type { Fruit, Category, User, Order, Cart, CartItem, FruitsData, UsersData };
