import React, { createContext, useContext, useState } from 'react'

const SearchContext = createContext()

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    category: 'all',
    organic: false,
    inStock: false,
    priceRange: [0, 100]
  })
  const [sortBy, setSortBy] = useState('popularity') // popularity, price-asc, price-desc, name-asc, name-desc

  const updateFilter = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  const resetFilters = () => {
    setFilters({
      category: 'all',
      organic: false,
      inStock: false,
      priceRange: [0, 100]
    })
    setSortBy('popularity')
    setSearchQuery('')
  }

  const filterProducts = (products) => {
    let filtered = [...products]

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.keywords.some(keyword => keyword.toLowerCase().includes(query))
      )
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category)
    }

    // Organic filter
    if (filters.organic) {
      filtered = filtered.filter(product => product.organic === true)
    }

    // In stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock === true)
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    )

    return filtered
  }

  const sortProducts = (products) => {
    const sorted = [...products]

    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price)
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name))
      case 'popularity':
      default:
        return sorted.sort((a, b) => b.popularity - a.popularity)
    }
  }

  const getFilteredAndSortedProducts = (products) => {
    const filtered = filterProducts(products)
    return sortProducts(filtered)
  }

  const value = {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    sortBy,
    setSortBy,
    resetFilters,
    filterProducts,
    sortProducts,
    getFilteredAndSortedProducts
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}
