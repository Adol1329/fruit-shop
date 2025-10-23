import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';

// Types
interface Product {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  price: number;
  unit: string;
  stockQuantity: number;
  imageUrl: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
}

interface ProductsManagementProps {
  onNavigate: (page: string) => void;
}

// Local storage keys
const STORAGE_KEYS = {
  PRODUCTS: 'freshpick_products',
  CATEGORIES: 'freshpick_categories'
};

// Helper functions for localStorage
const getFromStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

const saveToStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
};

// Mock data
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Fruits',
    slug: 'fruits',
    description: 'Fresh and delicious fruits',
    imageUrl: '/images/fruits.jpg',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Vegetables',
    slug: 'vegetables',
    description: 'Fresh and healthy vegetables',
    imageUrl: '/images/vegetables.jpg',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Dairy',
    slug: 'dairy',
    description: 'Fresh dairy products',
    imageUrl: '/images/dairy.jpg',
    createdAt: new Date().toISOString(),
  },
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Apples',
    categoryId: '1',
    description: 'Crisp and juicy red apples, perfect for snacking or baking.',
    price: 2.99,
    unit: 'kg',
    stockQuantity: 150,
    imageUrl: '/images/fruits/apple.jpg',
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Organic Carrots',
    categoryId: '2',
    description: 'Fresh organic carrots, rich in vitamins and perfect for any dish.',
    price: 1.99,
    unit: 'kg',
    stockQuantity: 200,
    imageUrl: '/images/vegetables/carrot.jpg',
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function ProductsManagement({ onNavigate }: ProductsManagementProps) {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    description: '',
    price: '',
    unit: 'kg',
    stockQuantity: '',
    imageUrl: '',
    isFeatured: false,
  });

  // Load data from localStorage or initialize with mock data
  const loadData = () => {
    try {
      setLoading(true);
      
      // Load categories
      const savedCategories = getFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES, []);
      if (savedCategories.length > 0) {
        setCategories(savedCategories);
      } else {
        saveToStorage(STORAGE_KEYS.CATEGORIES, mockCategories);
        setCategories(mockCategories);
      }

      // Load products
      const savedProducts = getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS, []);
      if (savedProducts.length > 0) {
        setProducts(savedProducts);
      } else {
        saveToStorage(STORAGE_KEYS.PRODUCTS, mockProducts);
        setProducts(mockProducts);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    if (user?.isAdmin) {
      loadData();
    }
  }, [user]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      categoryId: product.categoryId,
      description: product.description || '',
      price: product.price.toString(),
      unit: product.unit,
      stockQuantity: product.stockQuantity.toString(),
      imageUrl: product.imageUrl || '',
      isFeatured: product.isFeatured,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      categoryId: '',
      description: '',
      price: '',
      unit: 'kg',
      stockQuantity: '',
      imageUrl: '',
      isFeatured: false,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    try {
      // Validation
      if (!formData.name.trim()) {
        alert('Product name is required');
        return;
      }

      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        alert('Please enter a valid price');
        return;
      }

      const stockQuantity = parseInt(formData.stockQuantity) || 0;
      const now = new Date().toISOString();
      let updatedProducts: Product[];

      if (editingProduct) {
        // Update existing product
        updatedProducts = products.map(p => 
          p.id === editingProduct.id 
            ? { 
                ...p, 
                ...formData,
                price,
                stockQuantity,
                updatedAt: now
              } 
            : p
        );
      } else {
        // Add new product
        const newProduct: Product = {
          id: uuidv4(),
          name: formData.name,
          categoryId: formData.categoryId,
          description: formData.description,
          price,
          unit: formData.unit,
          stockQuantity,
          imageUrl: formData.imageUrl,
          isFeatured: formData.isFeatured,
          createdAt: now,
          updatedAt: now,
        };
        updatedProducts = [...products, newProduct];
      }

      // Save to state and localStorage
      setProducts(updatedProducts);
      saveToStorage(STORAGE_KEYS.PRODUCTS, updatedProducts);

      // Reset form and close modal
      setShowModal(false);
      setFormData({
        name: '',
        categoryId: '',
        description: '',
        price: '',
        unit: 'kg',
        stockQuantity: '',
        imageUrl: '',
        isFeatured: false,
      });
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      saveToStorage(STORAGE_KEYS.PRODUCTS, updatedProducts);
    }
  };

  const resetToMockData = () => {
    if (window.confirm('This will replace all products with the default mock data. Continue?')) {
      saveToStorage(STORAGE_KEYS.PRODUCTS, mockProducts);
      setProducts(mockProducts);
    }
  };

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="mb-6">You don't have permission to access this page.</p>
          <button
            onClick={() => onNavigate('landing')}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Manage Products</h1>
          <div className="flex space-x-4">
            <button
              onClick={handleAdd}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add Product</span>
            </button>
            <button
              onClick={resetToMockData}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              title="Reset to mock data"
            >
              Reset Data
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found.</p>
            <button
              onClick={handleAdd}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => {
                  const category = categories.find(c => c.id === product.categoryId);
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                🍎
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.description?.slice(0, 50)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {category?.name || 'Uncategorized'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${product.price.toFixed(2)} / {product.unit}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.stockQuantity === 0
                              ? 'bg-red-100 text-red-800'
                              : product.stockQuantity < 10
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {product.stockQuantity} in stock
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.isFeatured ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Featured
                          </span>
                        ) : null}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          title="Edit"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Add/Edit Product Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Organic Apples"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Product description..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price <span className="text-red-500">*</span>
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="pl-7 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unit
                      </label>
                      <select
                        value={formData.unit}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                        <option value="lb">lb</option>
                        <option value="oz">oz</option>
                        <option value="piece">piece</option>
                        <option value="dozen">dozen</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.stockQuantity}
                      onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                    {formData.imageUrl && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-500 mb-1">Preview:</div>
                        <img
                          src={formData.imageUrl}
                          alt="Product preview"
                          className="h-20 w-20 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">
                      Feature this product
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-5 w-5" />
                    <span>{editingProduct ? 'Update' : 'Save'} Product</span>
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}