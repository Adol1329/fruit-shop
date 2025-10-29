import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSearch } from '../context/SearchContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()
  const { searchQuery, setSearchQuery } = useSearch()
  const { getCartItemsCount } = useCart()
  const { getWishlistCount } = useWishlist()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [localSearch, setLocalSearch] = useState('')
  const menuRef = useRef(null)
  const cartItemsCount = getCartItemsCount()
  const wishlistCount = getWishlistCount()

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (localSearch.trim()) {
      setSearchQuery(localSearch)
      navigate('/search')
    }
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <span className="text-4xl">🍃</span>
            <span className="text-2xl font-bold text-green-800">Yazoo</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search fruits..."
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-2.5 text-gray-400 text-xl">🔍</span>
            </div>
          </form>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-semibold transition-colors ${
                isActive('/') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className={`font-semibold transition-colors ${
                isActive('/shop') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Shop
            </Link>
            <Link 
              to="/about" 
              className={`font-semibold transition-colors ${
                isActive('/about') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`font-semibold transition-colors ${
                isActive('/contact') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Wishlist Icon */}
            <Link to="/wishlist" className="relative">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <span className="text-3xl">❤️</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </button>
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <span className="text-3xl">🛒</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
                    {cartItemsCount > 9 ? '9+' : cartItemsCount}
                  </span>
                )}
              </button>
            </Link>

            {isAuthenticated ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-all transform hover:scale-105 shadow-lg"
              >
                <span className="text-lg">👤</span>
                <span className="hidden sm:inline">{user?.name}</span>
                <span className="text-xs">▼</span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link
                    to="/shop"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    🛒 Shop Now
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link 
                to="/login" 
                className="text-green-600 hover:text-green-700 font-semibold transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition-all transform hover:scale-105 shadow-lg"
              >
                Sign Up
              </Link>
            </div>
          )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar