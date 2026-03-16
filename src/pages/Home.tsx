import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'motion/react';
import { ArrowRight, Heart } from 'lucide-react';

export function Home() {
  const { products, loading } = useProducts();

  // Get 8 random products for bestsellers
  const bestsellers = products.length > 0 
    ? [...products].sort(() => 0.5 - Math.random()).slice(0, 8)
    : [];

  const categories = [
    { name: 'Floral', image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=600&auto=format&fit=crop' },
    { name: 'For Grandmas', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop' },
    { name: 'Pet Moms', image: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=600&auto=format&fit=crop' },
    { name: 'Animals', image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=600&auto=format&fit=crop' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative bg-rose-50/50 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-48 -left-24 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-24 left-48 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-playfair font-bold text-stone-800 mb-6 leading-tight"
            >
              Stitch Your Love <br />
              <span className="text-rose-500 italic">This Mother's Day</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-stone-600 mb-10"
            >
              Discover beautiful, high-quality machine embroidery designs to create heartfelt, personalized gifts for the special women in your life.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link 
                to="/shop" 
                className="inline-flex items-center px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-medium text-lg transition-all shadow-lg shadow-rose-200 hover:shadow-xl hover:-translate-y-1"
              >
                Browse All Designs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-stone-800 mb-4">Shop by Category</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">Find the perfect design for every type of mom.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {categories.map((category, index) => (
              <Link 
                key={category.name} 
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-playfair text-xl md:text-2xl font-medium">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-playfair font-bold text-stone-800 mb-2">Trending Designs</h2>
              <p className="text-stone-500">Our most loved embroidery files right now.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center text-rose-500 font-medium hover:text-rose-600 transition-colors">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {bestsellers.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-10 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center px-6 py-3 bg-white border border-stone-200 hover:border-rose-300 text-stone-700 hover:text-rose-600 rounded-full font-medium transition-all shadow-sm">
              View all designs
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-rose-100/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 text-rose-200 opacity-50">
          <Heart className="w-64 h-64 fill-current" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Heart className="w-12 h-12 mx-auto text-rose-400 mb-8 fill-rose-400/20" />
          <blockquote className="text-2xl md:text-4xl font-playfair italic text-stone-800 leading-relaxed mb-8">
            "A mother's love is the heart of a family. Stitching a gift by hand is weaving that love into something they can hold forever."
          </blockquote>
          <p className="text-stone-500 font-medium uppercase tracking-widest text-sm">Stitch & Love</p>
        </div>
      </section>

      {/* Teasers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-stone-50 rounded-3xl p-10 flex flex-col justify-center items-start border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider rounded-full mb-6">Inspiration</span>
              <h3 className="text-3xl font-playfair font-bold text-stone-800 mb-4">Project Ideas</h3>
              <p className="text-stone-600 mb-8 leading-relaxed">
                Not sure what to make? Browse our gallery of beautiful finished projects, from embroidered tote bags to custom denim jackets.
              </p>
              <Link to="/ideas" className="inline-flex items-center text-stone-800 font-medium hover:text-amber-600 transition-colors group">
                <span className="border-b-2 border-amber-200 group-hover:border-amber-600 pb-1">Get Inspired</span>
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="bg-teal-50/50 rounded-3xl p-10 flex flex-col justify-center items-start border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
              <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider rounded-full mb-6">Learn</span>
              <h3 className="text-3xl font-playfair font-bold text-stone-800 mb-4">Embroidery Tips</h3>
              <p className="text-stone-600 mb-8 leading-relaxed">
                Master your machine with our expert articles. Learn about stabilizers, thread choices, and techniques for perfect stitch-outs.
              </p>
              <Link to="/articles" className="inline-flex items-center text-stone-800 font-medium hover:text-teal-600 transition-colors group">
                <span className="border-b-2 border-teal-200 group-hover:border-teal-600 pb-1">Read Articles</span>
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
