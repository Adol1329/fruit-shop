import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Minus, Plus, Leaf, Star } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  categoryId?: string;
  imageUrl?: string;
  isFeatured: boolean;
  isActive: boolean;
  stockQuantity: number;
  unit: string;
  slug: string;
  nutritionInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fiber?: number;
    vitamins?: string[];
  };
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundProduct = mockProducts.find(p => p.id === id);
      setProduct(foundProduct || null);
      setLoading(false);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    setAdding(true);
    // Simulate API call
    setTimeout(() => {
      alert(`${quantity} ${product.name}(s) added to cart!`);
      setAdding(false);
    }, 500);
  };

  const increaseQuantity = () => {
    if (product && quantity < product.stockQuantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-4">The product you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/fruits')}
          className="flex items-center text-green-600 hover:text-green-700 font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-green-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Products</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Leaf className="h-16 w-16" />
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                  {product.isFeatured && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Featured
                    </span>
                  )}
                </div>

                {product.rating && (
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.floor(product.rating || 0)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating.toFixed(1)} ({product.reviewCount || 0} reviews)
                    </span>
                  </div>
                )}

                <p className="text-2xl font-semibold text-gray-900 mb-6">
                  ${product.price.toFixed(2)} <span className="text-sm text-gray-500">/ {product.unit}</span>
                </p>

                <div className="prose max-w-none mb-6">
                  <p className="text-gray-600">{product.description || 'No description available.'}</p>
                </div>

                {product.nutritionInfo && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nutrition Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {product.nutritionInfo.calories !== undefined && (
                        <div>Calories: {product.nutritionInfo.calories}</div>
                      )}
                      {product.nutritionInfo.protein !== undefined && (
                        <div>Protein: {product.nutritionInfo.protein}g</div>
                      )}
                      {product.nutritionInfo.carbs !== undefined && (
                        <div>Carbs: {product.nutritionInfo.carbs}g</div>
                      )}
                      {product.nutritionInfo.fiber !== undefined && (
                        <div>Fiber: {product.nutritionInfo.fiber}g</div>
                      )}
                      {product.nutritionInfo.vitamins && product.nutritionInfo.vitamins.length > 0 && (
                        <div>Vitamins: {product.nutritionInfo.vitamins.join(', ')}</div>
                      )}
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-500 mb-6">
                  <p>Stock: {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-sm font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="p-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      disabled={!product.stockQuantity || quantity >= product.stockQuantity}
                      className="p-1 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.stockQuantity || adding}
                  className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                    product.stockQuantity
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                >
                  {adding ? (
                    'Adding...'
                  ) : product.stockQuantity ? (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  ) : (
                    'Out of Stock'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
