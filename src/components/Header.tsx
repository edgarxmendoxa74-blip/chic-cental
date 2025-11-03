import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick }) => {
  const { siteSettings, loading } = useSiteSettings();

  return (
    <header className="sticky top-0 z-50 bg-chick-gradient backdrop-blur-md border-b border-chick-golden shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={onMenuClick}
            className="flex items-center space-x-3 text-white hover:text-chick-cream transition-colors duration-200"
          >
            {loading ? (
              <div className="w-12 h-12 bg-white/20 rounded-full animate-pulse" />
            ) : (
              <img 
                src={siteSettings?.site_logo || "/logo.jpg"} 
                alt="Chick Central"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = "/logo.jpg";
                }}
              />
            )}
            <h1 className="text-2xl font-bold tracking-tight drop-shadow-md">
              {loading ? (
                <div className="w-32 h-7 bg-white/20 rounded animate-pulse" />
              ) : (
                siteSettings?.site_name || "Chick Central 🍗"
              )}
            </h1>
          </button>

          <div className="flex items-center space-x-2">
            <button 
              onClick={onCartClick}
              className="relative px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 font-medium"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              {cartItemsCount > 0 && (
                <span className="bg-white text-green-600 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-bounce-gentle ring-2 ring-green-400 shadow-md ml-1">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;