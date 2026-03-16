import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { DEFAULT_AFFILIATE_URL } from '../lib/utils';

const equipment = [
  {
    id: '1',
    title: 'Brother PE800 Embroidery Machine',
    description: 'A fantastic, user-friendly machine for beginners and intermediate crafters. Features a 5"x7" embroidery field and a color LCD touch screen.',
    image_url: 'https://images.unsplash.com/photo-1611077544837-77567793d93b?q=80&w=800&auto=format&fit=crop',
    affilate_url: DEFAULT_AFFILIATE_URL,
    category: 'Machines'
  },
  {
    id: '2',
    title: 'Tear-Away Stabilizer Roll',
    description: 'Medium weight tear-away stabilizer, perfect for stable fabrics like denim, canvas, and woven cotton. Tears cleanly around your design.',
    image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    affilate_url: DEFAULT_AFFILIATE_URL,
    category: 'Stabilizers'
  },
  {
    id: '3',
    title: 'Cut-Away Stabilizer Roll',
    description: 'Essential for stretchy fabrics like t-shirts and knits. Provides permanent support to prevent your designs from puckering or distorting over time.',
    image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    affilate_url: DEFAULT_AFFILIATE_URL,
    category: 'Stabilizers'
  },
  {
    id: '4',
    title: 'Polyester Embroidery Thread Set (40 Colors)',
    description: 'Vibrant, strong, and colorfast polyester threads. This starter set includes 40 beautiful colors to bring any design to life.',
    image_url: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=800&auto=format&fit=crop',
    affilate_url: DEFAULT_AFFILIATE_URL,
    category: 'Threads'
  },
  {
    id: '5',
    title: 'Pre-wound Bobbins (Size A)',
    description: 'Save time and frustration with these high-quality, pre-wound bobbins. Ensures consistent tension for perfect stitch-outs.',
    image_url: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=800&auto=format&fit=crop',
    affilate_url: DEFAULT_AFFILIATE_URL,
    category: 'Threads'
  },
  {
    id: '6',
    title: 'Embroidery Scissors (Curved)',
    description: 'Small, sharp scissors with curved blades, perfect for snipping jump threads close to the fabric without accidentally cutting your project.',
    image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    affilate_url: DEFAULT_AFFILIATE_URL,
    category: 'Tools'
  }
];

export function Equipment() {
  const categories = Array.from(new Set(equipment.map(item => item.category)));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-stone-800 mb-6">Recommended Gear</h1>
        <p className="text-lg text-stone-600">
          The right tools make all the difference. Here are our top picks for machines, stabilizers, threads, and accessories to help you create flawless embroidery.
        </p>
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-16 last:mb-0">
          <h2 className="text-3xl font-playfair font-bold text-stone-800 mb-8 pb-4 border-b border-stone-200">
            {category}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipment.filter(item => item.category === category).map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl transition-all duration-500 flex flex-col"
              >
                <div className="aspect-square overflow-hidden bg-stone-50 p-8">
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover rounded-2xl shadow-sm"
                  />
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-playfair font-bold text-stone-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-stone-600 mb-8 flex-1 leading-relaxed text-sm">
                    {item.description}
                  </p>
                  <a 
                    href={item.affilate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full py-3 px-4 bg-stone-800 hover:bg-stone-900 text-white font-medium rounded-xl transition-colors mt-auto"
                  >
                    View Product
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
