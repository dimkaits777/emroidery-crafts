import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const articles = [
  {
    id: '1',
    title: '10 Essential Tips for Machine Embroidery Beginners',
    excerpt: 'Starting your embroidery journey? Learn the basics of hooping, choosing the right needles, and avoiding common mistakes.',
    content: 'Machine embroidery can seem daunting at first, but with the right preparation, anyone can create beautiful designs. First, always ensure your fabric is hooped tightly—it should sound like a drum when tapped. Second, choose the right needle for your fabric type. A ballpoint needle is great for knits, while a sharp needle works best for wovens. Third, don\'t skimp on stabilizer. The rule of thumb is: if you wear it, don\'t tear it (use cut-away). If you don\'t wear it, tear it (use tear-away). Finally, always do a test stitch-out on scrap fabric before embroidering on your final project.',
    image_url: 'https://images.unsplash.com/photo-1611077544837-77567793d93b?q=80&w=800&auto=format&fit=crop',
    date: 'April 12, 2024'
  },
  {
    id: '2',
    title: 'The Ultimate Guide to Choosing Stabilizers',
    excerpt: 'Tear-away, cut-away, wash-away? Demystify the world of embroidery stabilizers and ensure perfect stitch-outs every time.',
    content: 'Choosing the right stabilizer is crucial for a successful embroidery project. Cut-away stabilizer provides permanent support and is essential for stretchy fabrics like t-shirts and sweatshirts. Tear-away stabilizer is temporary and great for stable, woven fabrics like towels or denim. Wash-away stabilizer dissolves in water and is perfect for freestanding lace (FSL) or when you don\'t want any stabilizer visible on the back, like on sheer fabrics. Always match your stabilizer to your fabric weight and the stitch density of your design.',
    image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    date: 'March 28, 2024'
  },
  {
    id: '3',
    title: 'Best Threads for Vibrant, Lasting Designs',
    excerpt: 'Not all threads are created equal. Discover the differences between polyester, rayon, and cotton threads for your machine.',
    content: 'The thread you choose affects the look, feel, and durability of your embroidery. Polyester thread is the most popular choice because it\'s strong, colorfast, and resists bleaching—perfect for items that will be washed frequently, like baby clothes or towels. Rayon thread offers a beautiful, high-gloss sheen and is very soft, making it ideal for delicate garments, but it\'s less durable than polyester. Cotton thread provides a matte, traditional look, great for quilting or vintage-style designs. Always use a specialized embroidery bobbin thread (usually 60wt or 90wt) to keep your stitches balanced.',
    image_url: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=800&auto=format&fit=crop',
    date: 'March 15, 2024'
  }
];

export function Articles() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-stone-800 mb-6">Embroidery Tips & Guides</h1>
        <p className="text-lg text-stone-600">
          Master your machine, learn new techniques, and get the best results with our expert advice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <motion.article 
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl transition-all duration-500 flex flex-col"
          >
            <Link to={`/articles/${article.id}`} className="relative aspect-[16/10] overflow-hidden block">
              <img 
                src={article.image_url} 
                alt={article.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </Link>
            
            <div className="p-8 flex flex-col flex-1">
              <div className="text-sm text-teal-600 font-medium mb-3">{article.date}</div>
              <h3 className="text-2xl font-playfair font-bold text-stone-800 mb-4 group-hover:text-teal-600 transition-colors line-clamp-2">
                <Link to={`/articles/${article.id}`}>{article.title}</Link>
              </h3>
              <p className="text-stone-600 mb-6 flex-1 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
              <Link 
                to={`/articles/${article.id}`}
                className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 transition-colors mt-auto"
              >
                Read Article
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
