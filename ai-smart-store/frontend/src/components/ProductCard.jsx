import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, isHighlighted }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isHighlighted ? 1.05 : 1,
        boxShadow: isHighlighted ? "0 20px 40px rgba(178, 172, 136, 0.4)" : "0 4px 20px rgba(0,0,0,0.03)"
      }}
      transition={{ duration: 0.4, type: 'spring', bounce: 0.4 }}
      className={`glass-card flex flex-col h-full relative ${isHighlighted ? 'ring-4 ring-sage border-transparent' : ''}`}
    >
      {isHighlighted && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 bg-sage text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md"
        >
          AI Pick
        </motion.div>
      )}
      
      <div className="relative pt-[100%] overflow-hidden bg-gray-100">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs text-rose font-semibold tracking-wider uppercase mb-2">
          {product.category}
        </div>
        <h3 className="text-xl mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-xl font-medium font-serif">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product)}
            className="p-2 rounded-full bg-cream text-gray-700 hover:bg-sage hover:text-white transition-colors duration-200"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
