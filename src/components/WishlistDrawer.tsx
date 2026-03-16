import { X, Trash2 } from 'lucide-react';
import { useWishlistContext } from '../context/WishlistContext';
import { useWishlist } from '../hooks/useWishlist';
import { getAffiliateUrl } from '../lib/utils';

export function WishlistDrawer() {
  const { isWishlistOpen, setIsWishlistOpen } = useWishlistContext();
  const { wishlist, removeFromWishlist } = useWishlist();

  if (!isWishlistOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-stone-100">
          <h2 className="font-playfair text-xl font-semibold text-stone-800">Your Wishlist</h2>
          <button 
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p className="text-stone-500">Your wishlist is empty.</p>
              <button 
                onClick={() => setIsWishlistOpen(false)}
                className="text-rose-500 font-medium hover:text-rose-600"
              >
                Browse designs
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {wishlist.map((item) => (
                <li key={item.id} className="flex gap-4 p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-white border border-stone-200">
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="h-full w-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-stone-800 line-clamp-2 pr-2">
                        {item.title}
                      </h3>
                      <button 
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-stone-400 hover:text-rose-500 transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2">
                      <a 
                        href={getAffiliateUrl(item.affilate_url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 px-3 py-1.5 rounded-md transition-colors"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {wishlist.length > 0 && (
          <div className="p-4 border-t border-stone-100 bg-stone-50">
            <p className="text-xs text-stone-500 text-center mb-3">
              Items in your wishlist are saved to this browser.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
