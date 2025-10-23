import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts';
import type { Product, Category } from '../types';
import { ProductCard } from '../components/ProductCard';

export function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const safeCategorySlug = categorySlug || ''; // Provide a default empty string
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategoryData();
  }, [categorySlug]);

  const loadCategoryData = async () => {
    try {
      setLoading(true);
      
      if (!categorySlug) {
        setError('Category not found');
        setLoading(false);
        return;
      }

      // Mock category data (now we know categorySlug is defined)
      const categoryData = {
        id: categorySlug,
        name: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
        slug: categorySlug,
        description: `All our fresh ${categorySlug}`,
        image_url: `/images/fruits/${categorySlug}.jpg`,
        created_at: new Date().toISOString(),
        isActive: true
      };

      setCategory({
        ...categoryData,
        imageUrl: categoryData.image_url,
        createdAt: categoryData.created_at
      });

      // Filter mock products by category slug    
      const formattedProducts = mockProducts
        .filter(p => p.categoryId === categorySlug)
        .map(p => ({
          ...p,
          // Ensure all required fields are present
          id: p.id,
          categoryId: p.categoryId,
          name: p.name,
          slug: p.slug,
          description: p.description || `${p.name} - Fresh and delicious`,
          price: p.price,
          unit: p.unit || 'kg',
          stockQuantity: p.stockQuantity || 10,
          imageUrl: p.imageUrl || `/images/fruits/${p.slug}.jpg`,
          isFeatured: p.isFeatured || false,
          isActive: p.isActive !== undefined ? p.isActive : true,
          rating: p.rating || 4.5,
          reviewCount: p.reviewCount || 12,
          isInStock: p.isInStock !== undefined ? p.isInStock : true
        }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error loading category data:', error);
      setError('Failed to load category data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{category?.name}</h1>
          {category?.description && (
            <p className="text-lg text-gray-600">{category.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onViewDetails={() => window.location.href = `/fruits/${product.slug}`}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
