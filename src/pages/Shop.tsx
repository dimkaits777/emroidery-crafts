import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'motion/react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';

const ITEMS_PER_PAGE = 24;

export function Shop() {
  const { products, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get('category'));
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Update selected category if URL changes
  useEffect(() => {
    const category = searchParams.get('category');
    if (category !== selectedCategory) {
      setSelectedCategory(category);
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Extract unique categories and counts
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(query));
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'newest':
      default:
        // Since we don't have a date, we'll just reverse the array to simulate "newest first"
        // or keep original order. Let's just use ID for consistent sorting.
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
    setIsMobileFiltersOpen(false);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-playfair text-rose-600 mb-2">Oops! Something went wrong.</h2>
          <p className="text-stone-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-playfair font-bold text-stone-800 mb-2">All Designs</h1>
          <p className="text-stone-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'design' : 'designs'} available
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search designs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="flex gap-4">
            <button 
              className="md:hidden flex items-center justify-center px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-medium text-stone-700 w-full sm:w-auto"
              onClick={() => setIsMobileFiltersOpen(true)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto appearance-none pl-4 pr-10 py-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all text-sm font-medium text-stone-700 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters (Desktop) */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
            <h3 className="font-playfair font-bold text-lg text-stone-800 mb-6">Categories</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleCategoryClick(null)}
                  className={`flex items-center justify-between w-full text-left text-sm transition-colors ${
                    selectedCategory === null ? 'text-rose-600 font-semibold' : 'text-stone-600 hover:text-rose-500'
                  }`}
                >
                  <span>All Designs</span>
                  <span className="bg-stone-100 text-stone-500 py-0.5 px-2 rounded-full text-xs">
                    {products.length}
                  </span>
                </button>
              </li>
              {categories.map((category) => (
                <li key={category.name}>
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    className={`flex items-center justify-between w-full text-left text-sm transition-colors ${
                      selectedCategory === category.name ? 'text-rose-600 font-semibold' : 'text-stone-600 hover:text-rose-500'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`py-0.5 px-2 rounded-full text-xs ${
                      selectedCategory === category.name ? 'bg-rose-100 text-rose-600' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Filters Modal */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileFiltersOpen(false)} />
            <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-xl flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-stone-100">
                <h2 className="font-playfair font-bold text-lg text-stone-800">Filters</h2>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 text-stone-400 hover:text-stone-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex-1">
                <h3 className="font-medium text-stone-800 mb-4">Categories</h3>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => handleCategoryClick(null)}
                      className={`flex items-center justify-between w-full text-left text-sm transition-colors ${
                        selectedCategory === null ? 'text-rose-600 font-semibold' : 'text-stone-600'
                      }`}
                    >
                      <span>All Designs</span>
                      <span className="bg-stone-100 text-stone-500 py-0.5 px-2 rounded-full text-xs">{products.length}</span>
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li key={category.name}>
                      <button
                        onClick={() => handleCategoryClick(category.name)}
                        className={`flex items-center justify-between w-full text-left text-sm transition-colors ${
                          selectedCategory === category.name ? 'text-rose-600 font-semibold' : 'text-stone-600'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className={`py-0.5 px-2 rounded-full text-xs ${
                          selectedCategory === category.name ? 'bg-rose-100 text-rose-600' : 'bg-stone-100 text-stone-500'
                        }`}>
                          {category.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-stone-100">
              <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-stone-400" />
              </div>
              <h3 className="text-xl font-playfair font-bold text-stone-800 mb-2">No designs found</h3>
              <p className="text-stone-500 mb-6">We couldn't find any designs matching your current filters.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryClick(null);
                }}
                className="px-6 py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl font-medium transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-stone-200 text-stone-500 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    
                    <div className="flex items-center gap-1 mx-2">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        // Logic to show pages around current page
                        let pageNum = i + 1;
                        if (totalPages > 5) {
                          if (currentPage > 3) {
                            pageNum = currentPage - 2 + i;
                          }
                          if (pageNum > totalPages) {
                            pageNum = totalPages - 4 + i;
                          }
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                              currentPage === pageNum 
                                ? 'bg-rose-500 text-white shadow-sm' 
                                : 'text-stone-600 hover:bg-stone-100'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-stone-200 text-stone-500 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
