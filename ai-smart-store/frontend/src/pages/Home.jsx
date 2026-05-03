import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

export default function Home({ products, loading, highlightedProductId }) {
  return (
    <>
      {/* Hero Section */}
      <section className="px-8 pt-16 pb-12 max-w-7xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-serif mb-6 leading-tight"
        >
          Curated aesthetics<br/>for your sanctuary.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-500 max-w-2xl mx-auto text-lg"
        >
          Discover mindful design objects that elevate your everyday rituals. 
          Not sure where to start? Try chatting with our Studio Assistant.
        </motion.p>
      </section>

      {/* Product Grid */}
      <main className="px-8 pb-32 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage"></div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {products.slice(0, 6).map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isHighlighted={highlightedProductId === product.id}
              />
            ))}
          </motion.div>
        )}
      </main>
    </>
  );
}
