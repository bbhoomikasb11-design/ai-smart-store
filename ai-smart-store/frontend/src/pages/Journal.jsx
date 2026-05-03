import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Journal() {
  const posts = [
    {
      id: "1",
      title: "The Art of Slow Living",
      date: "October 12, 2026",
      excerpt: "Embracing a slower pace in a fast-moving world. How our environments shape our daily rituals and peace of mind.",
      imageUrl: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "2",
      title: "Designing with Intention",
      date: "September 28, 2026",
      excerpt: "Why fewer, better things make a profound difference in the way we experience our homes.",
      imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "3",
      title: "Material Focus: Linen",
      date: "September 15, 2026",
      excerpt: "Exploring the timeless appeal, durability, and breathability of our favorite natural fiber.",
      imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="px-8 pt-12 pb-32 max-w-5xl mx-auto">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-serif mb-4">The Journal</h1>
        <p className="text-gray-500">Thoughts on design, living well, and finding balance.</p>
      </div>

      <div className="space-y-16">
        {posts.map((post, i) => (
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            key={post.id} 
            className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}
          >
            <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg">
              <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="w-full md:w-1/2">
              <div className="text-sm text-sage font-medium tracking-widest uppercase mb-3">{post.date}</div>
              <h2 className="text-3xl font-serif mb-4">{post.title}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>
              <Link 
                to={`/journal/${post.id}`}
                className="text-gray-800 font-medium pb-1 border-b border-gray-300 hover:border-sage hover:text-sage transition-colors"
              >
                Read Article
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
