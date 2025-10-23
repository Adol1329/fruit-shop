import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

interface CartProps {
  onNavigate: (page: string) => void;
}

export function Cart({ onNavigate }: CartProps) {
  const { user } = useAuth();
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      onNavigate('/login');
      return;
    }

    setIsLoading(true);

    // In a real app, you would process the payment here
    console.log('Processing order with items:', cartItems);
    
    // Simulate API call
    setTimeout(() => {
      // Clear the cart after successful checkout
      clearCart();
      onNavigate('/order-confirmation');
      setIsLoading(false);
    }, 1000);
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    try {
      // Ensure quantity is a valid number and at least 1
      const quantity = Math.max(1, Math.floor(Number(newQuantity)));
      if (!isNaN(quantity)) {
        updateQuantity(productId, quantity);
      }
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-6">You need to be signed in to view your cart</p>
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

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add some fresh fruits to get started!</p>
          <button
            onClick={() => onNavigate('products')}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div key={`${item.fruitId}-${index}`} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                    {item.product.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-3xl">🍎</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-500">{item.product.unit}</p>
                    <div className="mt-2 flex items-center">
                      <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => handleUpdateQuantity(item.fruitId, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.fruitId, parseInt(e.target.value) || 1)}
                        className="w-12 text-center border-0 focus:ring-0"
                      />
                      <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => handleUpdateQuantity(item.fruitId, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <span className="text-lg font-medium text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.fruitId)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-green-600">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0 || isLoading}
                className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${cartItems.length === 0 ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Place Order
                    <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
