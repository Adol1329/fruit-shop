import { Product, NutritionInfo } from '../types';

type DatabaseProduct = {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  price: number | string;
  unit: string;
  stock_quantity: number;
  image_url: string | null;
  nutrition_info: any;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export function mapDbToProduct(dbProduct: DatabaseProduct): Product {
  return {
    id: dbProduct.id,
    categoryId: dbProduct.category_id || undefined,
    name: dbProduct.name,
    slug: dbProduct.slug,
    description: dbProduct.description || undefined,
    price: typeof dbProduct.price === 'string' ? Number(dbProduct.price) : dbProduct.price,
    unit: dbProduct.unit,
    stockQuantity: dbProduct.stock_quantity,
    imageUrl: dbProduct.image_url || undefined,
    nutritionInfo: dbProduct.nutrition_info as NutritionInfo | undefined,
    isFeatured: dbProduct.is_featured,
    isActive: dbProduct.is_active,
    createdAt: dbProduct.created_at,
    updatedAt: dbProduct.updated_at,
  };
}

export function mapDbToProducts(dbProducts: DatabaseProduct[]): Product[] {
  return dbProducts.map(mapDbToProduct);
}
