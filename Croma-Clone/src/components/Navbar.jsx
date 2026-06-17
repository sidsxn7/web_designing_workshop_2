import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, Search } from 'lucide-react';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-black text-white sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-zinc-800">
      <Link to="/" className="text-2xl font-bold tracking-wider text-white">
        croma<span className="text-croma-green">.</span>
      </Link>
      
      <div className="hidden md:flex flex-1 mx-12 relative max-w-xl">
        <input 
          type="text" 
          placeholder="What electronics are you looking for today?" 
          className="w-full bg-zinc-900 text-sm px-4 py-2.5 rounded-md focus:outline-none border border-transparent focus:border-zinc-700 pr-10 text-white"
        />
        <Search className="absolute right-3 top-2.5 w-5 h-5 text-zinc-400" />
      </div>

      <Link to="/cart" className="relative flex items-center gap-2 hover:text-croma-green transition">
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-croma-green text-black font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Link>
    </nav>
  );
}