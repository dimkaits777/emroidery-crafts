import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { articles } from './Articles';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';

export function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const article = articles.find(a => a.id === id);
  const { products, loading } = useProducts();

  // Get 3 random products for "Related Designs"
  const relatedProducts = products.length > 0 
    ? [...products].sort(() => 0.5 - Math.random()).slice(0, 3)
    : [];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-playfair text-rose-600 mb-4">Article not found</h2>
          <Link to="/articles" className="text-stone-600 hover:text-rose-600 underline">Back to articles</Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <Link to="/articles" className="inline-flex items-center text-stone-500 hover:text-teal-600 transition-colors mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all articles
      </Link>

      <article className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100">
        <div className="aspect-[21/9] overflow-hidden relative">
          <img 
            src={article.image_url} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-8 md:p-12 lg:p-16">
          <div className="text-sm text-teal-600 font-medium mb-4 uppercase tracking-wider">{article.date}</div>
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-stone-800 mb-8 leading-tight">
            {article.title}
          </h1>
          
          <div className="prose prose-stone prose-lg max-w-none font-outfit text-stone-600 leading-relaxed">
            <p className="text-xl text-stone-700 font-medium mb-8">
              {article.excerpt}
            </p>
            {article.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="mb-6">{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      {/* Related Products */}
      <div className="mt-20">
        <h2 className="text-3xl font-playfair font-bold text-stone-800 mb-8 text-center">Designs You Might Like</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
