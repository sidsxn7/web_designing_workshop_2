import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, updateQty, removeFromCart } = useContext(CartContext);

  // Mathematical Totals Calculations
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalActualPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalSlashedPrice = cart.reduce((acc, item) => acc + (item.slashedPrice * item.quantity), 0);
  const totalSavings = totalSlashedPrice - totalActualPrice;

  if (cart.length === 0) {
    return (
      <div className="text-center py-24 px-4">
        <ShoppingBag className="w-16 h-16 mx-auto text-zinc-600 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
        <p className="text-zinc-400 mb-6 text-sm">Explore our wide range of electronics items today.</p>
        <Link to="/" className="bg-croma-green text-black font-semibold px-6 py-2.5 rounded-md text-sm hover:opacity-90 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
      {/* Left Pane: Cart Items List */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-xl font-bold tracking-wide">MY CART ({totalItems} Items)</h2>
        
        {cart.map((item) => (
          <div key={item.id} className="bg-croma-card border border-zinc-800 rounded-xl p-4 flex gap-4 items-center">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-contain bg-zinc-900 p-2 rounded" />
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base line-clamp-1">{item.name}</h3>
              <p className="text-xs text-croma-text-muted mb-2">{item.brand}</p>
              
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-white">To: ₹{item.price.toLocaleString('en-IN')}</span>
                <span className="text-xs line-through text-zinc-500">₹{item.slashedPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Quantity Adjustments & Delete buttons */}
            <div className="flex flex-col items-end gap-4">
              <button onClick={() => removeFromCart(item.id)} className="text-zinc-500 hover:text-red-500 transition cursor-pointer">
                <Trash2 className="w-5 h-5" />
              </button>
              
              <div className="flex items-center bg-zinc-900 rounded border border-zinc-800">
                <button onClick={() => updateQty(item.id, -1)} className="p-1.5 hover:text-croma-green transition cursor-pointer">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                <button onClick={() => updateQty(item.id, 1)} className="p-1.5 hover:text-croma-green transition cursor-pointer">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Pane: Price Breakdown Summary */}
      <div className="bg-croma-card border border-zinc-800 rounded-xl p-5 h-fit space-y-4">
        <h3 className="text-lg font-bold border-b border-zinc-800 pb-2">PRICE DETAILS</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-zinc-400">
            <span>Price ({totalItems} items)</span>
            <span>₹{totalSlashedPrice.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-croma-green">
            <span>Discount</span>
            <span>- ₹{totalSavings.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Delivery Charges</span>
            <span className="text-croma-green font-medium">FREE</span>
          </div>
          
          <hr className="border-zinc-800 my-2" />
          
          <div className="flex justify-between text-base font-bold">
            <span>Total Amount</span>
            <span className="text-croma-green">₹{totalActualPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Dynamic Savings Alert Box */}
        <div className="bg-emerald-950/40 border border-emerald-900 text-emerald-400 text-xs py-2 px-3 rounded-md text-center font-medium">
          You will save ₹{totalSavings.toLocaleString('en-IN')} on this order! 🎉
        </div>

        <button className="w-full bg-croma-green text-black font-bold py-3 rounded-lg hover:opacity-90 transition mt-2 cursor-pointer text-sm tracking-wide">
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}