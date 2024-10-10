import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, User } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold text-gray-800">Personal Shopping Assistant</Link>
          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-gray-600 hover:text-gray-800">
              <ShoppingBag className="w-6 h-6" />
            </Link>
            <Link to="/wishlist" className="text-gray-600 hover:text-gray-800">
              <Heart className="w-6 h-6" />
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-gray-800">
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;