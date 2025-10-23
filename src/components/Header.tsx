import { ShoppingCart, User, LogOut, LayoutDashboard, Apple } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();

  const handleSignOut = async () => {
    try {
      await signOut();
      onNavigate('landing');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Apple className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">FreshPick</span>
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('landing')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'landing'
                  ? 'text-green-600'
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('products')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'products'
                  ? 'text-green-600'
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Products
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.isAdmin && (
                  <button
                    onClick={() => onNavigate('admin-dashboard')}
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span className="hidden sm:inline">Admin</span>
                  </button>
                )}
                <button
                  onClick={() => onNavigate('cart')}
                  className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => onNavigate('profile')}
                  className="p-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  <User className="h-6 w-6" />
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
