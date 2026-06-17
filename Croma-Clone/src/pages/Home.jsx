import { useState } from 'react';
import { Link } from 'react-router-dom';
import { electronicsData } from '../data/electronicsData';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Laptops', 'Mobiles'];

  const filteredProducts = activeCategory === 'All' 
    ? electronicsData 
    : electronicsData.filter(p => p.category === activeCategory);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Dynamic Category Selector */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
              activeCategory === cat ? 'bg-croma-green text-black' : 'bg-zinc-900 text-white hover:bg-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-croma-card border border-zinc-800 rounded-xl p-4 flex flex-col justify-between hover:border-zinc-700 transition">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className="w-full h-48 object-contain mb-4 rounded" />
              <h3 className="font-semibold text-base line-clamp-2">{product.name}</h3>
              <p className="text-xs text-croma-text-muted mt-1">{product.brand}</p>
            </Link>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="text-xs line-through text-zinc-500">₹{product.slashedPrice.toLocaleString('en-IN')}</span>
              </div>
              <Link to={`/product/${product.id}`} className="mt-3 block w-full text-center bg-zinc-800 text-white text-xs py-2 rounded font-medium hover:bg-croma-green hover:text-black transition">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}