import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="px-8 py-6 flex items-center justify-between sticky top-0 z-30 bg-cream/80 backdrop-blur-md border-b border-gray-200/50">
      <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-gray-900">
        Studio<span className="text-sage italic">Lumina</span>
      </Link>
      
      <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-600 items-center">
        <Link to="/" className="hover:text-sage transition-colors">Home</Link>
        <Link to="/collection" className="hover:text-sage transition-colors">Collection</Link>
        <Link to="/journal" className="hover:text-sage transition-colors">Journal</Link>
        
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 text-gray-800 hover:text-sage transition-colors"
        >
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-sage rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
