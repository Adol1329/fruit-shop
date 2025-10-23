export interface User {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  address?: string;
  isAdmin: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  categoryId?: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  unit: string;
  stockQuantity: number;
  imageUrl?: string;
  nutritionInfo?: NutritionInfo;
  isFeatured: boolean;
  isActive: boolean;
  isInStock?: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface NutritionInfo {
  calories?: number;
  protein?: number;
  carbs?: number;
  fiber?: number;
  vitamins?: string[];
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  product?: Product;
}

export interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  phone: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId?: string;
  productName: string;
  productPrice: number;
  quantity: number;
  subtotal: number;
  createdAt: string;
}
