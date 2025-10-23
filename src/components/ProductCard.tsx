import { ShoppingCart, Plus } from 'lucide-react';
import type { Product } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onViewDetails: () => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;

    setAdding(true);
    try {
      await addToCart(Number(product.id), 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div
      onClick={onViewDetails}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">🍎</span>
          </div>
        )}
        {product.isFeatured && (
          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            Featured
          </div>
        )}
        {product.stockQuantity === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description || 'Fresh and delicious'}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-green-600">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 ml-1">/ {product.unit}</span>
          </div>

          {user && product.stockQuantity > 0 && (
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {adding ? (
                <span className="text-sm">Adding...</span>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  <Plus className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>

        {product.stockQuantity > 0 && product.stockQuantity <= 10 && (
          <p className="text-xs text-orange-600 mt-2">
            Only {product.stockQuantity} left in stock!
          </p>
        )}
      </div>
    </div>
  );
}
