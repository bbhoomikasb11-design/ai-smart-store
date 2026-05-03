import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const articles = {
  "1": {
    title: "The Art of Slow Living",
    date: "October 12, 2026",
    category: "LIFESTYLE",
    imageUrl: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?auto=format&fit=crop&q=80&w=1200",
    content: `
      <p>In a world that seems to spin faster every day, the concept of "Slow Living" has moved from a niche lifestyle choice to a vital necessity for mental well-being. It is not about doing everything at a snail's pace; rather, it's about doing things at the right speed—the <em>tempo giusto</em>.</p>
      
      <h2>Finding Your Rhythm</h2>
      <p>Slow living is an invitation to inhabit our lives more fully. It’s about being present in the moment, whether you’re brewing your morning coffee or walking through a park. When we slow down, we create space for reflection and connection that simply doesn't exist when we are constantly rushing.</p>
      
      <blockquote>
        "The great benefit of slowing down is the ability to see the beauty in the ordinary."
      </blockquote>

      <h2>Intentional Environments</h2>
      <p>Our physical surroundings play a massive role in our ability to slow down. A cluttered, chaotic home often leads to a cluttered, chaotic mind. By curating our spaces with intention—choosing items that serve a purpose and bring joy—we create a sanctuary that supports our slow living goals.</p>
      
      <p>Consider the textures in your home. The smoothness of a hand-thrown ceramic mug, the weight of a linen throw, the gentle curve of a glass vase. These sensory details ground us in the present moment, acting as micro-meditations throughout the day.</p>

      <h2>Practical Steps to Slow Down</h2>
      <ul>
        <li><strong>Single-tasking:</strong> Give your full attention to one thing at a time.</li>
        <li><strong>Digital Detox:</strong> Set boundaries for screen time, especially in the morning and before bed.</li>
        <li><strong>Morning Rituals:</strong> Create a slow start to your day that doesn't involve checking emails immediately.</li>
        <li><strong>Mindful Consumption:</strong> Buy less, but buy better. Look for quality and soul in the objects you bring into your life.</li>
      </ul>
    `
  },
  "2": {
    title: "Designing with Intention",
    date: "September 28, 2026",
    category: "DESIGN",
    imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200",
    content: `
      <p>Intentional design is the opposite of accidental decoration. It is the conscious process of selecting every element of a space based on how it will be used, how it will feel, and the atmosphere it will create.</p>
      
      <h2>Form Follows Feeling</h2>
      <p>We often hear the phrase "form follows function," but in the home, form should also follow feeling. How do you want to feel when you walk into your living room? Calm? Inspired? Safe? Your design choices should be the answer to that question.</p>
      
      <p>Soft lighting, natural materials like wood and stone, and a muted color palette can transform a sterile room into a warm embrace. It’s about the soul of the space, not just its appearance in a magazine.</p>

      <h2>The Power of Curation</h2>
      <p>Curation is the act of choosing what stays and what goes. It requires a level of ruthlessness but results in a space that feels coherent and peaceful. Every object in your home should either have a clear function or a deep emotional connection.</p>
      
      <p>When we design with intention, we move away from trends and towards timelessness. We look for pieces that will age gracefully, gaining character over the years rather than looking dated in a few months.</p>
    `
  },
  "3": {
    title: "Material Focus: Linen",
    date: "September 15, 2026",
    category: "MATERIALS",
    imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1200",
    content: `
      <p>Linen is one of the oldest textiles in the world, and for good reason. Derived from the flax plant, it is a material that embodies the perfect balance of luxury and practicality.</p>
      
      <h2>Why We Love Linen</h2>
      <p>There is a unique beauty in the natural wrinkles and slubs of linen. It doesn't try to be perfect, and that’s exactly why it’s so appealing in a modern home. It feels lived-in, honest, and sophisticated all at once.</p>
      
      <p>Beyond its looks, linen is incredibly durable. It’s a textile that actually gets softer and more beautiful with every wash. It’s breathable, moisture-wicking, and temperature-regulating, making it the ideal material for both bedding and apparel.</p>

      <h2>Sustainable by Nature</h2>
      <p>Flax is a resilient plant that requires far less water and fewer pesticides than cotton. Every part of the plant can be used, leaving virtually no waste. Choosing linen is a small but meaningful step towards a more sustainable lifestyle.</p>
      
      <p>At Studio Lumina, we prioritize natural fibers like linen because they connect us back to the earth. They remind us of the slow, organic processes that create true quality.</p>
    `
  }
};

export default function JournalArticle() {
  const { id } = useParams();
  const article = articles[id];

  if (!article) {
    return (
      <div className="px-8 py-32 text-center">
        <h2 className="text-2xl font-serif">Article not found</h2>
        <Link to="/journal" className="text-sage hover:underline mt-4 inline-block">Back to Journal</Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-cream min-h-screen pb-32"
    >
      <div className="max-w-4xl mx-auto px-8 pt-12">
        <Link to="/journal" className="flex items-center text-gray-500 hover:text-sage transition-colors mb-12 group">
          <ArrowLeft size={18} className="mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Journal
        </Link>
        
        <header className="mb-16">
          <div className="text-sm text-sage font-bold tracking-widest uppercase mb-4">{article.category} — {article.date}</div>
          <h1 className="text-5xl md:text-6xl font-serif leading-tight mb-8">{article.title}</h1>
          <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
          </div>
        </header>

        <div 
          className="prose prose-lg prose-serif max-w-none text-gray-800 leading-relaxed
            prose-headings:font-serif prose-blockquote:border-sage prose-blockquote:text-sage 
            prose-strong:text-gray-900 prose-em:text-sage"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </motion.div>
  );
}
