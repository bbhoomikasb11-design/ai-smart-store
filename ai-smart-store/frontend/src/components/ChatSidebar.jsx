import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, X, MessageSquare } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export default function ChatSidebar({ onHighlightProduct }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', content: "Hi there! I'm your design assistant. Looking for something specific to elevate your space?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', {
        history: messages,
        message: userMsg
      });

      const { reply, action } = response.data;
      
      setMessages(prev => [...prev, { role: 'model', content: reply }]);
      
      if (action && action.type === 'highlight') {
        onHighlightProduct(action.payload);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', content: "I'm having a little trouble connecting right now. Let's try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 p-4 bg-sage text-white rounded-full shadow-xl z-50 flex items-center justify-center hover:bg-[#a19b78] transition-colors"
          >
            <Sparkles size={24} className="mr-2" />
            <span className="font-medium pr-2">Ask AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            />
            
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white/90 backdrop-blur-xl shadow-[-10px_0_30px_rgba(0,0,0,0.05)] z-50 flex flex-col border-l border-white/50"
            >
              {/* Header */}
              <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-white/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-sage">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-semibold m-0 leading-tight">Studio Assistant</h2>
                    <span className="text-xs text-sage font-medium flex items-center">
                      <span className="w-2 h-2 rounded-full bg-sage mr-1 inline-block animate-pulse"></span>
                      Online
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {messages.map((msg, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed prose prose-sm ${
                        msg.role === 'user' 
                          ? 'bg-sage text-white rounded-br-sm shadow-md' 
                          : 'bg-cream text-gray-800 rounded-bl-sm border border-white shadow-sm'
                      }`}
                    >
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-cream border border-white shadow-sm rounded-2xl rounded-bl-sm px-5 py-4 flex space-x-1">
                      <div className="w-2 h-2 bg-sage/60 rounded-full typing-dot"></div>
                      <div className="w-2 h-2 bg-sage/60 rounded-full typing-dot"></div>
                      <div className="w-2 h-2 bg-sage/60 rounded-full typing-dot"></div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white/80 border-t border-gray-100 backdrop-blur-md">
                <form onSubmit={handleSend} className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about materials, sizing..."
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-full pl-5 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage/50 transition-shadow shadow-inner"
                  />
                  <button 
                    type="submit" 
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 p-2 bg-sage text-white rounded-full hover:bg-[#a19b78] disabled:opacity-50 disabled:hover:bg-sage transition-all shadow-sm"
                  >
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
