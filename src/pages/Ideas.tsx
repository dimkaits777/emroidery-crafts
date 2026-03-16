import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ideas = [
  {
    id: '1',
    title: 'Custom Denim Jackets',
    description: 'Transform an ordinary denim jacket into a personalized masterpiece with floral or bold quote designs on the back panel.',
    image_url: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=800&auto=format&fit=crop',
    category: 'Floral'
  },
  {
    id: '2',
    title: 'Personalized Tote Bags',
    description: 'Eco-friendly and stylish. Add a "Plant Mom" or "Dog Mom" design to a sturdy canvas tote for everyday use.',
    image_url: 'https://images.unsplash.com/photo-1597484662317-9bd7baa42909?q=80&w=800&auto=format&fit=crop',
    category: 'Pet Moms'
  },
  {
    id: '3',
    title: 'Kitchen Towels',
    description: 'Brighten up the kitchen with cute, funny, or floral embroidered tea towels. A perfect quick gift for grandmas.',
    image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    category: 'For Grandmas'
  },
  {
    id: '4',
    title: 'Cozy Sweatshirts',
    description: 'Embroider "Mama" or a minimalist line art design on the left chest of a soft, oversized crewneck sweatshirt.',
    image_url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop',
    category: 'Modern & Abstract'
  },
  {
    id: '5',
    title: 'Nursery Wall Art',
    description: 'Stitch out sweet animal designs or "New Mom" quotes, frame them in embroidery hoops, and hang them in the nursery.',
    image_url: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=800&auto=format&fit=crop',
    category: 'Animals'
  },
  {
    id: '6',
    title: 'Throw Pillows',
    description: 'Add a touch of elegance to the living room with large, intricate floral designs embroidered on linen or velvet pillow covers.',
    image_url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop',
    category: 'Floral'
  }
];

export function Ideas() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-stone-800 mb-6">Project Inspiration</h1>
        <p className="text-lg text-stone-600">
          Discover beautiful ways to use our embroidery designs. From wearable art to home decor, find the perfect project for your next creation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ideas.map((idea, index) => (
          <motion.div 
            key={idea.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl transition-all duration-500 flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src={idea.image_url} 
                alt={idea.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-stone-800 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                  {idea.category}
                </span>
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-2xl font-playfair font-bold text-stone-800 mb-3 group-hover:text-amber-600 transition-colors">
                {idea.title}
              </h3>
              <p className="text-stone-600 mb-6 flex-1 leading-relaxed">
                {idea.description}
              </p>
              <Link 
                to={`/shop?category=${encodeURIComponent(idea.category)}`}
                className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors mt-auto"
              >
                Shop {idea.category} Designs
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
