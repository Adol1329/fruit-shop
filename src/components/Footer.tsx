import { Apple, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Apple className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold text-white">FreshPick</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted source for fresh, organic fruits delivered straight to your door.
              Quality you can taste, freshness you can trust.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Our Products</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Delivery Info</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>123 Fresh Street, Fruit District</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-green-500" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-green-500" />
                <span>hello@freshpick.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} FreshPick. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
