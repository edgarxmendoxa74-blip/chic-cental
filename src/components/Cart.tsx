import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalPrice,
  onContinueShopping,
  onCheckout
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
          <div className="text-7xl mb-4">🐔</div>
          <h2 className="text-3xl font-bold text-chick-dark mb-2">Your cart is empty</h2>
          <p className="text-chick-brown mb-8">Add some delicious items to get started!</p>
          <button
            onClick={onContinueShopping}
            className="bg-cart-gradient text-white px-8 py-4 rounded-xl hover:shadow-cart-green transition-all duration-200 font-bold text-lg transform hover:scale-105"
          >
            🍗 Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onContinueShopping}
          className="flex items-center space-x-2 text-chick-dark hover:text-chick-orange transition-colors duration-200 font-semibold"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Continue Shopping</span>
        </button>
        <h1 className="text-3xl font-bold text-cart-green">🛒 Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-chick-red hover:text-chick-orange transition-colors duration-200 font-semibold"
        >
          Clear All
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border-2 border-chick-beige">
        {cartItems.map((item, index) => {
          return (
            <div key={item.id} className={`p-6 ${index !== cartItems.length - 1 ? 'border-b-2 border-chick-beige' : ''}`}>
              <div className="flex items-start space-x-4">
                {/* Variation Image */}
                {item.selectedVariation?.image && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img 
                      src={item.selectedVariation.image} 
                      alt={item.selectedVariation.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-chick-dark mb-1">{item.name}</h3>
                  {item.selectedVariations && item.selectedVariations.length > 0 ? (
                    <p className="text-sm text-chick-brown mb-1">Flavors: {item.selectedVariations.map(v => v.name).join(' + ')}</p>
                  ) : item.selectedVariation ? (
                    <p className="text-sm text-chick-brown mb-1">Flavor: {item.selectedVariation.name}</p>
                  ) : null}
                  {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                    <p className="text-sm text-chick-brown mb-1">
                      ➕ Add-ons: {item.selectedAddOns.map(addOn => 
                        addOn.quantity && addOn.quantity > 1 
                          ? `${addOn.name} x${addOn.quantity}`
                          : addOn.name
                      ).join(', ')}
                    </p>
                  )}
                  <p className="text-lg font-bold text-chick-golden">₱{item.totalPrice} each</p>
                  
                  <div className="flex items-center space-x-3 mt-3">
                    <div className="flex items-center space-x-3 bg-chick-beige rounded-xl p-1 border-2 border-chick-golden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-chick-golden rounded-lg transition-colors duration-200"
                      >
                        <Minus className="h-4 w-4 text-chick-dark" />
                      </button>
                      <span className="font-bold text-chick-dark min-w-[32px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-chick-golden rounded-lg transition-colors duration-200"
                      >
                        <Plus className="h-4 w-4 text-chick-dark" />
                      </button>
                    </div>
                    
                    <div className="text-right flex-1">
                      <p className="text-lg font-bold text-chick-orange">₱{item.totalPrice * item.quantity}</p>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-chick-red hover:text-white hover:bg-chick-red rounded-full transition-all duration-200"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-chick-warm-gradient rounded-2xl shadow-lg p-8 border-2 border-chick-golden">
        <div className="flex items-center justify-between text-3xl font-bold mb-6">
          <span className="text-chick-dark">Total:</span>
          <span className="text-chick-orange">₱{(getTotalPrice() || 0).toFixed(2)}</span>
        </div>
        
        <button
          onClick={onCheckout}
          className="w-full bg-cart-gradient text-white py-5 rounded-xl hover:shadow-cart-green transition-all duration-200 transform hover:scale-[1.02] font-bold text-xl shadow-lg"
        >
          🚀 Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;