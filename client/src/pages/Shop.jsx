import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/ui/ProductCard';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const Shop = () => {
    const { products, isLoading, fetchProducts } = useProductStore();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const urlCategory = searchParams.get('category');

    const [sort, setSort] = useState('newest');
    const activeCategory = urlCategory || 'All';

    const [localSearch, setLocalSearch] = useState(searchQuery);

    useEffect(() => {
        setLocalSearch(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleLocalSearchSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        if (localSearch.trim()) {
            params.set('search', localSearch.trim());
        } else {
            params.delete('search');
        }
        setSearchParams(params);
    };

    const handleCategoryClick = (cat) => {
        // Remove search param if they switch categories manually, or clear categories from URL
        if (cat === 'All') {
            const params = new URLSearchParams(searchParams);
            params.delete('category');
            setSearchParams(params);
        } else {
            const params = new URLSearchParams(searchParams);
            params.set('category', cat);
            setSearchParams(params);
        }
    };

    const displayedProducts = products
        .filter(p => activeCategory === 'All' ? true : p.category === activeCategory)
        .filter(p => {
            if (!searchQuery) return true;
            return p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase());
        })
        .sort((a, b) => {
            if (sort === 'price-asc') return a.price - b.price;
            if (sort === 'price-desc') return b.price - a.price;
            return 0; // newest etc.
        });

    const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches'];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-32 pb-24 px-6 md:px-12 bg-brand-white min-h-screen"
        >
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 md:mb-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-black mb-6 tracking-wide"
                    >
                        {searchQuery ? `Search Results for "${searchQuery}"` : 'The Collection'}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-brand-dark-gray text-sm md:text-base tracking-widest uppercase font-light max-w-2xl mx-auto"
                    >
                        Discover masterpieces of timeless elegance
                    </motion.p>
                </header>

                {/* Inline Search Bar */}
                <div className="max-w-md mx-auto mb-12">
                    <form onSubmit={handleLocalSearchSubmit} className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search our collection..."
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                            className="w-full bg-transparent border-b border-gray-300 py-3 text-sm md:text-base font-light text-brand-black focus:outline-none focus:border-brand-black transition-colors placeholder:text-gray-400 text-center"
                        />
                        <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 hover:text-brand-gold transition-colors text-brand-black">
                            <Search strokeWidth={1} size={20} />
                        </button>
                    </form>
                </div>

                {/* Filters & Sorting */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 pb-6 border-b border-gray-200 gap-8">

                    {/* Category Tabs */}
                    <div className="flex gap-6 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-hide">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryClick(cat)}
                                className={`text-[10px] sm:text-xs uppercase tracking-[0.2em] font-light whitespace-nowrap transition-colors duration-300 ${activeCategory === cat
                                    ? 'text-brand-black border-b border-brand-black pb-1'
                                    : 'text-brand-dark-gray hover:text-brand-black pb-1'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-4 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray whitespace-nowrap shrink-0">
                        <span>Sort By</span>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="bg-transparent border-b border-gray-300 pb-1 text-brand-black focus:outline-none focus:border-brand-black cursor-pointer appearance-none pr-4 mix-blend-multiply"
                        >
                            <option value="newest">Newest Arrivals</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Product Grid */}
                {isLoading ? (
                    <div className="h-[40vh] flex items-center justify-center">
                        <span className="text-brand-dark-gray tracking-widest text-xs uppercase animate-pulse">Curating Collection...</span>
                    </div>
                ) : displayedProducts.length === 0 ? (
                    <div className="h-[40vh] flex flex-col items-center justify-center text-center">
                        <p className="text-brand-dark-gray tracking-widest text-xs uppercase mb-4">
                            {searchQuery ? `No pieces found matching "${searchQuery}".` : 'No pieces found in this category.'}
                        </p>
                        <button
                            onClick={() => {
                                setSearchParams(new URLSearchParams()); // Clear all params to reset view
                            }}
                            className="text-brand-black uppercase text-[10px] tracking-[0.2em] border-b border-brand-black pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors"
                        >
                            View All Collections
                        </button>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
                    >
                        {displayedProducts.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default Shop;
