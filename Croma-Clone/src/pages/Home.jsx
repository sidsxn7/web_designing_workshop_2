import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { electronicsData } from '../data/electronicsData';
import { CartContext } from '../context/CartContext';

export default function Home() {
  const { addToCart, searchQuery } = useContext(CartContext);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', ...new Set(electronicsData.map(p => p.category))];

  // Double Filter Logic: Matches the chosen category AND screens the search string simultaneously
  const filteredProducts = electronicsData.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Category Selection Filter Bar */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition cursor-pointer shrink-0 ${
              activeCategory === cat ? 'bg-croma-green text-black' : 'bg-zinc-900 text-white hover:bg-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Marketplace Section */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-zinc-500 font-medium tracking-wide">
          No products match your search criteria. Try another item keyword!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-croma-card border border-zinc-800 rounded-xl p-4 flex flex-col justify-between hover:border-zinc-700 transition group">
              <Link to={`/product/${product.id}`}>
                <div className="overflow-hidden rounded-md bg-zinc-900/50 p-2 mb-4">
                  <img src={product.image} alt={product.name} className="w-full h-44 object-contain group-hover:scale-105 transition duration-300" />
                </div>
                <h3 className="font-semibold text-sm line-clamp-2 h-10">{product.name}</h3>
                <p className="text-xs text-croma-text-muted mt-1 mb-2">{product.brand} · ★ {product.rating}</p>
              </Link>
              
              <div className="mt-2">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-bold text-white">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.slashedPrice > product.price && (
                    <span className="text-xs line-through text-zinc-500">₹{product.slashedPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Link to={`/product/${product.id}`} className="text-center bg-zinc-800 text-white text-xs py-2 rounded font-medium hover:bg-zinc-700 transition">
                    Details
                  </Link>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-croma-green text-black font-bold text-xs py-2 rounded hover:opacity-90 transition cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}