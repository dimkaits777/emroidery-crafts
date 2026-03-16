import { Link } from 'react-router-dom';
import { Heart, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { useWishlistContext } from '../context/WishlistContext';
import { useWishlist } from '../hooks/useWishlist';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsWishlistOpen } = useWishlistContext();
  const { wishlist } = useWishlist();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Ideas', path: '/ideas' },
    { name: 'Articles', path: '/articles' },
    { name: 'Equipment', path: '/equipment' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-playfair text-2xl font-bold text-rose-900">
              Stitch & Love
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-stone-600 hover:text-rose-600 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/shop" className="text-stone-600 hover:text-rose-600 transition-colors">
              <Search className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="text-stone-600 hover:text-rose-600 transition-colors relative"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </button>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center ml-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-stone-600 hover:text-rose-600 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-rose-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-rose-600 hover:bg-rose-50"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
