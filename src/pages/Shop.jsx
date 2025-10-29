import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSearch } from '../context/SearchContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import ImageWithSkeleton from '../components/ImageWithSkeleton'
import { getImageUrl } from '../utils/imageMap'
import productsData from '../data/products.json'

const WishlistToggle = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const active = isInWishlist(product.id)
  return (
    <button
      onClick={(e) => { e.stopPropagation(); toggleWishlist(product) }}
      className={`absolute top-4 right-4 text-2xl transition-transform hover:scale-110 ${active ? 'text-pink-600' : 'text-gray-300 hover:text-pink-500'}`}
      title={active ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {active ? '❤️' : '🤍'}
    </button>
  )
}

const Shop = () => {
  const [products] = useState(productsData.products)
  const { isAuthenticated } = useAuth()
  const { filters, updateFilter, sortBy, setSortBy, getFilteredAndSortedProducts, resetFilters } = useSearch()
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const [showFilters, setShowFilters] = useState(false)

  const displayedProducts = getFilteredAndSortedProducts(products)

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      // Redirect to login with current location
      navigate('/login', { state: { from: location } })
      return
    }
    
    addToCart(product)
    // Show success notification
    alert(`${product.name} added to cart! 🛒`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Fresh Organic Fruits</h1>
          <p className="text-xl text-gray-600">Browse our complete collection of farm-fresh produce</p>
        </div>

        {/* Filters and Sorting Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all"
            >
              <span>🔧</span>
              <span className="font-semibold">Filters</span>
              <span className="text-sm">{showFilters ? '▲' : '▼'}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 font-semibold">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="popularity">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
              </select>
            </div>

            {/* Reset Filters */}
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-gray-600 hover:text-green-600 font-semibold transition-colors"
            >
              Reset All
            </button>

            {/* Results Count */}
            <div className="text-gray-600">
              <span className="font-bold">{displayedProducts.length}</span> products found
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">Category</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={filters.category === 'all'}
                      onChange={() => updateFilter('category', 'all')}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span>All Products</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={filters.category === 'fruits'}
                      onChange={() => updateFilter('category', 'fruits')}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span>Fruits</span>
                  </label>
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  Price Range: RWF {filters.priceRange[0]} - RWF {filters.priceRange[1]}
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.priceRange[1]}
                    onChange={(e) => updateFilter('priceRange', [0, parseInt(e.target.value)])}
                    className="w-full accent-green-600"
                  />
                </div>
              </div>

              {/* Other Filters */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">Other Filters</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.organic}
                      onChange={(e) => updateFilter('organic', e.target.checked)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span>🌱 Organic Only</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => updateFilter('inStock', e.target.checked)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span>✅ In Stock Only</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {displayedProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
            <button
              onClick={resetFilters}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl group"
            >
              {/* Wishlist Toggle */}
              <WishlistToggle product={product} />
              {/* Image or Emoji */}
              <div className="flex justify-center h-48 mb-4">
                {product.image ? (
                  <ImageWithSkeleton
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="object-contain h-full"
                  />
                ) : (
                  <div className="text-8xl">
                    {product.emoji}
                  </div>
                )}
              </div>
              
              {/* Product Details */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {product.shortDescription || product.description}
                </p>
                
                {product.organic && (
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2">
                    🌱 Organic
                  </span>
                )}
                
                <div className="mt-3 text-xl font-bold text-green-600">
                  RWF {product.price}
                  {product.unit && (
                    <span className="text-sm text-gray-500 font-normal ml-1">/{product.unit}</span>
                  )}
                </div>
                
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full font-semibold transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  {isAuthenticated ? 'Add to Cart' : 'Login to Buy'}
                </button>
              </div>
            </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help Choosing?</h2>
            <p className="text-gray-600 mb-6">Our fruit experts are here to help you select the perfect produce for your needs.</p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop