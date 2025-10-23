import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/LocalCartContext';

export function CartPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    cartItems,
    loading,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
  } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (cartCount === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Looks like you haven't added anything to your cart yet.
            </p>
          </div>
          <div className="mt-8">
            <Link
              to="/fruits"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <ShoppingBag className="-ml-1 mr-2 h-5 w-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">
          Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
        </h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-8">
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.fruitId} className="py-6 flex">
                  {item.fruit?.image && (
                    <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                      <img
                        src={item.fruit.image}
                        alt={item.fruit.name}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                  )}
                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="text-lg">{item.fruit?.name || 'Product'}</h3>
                        <p className="ml-4">
                          ${(item.fruit?.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.fruit?.category}
                      </p>
                    </div>
                    <div className="flex-1 flex items-end justify-between text-sm">
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.fruitId, item.quantity - 1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="mx-2 text-gray-700">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.fruitId, item.quantity + 1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.fruitId)}
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 lg:mt-0 lg:col-span-4">
            <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">${cartTotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <p className="text-base font-medium text-gray-900">Order total</p>
                  <p className="text-base font-medium text-gray-900">${cartTotal.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-6">
                {user ? (
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Proceed to checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                ) : (
                  <div className="space-y-4">
                    <button
                      onClick={() => navigate('/login', { state: { from: '/cart' } })}
                      className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Sign in to checkout
                    </button>
                    <p className="text-center text-sm text-gray-500">
                      or{' '}
                      <button
                        onClick={() => navigate('/signup')}
                        className="font-medium text-green-600 hover:text-green-500"
                      >
                        create an account
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
