import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import ImageWithSkeleton from '../components/ImageWithSkeleton'
import { getImageUrl } from '../utils/imageMap'

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } })
      return
    }
    addToCart(product)
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="text-8xl mb-6">❤️</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
            <p className="text-xl text-gray-600 mb-8">Browse the shop and add items you love.</p>
            <Link
              to="/shop"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
            >
              Explore Shop
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Your Wishlist</h1>
          <p className="text-xl text-gray-600">{wishlist.length} items you love</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all group"
            >
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-600 text-2xl"
                title="Remove from wishlist"
              >
                ❌
              </button>
              {/* Image or Emoji */}
              {product.image ? (
                <ImageWithSkeleton
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  width={112}
                  height={112}
                  className="mb-4 shadow-sm transition-transform duration-300 group-hover:scale-105" />
              ) : (
                <div className="text-8xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {product.emoji}
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.shortDescription || product.description}</p>
              </div>
              {product.organic && (
                <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mb-4">
                  🌱 Organic
                </span>
              )}
              <div className="text-2xl font-bold text-green-600 mb-4">
                RWF {product.price}
                <span className="text-sm text-gray-500 font-normal">/{product.unit}</span>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full font-semibold transition-all transform hover:scale-105"
              >
                {isAuthenticated ? 'Add to Cart' : 'Login to Buy'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
