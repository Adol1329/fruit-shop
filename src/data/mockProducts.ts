import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Apples',
    slug: 'organic-apples',
    description: 'Fresh organic apples from local farms',
    price: 2.99,
    unit: 'lb',
    stockQuantity: 100,
    imageUrl: '/images/fruits/apples.jpg',
    isFeatured: true,
    isActive: true,
    categoryId: 'fruits',
    nutritionInfo: {
      calories: 52,
      protein: 0.3,
      carbs: 14,
      fiber: 2.4,
      vitamins: ['C', 'K']
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Bananas',
    slug: 'bananas',
    description: 'Sweet and fresh bananas',
    price: 0.59,
    unit: 'lb',
    stockQuantity: 150,
    imageUrl: '/images/fruits/bananas.jpg',
    isFeatured: true,
    isActive: true,
    categoryId: 'fruits',
    nutritionInfo: {
      calories: 89,
      protein: 1.1,
      carbs: 23,
      fiber: 2.6,
      vitamins: ['C', 'B6']
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Add more products as needed
];
