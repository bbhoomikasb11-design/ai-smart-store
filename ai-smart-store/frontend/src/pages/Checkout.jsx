import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/checkout', {
        cart,
        shipping: { email: formData.email, address: formData.address },
        payment: { method: 'credit_card' }
      });
      setSuccess(true);
      setOrderId(res.data.orderId);
      clearCart();
    } catch (err) {
      console.error(err);
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="px-8 py-32 max-w-2xl mx-auto text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-sage rounded-full flex items-center justify-center mx-auto mb-6 text-white"
        >
          <CheckCircle2 size={40} />
        </motion.div>
        <h1 className="text-4xl font-serif mb-4">Order Confirmed</h1>
        <p className="text-gray-500 mb-8">Thank you for your purchase. Your order number is <strong>{orderId}</strong>.</p>
        <button 
          onClick={() => navigate('/')}
          className="pill-button-primary"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="px-8 py-32 text-center">
        <h2 className="text-2xl font-serif mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/collection')} className="text-sage hover:underline">
          Browse Collection
        </button>
      </div>
    );
  }

  return (
    <div className="px-8 pt-12 pb-32 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
      
      {/* Checkout Form */}
      <div>
        <h1 className="text-3xl font-serif mb-8">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <section>
            <h2 className="text-lg font-medium mb-4">Contact Information</h2>
            <input required type="email" name="email" onChange={handleChange} placeholder="Email address" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-sage focus:outline-none transition-shadow" />
          </section>

          <section>
            <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input required type="text" name="firstName" onChange={handleChange} placeholder="First name" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-sage focus:outline-none" />
              <input required type="text" name="lastName" onChange={handleChange} placeholder="Last name" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-sage focus:outline-none" />
            </div>
            <input required type="text" name="address" onChange={handleChange} placeholder="Address" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-sage focus:outline-none" />
            <div className="grid grid-cols-2 gap-4">
              <input required type="text" name="city" onChange={handleChange} placeholder="City" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-sage focus:outline-none" />
              <input required type="text" name="zip" onChange={handleChange} placeholder="ZIP code" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-sage focus:outline-none" />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-4 flex items-center">
              Payment details <Lock size={16} className="ml-2 text-gray-400" />
            </h2>
            <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <input required type="text" name="cardNumber" onChange={handleChange} placeholder="Card number" className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-sage focus:outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" name="expiry" onChange={handleChange} placeholder="MM / YY" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sage focus:outline-none" />
                <input required type="text" name="cvc" onChange={handleChange} placeholder="CVC" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sage focus:outline-none" />
              </div>
            </div>
          </section>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full pill-button-primary py-4 text-lg flex justify-center items-center"
          >
            {loading ? <span className="animate-pulse">Processing...</span> : <>Pay ${(cartTotal + 15).toFixed(2)} <ArrowRight size={20} className="ml-2" /></>}
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 self-start sticky top-32">
        <h2 className="text-2xl font-serif mb-6">Order Summary</h2>
        <div className="space-y-4 mb-6">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-medium">{item.name}</h4>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 pt-4 space-y-3 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>$15.00</span>
          </div>
          <div className="flex justify-between font-medium text-lg pt-3 border-t border-gray-200">
            <span>Total</span>
            <span>${(cartTotal + 15).toFixed(2)}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
