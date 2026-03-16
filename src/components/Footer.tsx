import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-stone-200 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="font-playfair text-2xl font-bold text-rose-900 mb-4 block">
              Stitch & Love
            </Link>
            <p className="text-stone-500 text-sm mb-4">
              Beautiful machine embroidery designs to stitch your love into every project.
              Perfect for Mother's Day and beyond.
            </p>
          </div>
          
          <div>
            <h3 className="font-playfair font-semibold text-stone-900 mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-stone-600">
              <li><Link to="/shop" className="hover:text-rose-600 transition-colors">All Designs</Link></li>
              <li><Link to="/ideas" className="hover:text-rose-600 transition-colors">Project Ideas</Link></li>
              <li><Link to="/articles" className="hover:text-rose-600 transition-colors">Embroidery Tips</Link></li>
              <li><Link to="/equipment" className="hover:text-rose-600 transition-colors">Recommended Gear</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-playfair font-semibold text-stone-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-stone-600">
              <li><a href="#" className="hover:text-rose-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-rose-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-rose-600 transition-colors">Affiliate Disclosure</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-playfair font-semibold text-stone-900 mb-4">Stay Inspired</h3>
            <p className="text-stone-500 text-sm mb-4">
              Join our newsletter for new designs and stitching tips.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-3 py-2 bg-white border border-stone-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-rose-500 w-full text-sm"
              />
              <button 
                type="submit"
                className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-r-md transition-colors text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-stone-400 text-sm flex items-center">
            Made with <Heart className="h-3 w-3 mx-1 text-rose-400" /> for embroidery lovers.
          </p>
          <p className="text-stone-400 text-xs mt-4 md:mt-0 text-center md:text-right max-w-md">
            Disclosure: We are a participant in the Creative Fabrica Affiliate Program. 
            We may earn a small commission if you click on our links and make a purchase, at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
