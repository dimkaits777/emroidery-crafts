import { Heart } from 'lucide-react';
import { Product } from '../types';
import { useWishlist } from '../hooks/useWishlist';
import { getAffiliateUrl, cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isSaved = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-stone-100">
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img
          src={product.image_url}
          alt={product.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-stone-400 hover:text-rose-500 transition-all shadow-sm z-10"
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={cn("h-5 w-5 transition-colors", isSaved && "fill-rose-500 text-rose-500")} 
          />
        </button>
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-stone-600 rounded-md shadow-sm">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-medium text-stone-800 text-sm md:text-base line-clamp-2 mb-4 flex-1 group-hover:text-rose-600 transition-colors">
          {product.title}
        </h3>
        
        <a
          href={getAffiliateUrl(product.affilate_url)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white text-sm font-semibold rounded-xl transition-colors text-center border border-rose-100 hover:border-rose-500"
        >
          CLICK HERE AND DOWNLOAD
        </a>
      </div>
    </div>
  );
}
