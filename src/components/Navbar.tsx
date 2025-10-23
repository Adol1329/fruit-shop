import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart, User, LogOut, LogIn, UserPlus } from 'lucide-react';

export function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-green-600">FreshPick</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/fruits"
                className="border-green-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Fruits
              </Link>
              <Link
                to="/categories"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Categories
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Link
              to="/cart"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500"
            >
              <ShoppingCart className="h-6 w-6" />
            </Link>
            
            {user ? (
              <div className="ml-3 relative">
                <div className="flex items-center space-x-2">
                  <Link
                    to="/profile"
                    className="flex items-center text-sm rounded-full text-gray-700 hover:text-green-600"
                  >
                    <span className="sr-only">Profile</span>
                    <User className="h-6 w-6" />
                    <span className="ml-1">{user.fullName || user.email}</span>
                  </Link>
                  <button
                    onClick={signOut}
                    className="flex items-center text-sm text-gray-500 hover:text-red-600"
                    title="Sign out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
