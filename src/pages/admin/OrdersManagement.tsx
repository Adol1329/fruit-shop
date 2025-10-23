import { useEffect, useState } from 'react';
import { Clock, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import * as dataService from '../../lib/dataService';
import type { Order, OrderItem } from '../../types/data';

interface OrdersManagementProps {
  onNavigate: (page: string) => void;
}

export function OrdersManagement({ onNavigate }: OrdersManagementProps) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<(Order & { items: OrderItem[]; userName: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.isAdmin) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = () => {
    try {
      const allOrders = dataService.getOrders();
      const users = dataService.getUsers();
      const fruits = dataService.getFruits();

      const ordersWithDetails = allOrders.map(order => {
        const user = users.find(u => u.id === order.userId);
        const orderItems = order.items.map(item => {
          const fruit = fruits.find(f => f.id === item.fruitId);
          return {
            id: item.id,
            orderId: order.id,
            fruitId: item.fruitId,
            quantity: item.quantity,
            price: fruit?.price || 0,
            name: fruit?.name || 'Unknown',
            image: fruit?.image || '',
          };
        });

        return {
          ...order,
          userName: user?.fullName || 'Unknown',
          items: orderItems,
        };
      });

      // Sort by most recent first
      ordersWithDetails.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setOrders(ordersWithDetails);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    try {
      // In a real implementation, you would update the order status in your data service
      // For now, we'll just update the local state
      setOrders(orders.map(order =>
        order.id === orderId 
          ? { 
              ...order, 
              status, 
              updatedAt: new Date().toISOString() 
            } 
          : order
      ));
      
      // In a real app, you would call something like:
      // dataService.updateOrderStatus(orderId, status);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Manage Orders</h1>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
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
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-mono text-sm font-medium text-gray-900">
                          {order.id.slice(0, 8)}...
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Customer</p>
                        <p className="text-sm font-medium text-gray-900">{order.userName}</p>
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
                    <div className="flex items-center space-x-2">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value as Order['status'])
                        }
                        className={`px-3 py-2 rounded-lg text-sm font-medium focus:ring-2 focus:ring-green-500 ${getStatusColor(order.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      {getStatusIcon(order.status)}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                  <div className="space-y-2">
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between py-2 border-b border-gray-100">
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

                  <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Shipping Address</p>
                      <p className="text-sm text-gray-900">{order.shippingAddress}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Phone</p>
                      <p className="text-sm text-gray-900">{order.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
            <p className="text-gray-600">Orders will appear here once customers start shopping</p>
          </div>
        )}
      </div>
    </div>
  );
}
