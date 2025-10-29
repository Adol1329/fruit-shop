import React from 'react'
import productsData from '../data/products.json'
import ImageWithSkeleton from './ImageWithSkeleton'
import { getImageUrl } from '../utils/imageMap'

const ProductShowcase = () => {
  const featuredProducts = productsData.products.slice(0, 6)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-xl text-gray-600">Fresh from the farm to your table</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center transform hover:scale-110 transition-transform duration-300 cursor-pointer shadow-md hover:shadow-xl"
            >
              {product.image ? (
                <ImageWithSkeleton
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="mb-2 shadow-sm transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="text-6xl mb-3">{product.emoji}</div>
              )}
              <div className="text-sm font-semibold text-gray-700 mb-1">{product.name}</div>
              <div className="text-green-600 font-bold text-lg">RWF {product.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase