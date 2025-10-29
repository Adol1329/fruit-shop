import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [showPayment, setShowPayment] = React.useState(false)
  const [paymentProvider, setPaymentProvider] = React.useState('mtn')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [isPaying, setIsPaying] = React.useState(false)

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart' } })
      return
    }
    setShowPayment(true)
  }

  const handlePayNow = (e) => {
    e.preventDefault()
    if (!phoneNumber.trim()) {
      alert('Please enter your mobile money phone number')
      return
    }
    // Validate Rwanda phone number format: +250 780 000 000
    const phoneRegex = /^\+250\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}$/
    if (!phoneRegex.test(phoneNumber)) {
      alert('Please enter a valid Rwanda phone number (e.g. +250 780 000 000)')
      return
    }
    setIsPaying(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsPaying(false)
      setShowPayment(false)
      alert(`Payment successful via ${paymentProvider === 'mtn' ? 'Mobile Money' : 'Airtel Money'}! ✅`)
      clearCart()
      navigate('/shop')
    }, 1500)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-gray-600 mb-8">
              Start adding some fresh fruits to your cart!
            </p>
            <Link
              to="/shop"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-xl text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center space-x-6">
                  {/* Product Image/Emoji */}
                  <div className="text-6xl flex-shrink-0">{item.emoji}</div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl font-bold text-green-600">
                        RWF {item.price}
                        <span className="text-sm text-gray-500 font-normal">/{item.unit}</span>
                      </span>
                      {item.organic && (
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          🌱 Organic
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-600 hover:text-green-600 font-bold text-xl w-8 h-8 flex items-center justify-center transition-colors"
                      >
                        −
                      </button>
                      <span className="text-lg font-bold text-gray-900 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-600 hover:text-green-600 font-bold text-xl w-8 h-8 flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Subtotal</p>
                      <p className="text-xl font-bold text-gray-900">
                        RWF {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-semibold transition-colors"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">RWF {getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery (Rwanda-wide)</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">RWF {(getCartTotal() * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-green-600">RWF {(getCartTotal() * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg mb-4"
              >
                {isAuthenticated ? 'Pay with Mobile/Airtel Money' : 'Login to Checkout'}
              </button>

              <button
                onClick={clearCart}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-full font-semibold transition-all mb-4"
              >
                Clear Cart
              </button>

              <Link
                to="/shop"
                className="block text-center text-green-600 hover:text-green-700 font-semibold transition-colors"
              >
                ← Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <span>✅</span>
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🚚</span>
                    <span>Free Delivery Nationwide in Rwanda</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🔄</span>
                    <span>Easy Returns</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🌱</span>
                    <span>100% Organic Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Mobile Payment</h3>
              <button onClick={() => setShowPayment(false)} className="text-gray-400 hover:text-gray-600 text-xl">✖</button>
            </div>
            <form onSubmit={handlePayNow} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Provider</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="provider"
                      value="mtn"
                      checked={paymentProvider === 'mtn'}
                      onChange={() => setPaymentProvider('mtn')}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span>Mobile Money</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="provider"
                      value="airtel"
                      checked={paymentProvider === 'airtel'}
                      onChange={() => setPaymentProvider('airtel')}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span>Airtel Money</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  inputMode="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    let digits = e.target.value.replace(/\D/g, '') // only numbers
                    // Normalize to Rwanda format (+250 + 9 digits)
                    if (digits.startsWith('250')) {
                      digits = digits.slice(3)
                    } else if (digits.startsWith('07')) {
                      // Convert local 07xxxxxxxx -> +250 7xxxxxxxx
                      digits = digits.slice(1)
                    } else if (digits.startsWith('7')) {
                      // Already local without leading 0
                    } else {
                      // Remove any country-like prefix and try to keep last 9 digits
                      if (digits.length > 9) digits = digits.slice(digits.length - 9)
                    }
                    // Cap to 9 local digits
                    if (digits.length > 9) digits = digits.slice(0, 9)
                    const part1 = digits.slice(0, 3)
                    const part2 = digits.slice(3, 6)
                    const part3 = digits.slice(6, 9)
                    const formatted = `+250${part1 ? ' ' + part1 : ''}${part2 ? ' ' + part2 : ''}${part3 ? ' ' + part3 : ''}`
                    setPhoneNumber(formatted.trim())
                  }}
                  placeholder="+250 780 000 000"
                  maxLength={16}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  pattern="\+250\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}"
                  title="Please enter a valid Rwanda phone number (e.g. +250 780 000 000)"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-gray-700">
                <span>Amount</span>
                <span className="text-xl font-bold text-green-600">RWF {(getCartTotal() * 1.1).toFixed(2)}</span>
              </div>

              <button
                type="submit"
                disabled={isPaying}
                className={`w-full ${isPaying ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} text-white py-3 px-6 rounded-full font-semibold transition-all`}
              >
                {isPaying ? 'Processing...' : 'Pay Now'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                You will receive a prompt on your phone to authorize the payment.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
