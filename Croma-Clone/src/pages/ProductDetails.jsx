import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { electronicsData } from '../data/electronicsData';
import { CartContext } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const product = electronicsData.find(p => p.id === id);

  if (!product) return <div className="text-center mt-12">Product not found.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
      <div>
        <img src={product.image} alt={product.name} className="w-full max-h-96 object-contain rounded-xl bg-zinc-900 p-6" />
      </div>
      <div>
        <span className="text-xs text-croma-green bg-zinc-900 px-2.5 py-1 rounded font-semibold uppercase">{product.brand}</span>
        <h1 className="text-3xl font-bold mt-3 mb-2">{product.name}</h1>
        <p className="text-sm text-zinc-400 mb-4">Rating: {product.rating} ⭐ ({product.reviewsCount} Reviews)</p>
        <hr className="border-zinc-800 my-4" />
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-3xl font-bold text-white">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="text-sm line-through text-zinc-500">₹{product.slashedPrice.toLocaleString('en-IN')}</span>
        </div>
        <button onClick={() => addToCart(product)} className="w-full bg-croma-green text-black font-bold py-3.5 rounded-lg hover:opacity-90 transition cursor-pointer">
          Add to Cart
        </button>

        {/* Specs Table Layout */}
        <div className="mt-8">
          <h3 className="text-lg font-bold border-b border-zinc-800 pb-2 mb-4">Key Specifications</h3>
          <div className="grid grid-cols-1 gap-y-2 text-sm">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-zinc-900">
                <span className="text-croma-text-muted">{key}</span>
                <span className="font-medium text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}