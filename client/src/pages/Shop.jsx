import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/ui/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, Check } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const FILTER_CATEGORIES = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches'];
const FILTER_MATERIALS = ['18k Yellow Gold', 'White Gold', 'Rose Gold', 'Platinum'];
const FILTER_GEMSTONES = ['Diamond', 'Sapphire', 'Ruby', 'Emerald', 'Pearl'];

const Shop = () => {
    const { products, isLoading, fetchProducts } = useProductStore();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const urlCategory = searchParams.get('category');

    const [sort, setSort] = useState('newest');
    const activeCategory = urlCategory || 'All';

    const [localSearch, setLocalSearch] = useState(searchQuery);

    // Advanced Filters State
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [selectedGemstones, setSelectedGemstones] = useState([]);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    useEffect(() => {
        setLocalSearch(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        // Fetch all products on mount. Filtering is now done entirely on the frontend.
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
        const params = new URLSearchParams(searchParams);
        if (cat === 'All') {
            params.delete('category');
        } else {
            params.set('category', cat);
        }
        setSearchParams(params);
    };

    const toggleFilter = (list, setList, item) => {
        setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    };

    const displayedProducts = useMemo(() => {
        return products
            .filter(p => activeCategory === 'All' ? true : p?.category?.toLowerCase() === activeCategory.toLowerCase())
            .filter(p => {
                if (selectedMaterials.length === 0) return true;
                if (!p?.material) return false;
                return selectedMaterials.some(m => m.toLowerCase() === p.material.trim().toLowerCase());
            })
            .filter(p => {
                if (selectedGemstones.length === 0) return true;
                if (!p?.gemstone) return false;
                return selectedGemstones.some(g => g.toLowerCase() === p.gemstone.trim().toLowerCase());
            })
            .filter(p => {
                if (!searchQuery) return true;
                const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.trim() !== '');
                return searchTerms.some(term => {
                    const singularTerm = term.endsWith('s') && !term.endsWith('ss') ? term.slice(0, -1) : term;
                    return p?.name?.toLowerCase().includes(singularTerm) ||
                        p?.description?.toLowerCase().includes(singularTerm) ||
                        p?.category?.toLowerCase().includes(singularTerm);
                });
            })
            .sort((a, b) => {
                if (sort === 'price-asc') return a.price - b.price;
                if (sort === 'price-desc') return b.price - a.price;
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
    }, [products, activeCategory, searchQuery, sort, selectedMaterials, selectedGemstones]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-32 pb-24 px-6 md:px-12 bg-brand-white min-h-screen"
        >
            <div className="max-w-[1400px] mx-auto">
                <header className="mb-12 md:mb-16 text-center">
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

                <div className="flex flex-col lg:flex-row gap-12 items-start mt-8">

                    {/* Mobile Filters Toggle */}
                    <button
                        onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                        className="lg:hidden w-full flex justify-between items-center py-4 border-b border-gray-200 text-xs uppercase tracking-widest text-brand-black"
                    >
                        <span>Refine By</span>
                        {isMobileFiltersOpen ? <ChevronUp size={16} strokeWidth={1} /> : <ChevronDown size={16} strokeWidth={1} />}
                    </button>

                    {/* Sidebar / Filters */}
                    <aside className={`w-full lg:w-64 shrink-0 lg:sticky lg:top-32 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:scrollbar-hide ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
                        {/* Search */}
                        <div className="mb-12 relative">
                            <form onSubmit={handleLocalSearchSubmit} className="w-full">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={localSearch}
                                    onChange={(e) => setLocalSearch(e.target.value)}
                                    className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm font-light text-brand-black focus:outline-none focus:border-brand-black transition-colors placeholder:text-gray-400 pr-8"
                                />
                                <button type="submit" className="absolute right-0 top-0 hover:text-brand-gold transition-colors text-brand-black cursor-pointer z-10">
                                    <Search strokeWidth={1} size={16} />
                                </button>
                            </form>
                        </div>

                        {/* Category */}
                        <div className="mb-10">
                            <h3 className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-light text-brand-black mb-6">Category</h3>
                            <ul className="flex flex-col gap-4">
                                {FILTER_CATEGORIES.map(cat => (
                                    <li key={cat}>
                                        <button
                                            onClick={() => handleCategoryClick(cat)}
                                            className={`text-sm font-light transition-colors ${activeCategory === cat ? 'text-brand-black tracking-wide' : 'text-brand-dark-gray hover:text-brand-black'}`}
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Material Filter */}
                        <div className="mb-10">
                            <h3 className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-light text-brand-black mb-6">Material</h3>
                            <ul className="flex flex-col gap-4">
                                {FILTER_MATERIALS.map(mat => (
                                    <li key={mat}>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={selectedMaterials.includes(mat)}
                                                onChange={() => toggleFilter(selectedMaterials, setSelectedMaterials, mat)}
                                            />
                                            <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedMaterials.includes(mat) ? 'bg-brand-black border-brand-black' : 'border-gray-300 group-hover:border-brand-black bg-transparent'}`}>
                                                {selectedMaterials.includes(mat) && <Check size={10} color="white" strokeWidth={3} />}
                                            </div>
                                            <span className={`text-sm font-light transition-colors ${selectedMaterials.includes(mat) ? 'text-brand-black' : 'text-brand-dark-gray group-hover:text-brand-black'}`}>
                                                {mat}
                                            </span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Gemstone Filter */}
                        <div className="mb-10">
                            <h3 className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-light text-brand-black mb-6">Gemstone</h3>
                            <ul className="flex flex-col gap-4">
                                {FILTER_GEMSTONES.map(gem => (
                                    <li key={gem}>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={selectedGemstones.includes(gem)}
                                                onChange={() => toggleFilter(selectedGemstones, setSelectedGemstones, gem)}
                                            />
                                            <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedGemstones.includes(gem) ? 'bg-brand-black border-brand-black' : 'border-gray-300 group-hover:border-brand-black bg-transparent'}`}>
                                                {selectedGemstones.includes(gem) && <Check size={10} color="white" strokeWidth={3} />}
                                            </div>
                                            <span className={`text-sm font-light transition-colors ${selectedGemstones.includes(gem) ? 'text-brand-black' : 'text-brand-dark-gray group-hover:text-brand-black'}`}>
                                                {gem}
                                            </span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Main Content (Products Grid) */}
                    <div className="flex-1 w-full">

                        <div className="flex justify-end items-center mb-8 pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-4 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray whitespace-nowrap">
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

                        {isLoading ? (
                            <div className="h-[40vh] flex items-center justify-center">
                                <span className="text-brand-dark-gray tracking-widest text-xs uppercase animate-pulse">Curating Collection...</span>
                            </div>
                        ) : displayedProducts.length === 0 ? (
                            <div className="h-[40vh] flex flex-col items-center justify-center text-center">
                                <p className="text-brand-dark-gray tracking-widest text-xs uppercase mb-4">
                                    No pieces found matching your refined criteria.
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchParams(new URLSearchParams());
                                        setSelectedMaterials([]);
                                        setSelectedGemstones([]);
                                        setLocalSearch('');
                                    }}
                                    className="text-brand-black uppercase text-[10px] tracking-[0.2em] border-b border-brand-black pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        ) : (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
                            >
                                {displayedProducts.map((p) => (
                                    <ProductCard key={p._id} product={p} />
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Shop;
