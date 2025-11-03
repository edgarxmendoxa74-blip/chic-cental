import React from 'react';
import { MenuItem, CartItem } from '../types';
import { useCategories } from '../hooks/useCategories';
import MenuItemCard from './MenuItemCard';
import MobileNav from './MobileNav';

// Preload images for better performance
const preloadImages = (items: MenuItem[]) => {
  items.forEach(item => {
    if (item.image) {
      const img = new Image();
      img.src = item.image;
    }
  });
};

interface MenuProps {
  menuItems: MenuItem[];
  addToCart: (item: MenuItem, quantity?: number, variation?: any, addOns?: any[]) => void;
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
}

const Menu: React.FC<MenuProps> = ({ menuItems, addToCart, cartItems, updateQuantity }) => {
  const { categories } = useCategories();
  const [activeCategory, setActiveCategory] = React.useState('hot-coffee');

  // Preload images when menu items change
  React.useEffect(() => {
    if (menuItems.length > 0) {
      // Preload images for visible category first
      const visibleItems = menuItems.filter(item => item.category === activeCategory);
      preloadImages(visibleItems);
      
      // Then preload other images after a short delay
      setTimeout(() => {
        const otherItems = menuItems.filter(item => item.category !== activeCategory);
        preloadImages(otherItems);
      }, 1000);
    }
  }, [menuItems, activeCategory]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      const headerHeight = 64; // Header height
      const mobileNavHeight = 60; // Mobile nav height
      const offset = headerHeight + mobileNavHeight + 20; // Extra padding
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  React.useEffect(() => {
    if (categories.length > 0) {
      // Set default to dim-sum if it exists, otherwise first category
      const defaultCategory = categories.find(cat => cat.id === 'dim-sum') || categories[0];
      if (!categories.find(cat => cat.id === activeCategory)) {
        setActiveCategory(defaultCategory.id);
      }
    }
  }, [categories, activeCategory]);

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map(cat => document.getElementById(cat.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveCategory(categories[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      <MobileNav 
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Banner Section */}
      <div className="text-center mb-12 bg-chick-gradient rounded-2xl shadow-2xl py-8 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
          🍗 Chick Central
        </h2>
        <p className="text-xl md:text-2xl text-white font-semibold drop-shadow-md mb-4">
          Flavored wings that hits different! 🔥
        </p>
        
        {/* Location and Hours */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-white">
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-xl">📍</span>
            <span className="font-medium">Taguig, Manila, Philippines</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-xl">🕐</span>
            <span className="font-medium">Open: 7:00 AM - 12:00 AM</span>
          </div>
        </div>
        
        {/* Flavors Poster */}
        <div className="mt-6 flex justify-center">
          <img 
            src="/images/posters/chick-central-flavors.jpg" 
            alt="Chick Central Flavors - 8 Delicious Varieties"
            className="max-w-full h-auto rounded-xl shadow-2xl border-4 border-white"
            style={{ maxHeight: '600px' }}
          />
        </div>
      </div>

      {/* How to Order Section */}
      <div className="mb-12 bg-white rounded-2xl shadow-xl p-8 border-2 border-chick-golden">
        <h3 className="text-3xl font-bold text-chick-dark text-center mb-8">
          📱 How to Order
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-chick-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">🍗</span>
            </div>
            <div className="bg-chick-orange text-white text-sm font-bold rounded-full px-4 py-1 inline-block mb-3">
              STEP 1
            </div>
            <h4 className="font-bold text-chick-dark mb-2">Browse Menu</h4>
            <p className="text-sm text-gray-600">
              Scroll through our delicious menu items and choose your favorites
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-chick-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">🛒</span>
            </div>
            <div className="bg-chick-orange text-white text-sm font-bold rounded-full px-4 py-1 inline-block mb-3">
              STEP 2
            </div>
            <h4 className="font-bold text-chick-dark mb-2">Add to Cart</h4>
            <p className="text-sm text-gray-600">
              Select your flavor, add-ons, and quantity, then click "Add to Cart"
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-chick-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">📝</span>
            </div>
            <div className="bg-chick-orange text-white text-sm font-bold rounded-full px-4 py-1 inline-block mb-3">
              STEP 3
            </div>
            <h4 className="font-bold text-chick-dark mb-2">Fill Details</h4>
            <p className="text-sm text-gray-600">
              Choose Dine-in, Pickup, or Delivery and enter your information
            </p>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-cart-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">✅</span>
            </div>
            <div className="bg-green-600 text-white text-sm font-bold rounded-full px-4 py-1 inline-block mb-3">
              STEP 4
            </div>
            <h4 className="font-bold text-chick-dark mb-2">Place Order</h4>
            <p className="text-sm text-gray-600">
              Review your order and send it via Messenger to complete!
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t-2 border-chick-beige">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2 bg-chick-beige px-4 py-2 rounded-full">
              <span>🪑</span>
              <span className="font-semibold">Dine-in Available</span>
            </div>
            <div className="flex items-center space-x-2 bg-chick-beige px-4 py-2 rounded-full">
              <span>🥡</span>
              <span className="font-semibold">Quick Pickup</span>
            </div>
            <div className="flex items-center space-x-2 bg-chick-beige px-4 py-2 rounded-full">
              <span>🛵</span>
              <span className="font-semibold">Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-2 bg-chick-beige px-4 py-2 rounded-full">
              <span>💳</span>
              <span className="font-semibold">GCash Payment</span>
            </div>
          </div>
        </div>
      </div>

      {categories.map((category) => {
        const categoryItems = menuItems.filter(item => item.category === category.id);
        
        if (categoryItems.length === 0) return null;
        
        return (
          <section key={category.id} id={category.id} className="mb-16">
            {/* Hide category headers on mobile since they're in the sticky nav */}
            <div className="hidden md:flex items-center mb-8">
              <span className="text-3xl mr-3">{category.icon}</span>
              <h3 className="text-3xl font-noto font-medium text-black">{category.name}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryItems.map((item) => {
                const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
                return (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onAddToCart={addToCart}
                    quantity={cartItem?.quantity || 0}
                    onUpdateQuantity={updateQuantity}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
      </main>
    </>
  );
};

export default Menu;