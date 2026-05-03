import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

export default function Collection({ products, loading, highlightedProductId }) {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="px-8 pt-12 pb-32 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-serif mb-4">Our Collection</h1>
        <p className="text-gray-500">Carefully selected items to bring intention to your space.</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === cat 
                ? 'bg-sage text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-cream border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage"></div>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isHighlighted={highlightedProductId === product.id}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
