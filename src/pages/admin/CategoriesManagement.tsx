import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
};

interface CategoriesManagementProps {
  onNavigate: (page: string) => void;
}

export function CategoriesManagement({ onNavigate }: CategoriesManagementProps) {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (user?.isAdmin) {
      loadCategories();
    }
  }, [user]);

  const loadCategories = () => {
    try {
      // For now, we'll use a simple mock data since we don't have categories in dataService
      const mockCategories: Category[] = [
        {
          id: 1,
          name: 'Fruits',
          slug: 'fruits',
          description: 'Fresh and delicious fruits',
          imageUrl: '/images/fruits/apple.jpg',
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'Vegetables',
          slug: 'vegetables',
          description: 'Fresh and healthy vegetables',
          imageUrl: '/images/vegetables/carrot.jpg',
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          name: 'Dairy',
          slug: 'dairy',
          description: 'Fresh dairy products',
          imageUrl: '/images/dairy/milk.jpg',
          createdAt: new Date().toISOString(),
        },
      ];

      setCategories(mockCategories);
      setLoading(false);
    } catch (error) {
      console.error('Error loading categories:', error);
      setLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      imageUrl: category.imageUrl || '',
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      imageUrl: '',
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      if (editingCategory) {
        // Update existing category
        const updatedCategory = {
          ...editingCategory,
          name: formData.name,
          slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
          description: formData.description || undefined,
          imageUrl: formData.imageUrl || undefined,
        };

        setCategories(categories.map(cat =>
          cat.id === editingCategory.id ? updatedCategory : cat
        ));
      } else {
        // Create new category
        const newCategory: Category = {
          id: Math.max(0, ...categories.map(c => c.id)) + 1, // Generate new ID
          name: formData.name,
          slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
          description: formData.description || undefined,
          imageUrl: formData.imageUrl || undefined,
          createdAt: new Date().toISOString(),
        };

        setCategories([newCategory, ...categories]);
      }

      setShowModal(false);
      setFormData({ name: '', description: '', imageUrl: '' });
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      setCategories(categories.filter(cat => cat.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <button
            onClick={() => onNavigate('landing')}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Manage Categories</h1>
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Category</span>
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                <div className="h-32 bg-gray-200 rounded mb-4" />
                <div className="h-6 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
              <div key={category.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  {category.imageUrl ? (
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl">📦</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {category.description || 'No description'}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="text-sm">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingCategory ? 'Edit Category' : 'Add Category'}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-5 w-5" />
                    <span>Save</span>
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
