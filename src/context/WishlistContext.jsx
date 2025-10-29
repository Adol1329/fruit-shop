import React, { createContext, useContext, useEffect, useState } from 'react'

const WishlistContext = createContext()

export const useWishlist = () => {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider')
  return ctx
}

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('fruitShopWishlist')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('fruitShopWishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (product) => {
    setWishlist(prev => prev.some(p => p.id === product.id) ? prev : [...prev, product])
  }

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(p => p.id !== productId))
  }

  const toggleWishlist = (product) => {
    setWishlist(prev => prev.some(p => p.id === product.id)
      ? prev.filter(p => p.id !== product.id)
      : [...prev, product]
    )
  }

  const isInWishlist = (productId) => wishlist.some(p => p.id === productId)
  const getWishlistCount = () => wishlist.length

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    getWishlistCount
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}
