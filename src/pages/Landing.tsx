import { ArrowRight, Leaf, Truck, Shield, Star, Sparkles, Heart, Award } from 'lucide-react';
import { useEffect, useState } from 'react';

// Mock Product type
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

// Mock products for demo
const mockProducts: Product[] = [
  { id: '1', name: 'Fresh Strawberries', price: 5.99, image: '�草', slug: 'strawberries' },
  { id: '2', name: 'Organic Apples', price: 4.49, image: '🍎', slug: 'apples' },
  { id: '3', name: 'Ripe Bananas', price: 3.99, image: '🍌', slug: 'bananas' },
  { id: '4', name: 'Sweet Oranges', price: 6.99, image: '🍊', slug: 'oranges' },
];

function ProductCard({ product, onViewDetails }: { product: Product; onViewDetails: () => void }) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
      <div className="relative bg-gradient-to-br from-green-50 to-green-100 h-48 flex items-center justify-center overflow-hidden">
        <div className="text-7xl group-hover:scale-110 transition-transform duration-500">
          {product.image}
        </div>
        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Heart className="h-5 w-5 text-red-500" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">${product.price}</span>
          <button
            onClick={onViewDetails}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export function Landing() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTimeout(() => {
      setFeaturedProducts(mockProducts);
      setLoading(false);
    }, 800);

    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{
            top: `${20 + mousePosition.y * 0.02}%`,
            left: `${10 + mousePosition.x * 0.02}%`,
            transform: `translate(-50%, -50%)`,
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{
            top: `${60 + mousePosition.y * 0.015}%`,
            right: `${15 + mousePosition.x * 0.015}%`,
            transform: `translate(50%, -50%)`,
            animationDelay: '1s',
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>🍎</div>
          <div className="absolute top-40 right-20 text-5xl opacity-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>🍌</div>
          <div className="absolute bottom-32 left-20 text-7xl opacity-20 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>🍊</div>
          <div className="absolute bottom-20 right-32 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>🍇</div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Badge with animation */}
          <div className="inline-block mb-6 animate-fade-in">
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-sm font-bold shadow-lg">
              <Sparkles className="h-4 w-4 animate-spin" style={{ animationDuration: '3s' }} />
              <span>Farm to Door in 24 Hours</span>
              <Sparkles className="h-4 w-4 animate-spin" style={{ animationDuration: '3s', animationDelay: '1.5s' }} />
            </div>
          </div>

          {/* Main Heading with staggered animation */}
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-tight">
            <span className="inline-block animate-fade-in-up">Fresh</span>{' '}
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.1s' }}>Fruits,</span>
            <br />
            <span className="inline-block bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Delivered Daily
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Experience the taste of farm-fresh fruits delivered straight to your doorstep.
            <span className="block mt-2 font-semibold text-green-700">Quality, freshness, and nutrition in every bite.</span>
          </p>

          {/* CTA Buttons with enhanced effects */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button className="group relative px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center space-x-2">
                <span>Shop Now</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
            
            <button className="group px-10 py-5 bg-white text-green-600 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl border-3 border-green-200 hover:border-green-400 transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center space-x-2">
                <span>Learn More</span>
                <div className="w-2 h-2 bg-green-600 rounded-full animate-ping" />
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="text-center">
              <div className="text-4xl font-black text-green-600 mb-1">10K+</div>
              <div className="text-sm text-gray-600 font-semibold">Happy Customers</div>
            </div>
            <div className="text-center border-x-2 border-green-200">
              <div className="text-4xl font-black text-green-600 mb-1">50+</div>
              <div className="text-sm text-gray-600 font-semibold">Fruit Varieties</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-green-600 mb-1">24/7</div>
              <div className="text-sm text-gray-600 font-semibold">Fresh Delivery</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-3 border-green-600 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-green-600 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section with Cards */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: '100% Organic', desc: 'All our fruits are organically grown without harmful pesticides or chemicals.', color: 'from-green-400 to-emerald-500' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Same-day delivery available. Get your fresh fruits within hours of ordering.', color: 'from-blue-400 to-cyan-500' },
              { icon: Shield, title: 'Quality Guarantee', desc: 'Not satisfied? We offer a 100% money-back guarantee on all purchases.', color: 'from-purple-400 to-pink-500' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-green-200 transform hover:-translate-y-3"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                
                {/* Hover effect decoration */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-green-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-6 px-5 py-2.5 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 rounded-full text-sm font-bold">
              <Star className="h-4 w-4 fill-current" />
              <span>Customer Favorites</span>
              <Star className="h-4 w-4 fill-current" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked selections of our finest fruits, loved by thousands of customers
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <ProductCard product={product} onViewDetails={() => {}} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <button className="group px-10 py-5 border-3 border-green-600 text-green-600 font-bold rounded-2xl hover:bg-green-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl text-lg transform hover:scale-105">
              <span className="flex items-center space-x-2">
                <span>View All Products</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.08),transparent_70%)]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-10 space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className="h-12 w-12 fill-current text-yellow-300 animate-pulse" 
                style={{ animationDelay: `${i * 0.2}s`, animationDuration: '2s' }} 
              />
            ))}
          </div>
          
          <blockquote className="text-3xl md:text-4xl font-bold mb-10 leading-relaxed italic">
            "The best quality fruits I've ever ordered online. Fresh, delicious, and delivered on time every single time!"
          </blockquote>
          
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-3xl">👩</span>
            </div>
            <div className="text-left">
              <p className="font-bold text-xl">Sarah Johnson</p>
              <p className="text-green-100 flex items-center space-x-2">
                <span>Regular Customer</span>
                <span className="inline-block w-1.5 h-1.5 bg-green-200 rounded-full" />
                <span>50+ Orders</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}