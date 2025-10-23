import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      // Mock categories data
      const mockCategories: Category[] = [
        {
          id: '1',
          name: 'Fruits',
          slug: 'fruits',
          description: 'Fresh and delicious fruits',
          imageUrl: '/images/fruits/apple.jpg',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Vegetables',
          slug: 'vegetables',
          description: 'Fresh and healthy vegetables',
          imageUrl: '/images/vegetables/carrot.jpg',
          createdAt: new Date().toISOString()
        }
      ];

      setCategories(mockCategories);
    } catch (err) {
      console.error('Error loading categories:', err);
      setError('Failed to load categories. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
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
          <button
            onClick={loadCategories}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Categories</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our selection of fresh, organic fruits by category
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden">
                {category.imageUrl ? (
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-48 bg-green-50 flex items-center justify-center">
                    <span className="text-gray-400 text-4xl">
                      {category.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {category.description}
                  </p>
                )}
                <div className="mt-4 text-sm font-medium text-green-600 group-hover:text-green-700">
                  View products →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No categories found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Categories;
