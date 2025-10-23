import { useState, useEffect } from 'react';
import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { Order, OrderItem } from '../types';

// Mock data for orders
const mockOrders: (Order & { items: OrderItem[] })[] = [
  {
    id: '1',
    userId: 'user1',
    status: 'delivered',
    totalAmount: 29.97,
    shippingAddress: '123 Main St, Anytown',
    phone: '+1234567890',
    notes: 'Leave at the door',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: 'item1',
        orderId: '1',
        productName: 'Organic Apples',
        productPrice: 2.99,
        quantity: 2,
        subtotal: 5.98,
        createdAt: new Date().toISOString()
      }
    ]
  }
];

interface OrderHistoryProps {
  onNavigate: (page: string) => void;
}

export function OrderHistory({ onNavigate }: OrderHistoryProps) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<(Order & { items: OrderItem[] })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = () => {
    if (!user) return;

    try {
      // Use mock data instead of Supabase
      setOrders(mockOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <button
            onClick={() => onNavigate('login')}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Order History</h1>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-mono text-sm font-medium text-gray-900">
                          {order.id.slice(0, 8)}...
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="text-sm font-bold text-green-600">
                          ${order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="text-sm font-medium capitalize">{order.status}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Items</h3>
                  <div className="space-y-3">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium text-gray-900">{item.productName}</p>
                          <p className="text-sm text-gray-600">
                            ${item.productPrice.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          ${item.subtotal.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Shipping Address</p>
                    <p className="text-sm text-gray-900">{order.shippingAddress}</p>
                    <p className="text-sm text-gray-900 mt-1">{order.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
            <button
              onClick={() => onNavigate('products')}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
