import { useEffect, useState } from 'react';
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getUsers } from '../../lib/dataService';

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
}

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadStats = async () => {
      try {
        // For now, we'll use mock data since we don't have orders in our data service
        const users = await getUsers();
        const totalUsers = users.length;

        // Mock data for demonstration
        interface MockOrder {
          total: number;
        }
        
        const mockOrders: MockOrder[] = [];
        const totalOrders = mockOrders.length;
        const totalRevenue = mockOrders.reduce((sum, order) => sum + (order.total || 0), 0);

        // Get fruits count from localStorage if available
        let totalProducts = 0;
        try {
          const fruitsData = localStorage.getItem('fruits');
          if (fruitsData) {
            const { fruits } = JSON.parse(fruitsData);
            totalProducts = fruits?.length || 0;
          }
        } catch (e) {
          console.error('Error loading fruits data:', e);
        }

        setStats({
          totalRevenue,
          totalOrders,
          totalProducts,
          totalUsers,
        });
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [user]);

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You need admin privileges to access this page</p>
          <button
            onClick={() => navigate('/')}
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-lg text-gray-600">Manage your FreshPick store</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            {loading ? (
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
            ) : (
              <p className="text-3xl font-bold text-gray-900">
                ${stats.totalRevenue.toFixed(2)}
              </p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
            {loading ? (
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
            ) : (
              <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Products</p>
            {loading ? (
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
            ) : (
              <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Users</p>
            {loading ? (
              <div className="h-8 bg-gray-200 rounded animate-pulse" />
            ) : (
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/admin/products')}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow text-left"
          >
            <Package className="h-8 w-8 text-green-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Products</h3>
            <p className="text-sm text-gray-600">Add, edit, or remove products from your catalog</p>
          </button>

          <button
            onClick={() => navigate('/admin/orders')}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow text-left"
          >
            <ShoppingCart className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Orders</h3>
            <p className="text-sm text-gray-600">View and update order statuses</p>
          </button>

          <button
            onClick={() => navigate('/admin/categories')}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow text-left"
          >
            <Package className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Categories</h3>
            <p className="text-sm text-gray-600">Organize products into categories</p>
          </button>
        </div>
      </div>
    </div>
  );
}
