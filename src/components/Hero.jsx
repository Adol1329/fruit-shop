import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative">
      {/* Hero Section with Background */}
      <section className="relative overflow-hidden bg-cover bg-center min-h-screen flex items-center" 
        style={{
          backgroundImage: 'url("images/background-image.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-green-900/20"></div>
        
        {/* Animated Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <div className="space-y-6 animate-fade-in">
              {/* Main Headline - First for maximum impact */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Farm-Fresh <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">Fruits</span> & <br/>
                <span className="bg-gradient-to-r from-emerald-300 to-green-400 bg-clip-text text-transparent">Vegetables</span> Delivered
              </h1>
              
              {/* Welcome Message - As a subtitle */}
              <div className="mb-2">
                <h2 className="text-2xl md:text-3xl font-medium text-white/90">
                  Welcome to <span className="text-green-300 font-semibold">FreshHarvest</span>! 🍏
                </h2>
                <p className="text-green-100 text-lg mt-2">
                  Your farm-to-table experience starts here. Discover the freshest, most flavorful produce nature has to offer.
                </p>
              </div>
              
              <p className="text-lg text-gray-200 leading-relaxed max-w-2xl">
                Hand-picked at peak ripeness and delivered with care to your doorstep. Experience the difference that true freshness makes.
              </p>

              {/* Trust Badge - Moved below description */}
              <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2 text-green-300 text-sm font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>🌟 Trusted by 10,000+ customers</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  to="/shop"
                  className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-2 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  <span className="relative">🛒</span>
                  <span className="relative">Shop Now</span>
                </Link>
                
                <Link
                  to="/about"
                  className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all flex items-center justify-center space-x-2"
                >
                  <span>Learn More</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="w-12 h-12 rounded-full border-3 border-white/30 bg-gray-200 overflow-hidden shadow-lg hover:scale-110 transition-transform">
                      <img 
                        src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'men' : 'women'}/${item}0.jpg`} 
                        alt="Customer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-3 border-white/30 bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-lg text-sm">
                    +10K
                  </div>
                </div>
                <div className="text-white">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                    <span className="ml-2 font-semibold">4.9</span>
                  </div>
                  <p className="text-gray-300 text-sm">Based on 2,000+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Fresh Fruits', icon: '🍎', count: '100+ Items', color: 'from-red-50 to-orange-50' },
            { name: 'Vegetables', icon: '🥦', count: '80+ Items', color: 'from-green-50 to-emerald-50' },
            { name: 'Dairy & Eggs', icon: '🥛', count: '50+ Items', color: 'from-blue-50 to-cyan-50' },
            { name: 'Beverages', icon: '🧃', count: '30+ Items', color: 'from-purple-50 to-pink-50' },
          ].map((item, index) => (
            <div 
              key={index}
              className="group bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-gray-100 relative overflow-hidden"
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-gray-500 mb-4">{item.count}</p>
                <Link 
                  to="/shop" 
                  className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 group-hover:gap-2 transition-all"
                >
                  <span>Shop Now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Hero