import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import ChatSidebar from './components/ChatSidebar';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Journal from './pages/Journal';
import JournalArticle from './pages/JournalArticle';
import Checkout from './pages/Checkout';

function App() {
  const [products, setProducts] = useState([]);
  const [highlightedProductId, setHighlightedProductId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products
    axios.get('/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load products:", err);
        setLoading(false);
      });
  }, []);

  const handleHighlightProduct = (productId) => {
    setHighlightedProductId(productId);
    
    // Auto-remove highlight after some time
    setTimeout(() => {
      setHighlightedProductId(null);
    }, 8000);
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen relative font-sans">
          {/* Background Decor */}
          <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-rose/20 blur-[120px] pointer-events-none -z-10" />
          <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-sage/20 blur-[150px] pointer-events-none -z-10" />
          
          <Navbar />
          
          <Routes>
            <Route path="/" element={
              <Home 
                products={products} 
                loading={loading} 
                highlightedProductId={highlightedProductId} 
              />
            } />
            <Route path="/collection" element={
              <Collection 
                products={products} 
                loading={loading} 
                highlightedProductId={highlightedProductId} 
              />
            } />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:id" element={<JournalArticle />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>

          {/* Persistent Floating UI */}
          <CartSidebar />
          <ChatSidebar onHighlightProduct={handleHighlightProduct} />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
