import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCartStore, useUserStore, useUIStore } from '../../store';
import { ShoppingBag, User, Menu, Search, Phone, Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { cartItems } = useCartStore();
    const { user, logout } = useUserStore();
    const { openCart } = useUIStore();
    const location = useLocation();

    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Transparent header on homeostasis for Home page
    const isHome = location.pathname === '/';
    const transparent = isHome && !scrolled;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close overlays when location changes (e.g., hitting the back button)
    useEffect(() => {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
    }, [location.pathname, location.search]);

    const navAnimation = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100, damping: 20, duration: 0.8 }
        }
    };

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    // Manage search overlay history state for back button handling
    useEffect(() => {
        const handlePopState = () => {
            if (isSearchOpen) {
                setIsSearchOpen(false);
                setSearchQuery('');
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [isSearchOpen]);

    const openSearch = () => {
        window.history.pushState({ searchModal: true }, '');
        setIsSearchOpen(true);
    };

    const closeSearch = () => {
        if (window.history.state?.searchModal) {
            window.history.back();
        } else {
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            closeSearch();
            navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleTrendingSearch = (term) => {
        setSearchQuery(term);
        closeSearch();
        navigate(`/shop?search=${encodeURIComponent(term)}`);
    };

    const trendingSearches = ['Diamond Rings', 'Gold Chains', 'Pearl Earrings', 'Engagement Rings', 'Tennis Bracelets'];

    const navigate = useNavigate(); // ADD THIS -> NEED TO IMPORT IT

    return (
        <>
            <motion.nav
                initial="hidden"
                animate="visible"
                variants={navAnimation}
                className={`fixed top-0 left-0 w-full z-40 flex items-center justify-between transition-all duration-700 ease-in-out
                    ${scrolled
                        ? 'py-4 px-6 md:px-12 bg-white/90 backdrop-blur-md text-brand-black shadow-sm border-b border-gray-100/50'
                        : `py-6 px-6 md:px-12 bg-transparent ${isHome ? 'text-brand-white' : 'text-brand-black'}`
                    }`}
            >
                {/* Left - Menu & Search */}
                <div className="flex-1 flex items-center gap-6">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                        <Menu strokeWidth={1} size={24} />
                        <span className="hidden md:block text-xs uppercase tracking-[0.2em] font-light">Menu</span>
                    </button>
                    <button onClick={openSearch} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                        <Search strokeWidth={1} size={22} />
                        <span className="hidden md:block text-xs uppercase tracking-[0.2em] font-light">Search</span>
                    </button>
                </div>

                {/* Center - Logo */}
                <div className="flex-1 flex justify-center gap-12 items-center">
                    <Link
                        to="/"
                        className={`font-serif tracking-widest transition-all duration-700 ${scrolled ? 'text-2xl md:text-3xl' : 'text-3xl md:text-3xl'}`}
                    >
                        LUXE GEMS
                    </Link>
                </div>

                {/* Right - Call, Wishlist, Account, Cart */}
                <div className="flex-1 flex items-center justify-end gap-5 md:gap-8">
                    <Link to="/contact" className="hidden lg:flex items-center gap-2 hover:opacity-70 transition-opacity">
                        <Phone strokeWidth={1} size={20} />
                        <span className="text-xs uppercase tracking-[0.2em] font-light">Concierge</span>
                    </Link>

                    <Link to="/wishlist" className="hover:opacity-70 transition-opacity hidden sm:block">
                        <Heart strokeWidth={1} size={22} />
                    </Link>

                    {user ? (
                        <div className="relative flex items-center group cursor-pointer py-2">
                            <User strokeWidth={1} size={22} />
                            <span className="hidden xl:block ml-2 text-xs uppercase tracking-[0.2em] font-light">{user.name.split(' ')[0]}</span>
                            <div className="absolute top-full right-0 pt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                                <div className="bg-brand-surface text-brand-black shadow-xl py-6 px-8 flex flex-col gap-4 min-w-[200px] border border-gray-100">
                                    <Link to="/profile" className="text-xs uppercase tracking-[0.2em] font-light whitespace-nowrap hover:text-brand-gold transition-colors text-left border-b border-transparent hover:border-brand-gold pb-1 inline-block">My Account</Link>
                                    {user.isAdmin && (
                                        <Link to="/admin" className="text-xs uppercase tracking-[0.2em] font-light whitespace-nowrap hover:text-brand-gold transition-colors text-left border-b border-transparent hover:border-brand-gold pb-1 inline-block">Admin Dashboard</Link>
                                    )}
                                    <button onClick={logout} className="text-xs uppercase tracking-[0.2em] font-light whitespace-nowrap hover:text-brand-gold transition-colors text-left border-b border-transparent hover:border-brand-gold pb-1 inline-block mt-2">Sign Out</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="hover:opacity-70 transition-opacity">
                            <User strokeWidth={1} size={22} />
                        </Link>
                    )}

                    <button
                        onClick={openCart}
                        className="relative hover:opacity-70 transition-opacity flex items-center"
                    >
                        <ShoppingBag strokeWidth={1} size={22} />
                        <AnimatePresence>
                            {cartItems.length > 0 && (
                                <motion.span
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className={`absolute -top-1.5 -right-2 rounded-full w-[18px] h-[18px] flex items-center justify-center text-[10px] font-light tracking-wider transition-colors duration-500
                                    ${(isHome && !scrolled) ? 'bg-brand-white text-brand-black' : 'bg-brand-black text-brand-white'}`}
                                >
                                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </motion.nav>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-50 bg-brand-white/95 backdrop-blur-md flex flex-col justify-start px-6 pt-32 pb-12 md:px-12"
                    >
                        <button onClick={closeSearch} className="absolute top-8 right-6 md:right-12 hover:opacity-50 transition-opacity flex items-center gap-2 text-brand-black">
                            <span className="text-xs uppercase tracking-[0.2em] font-light hidden sm:block">Close</span>
                            <X strokeWidth={1} size={32} />
                        </button>

                        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="w-full"
                            >
                                <label className="block text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray mb-4 text-center">What are you looking for?</label>
                                <div className="relative w-full">
                                    <form onSubmit={handleSearch}>
                                        <input
                                            type="text"
                                            placeholder="Search fine jewelry..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-transparent border-b border-gray-300 py-6 text-2xl md:text-5xl font-light text-brand-black focus:outline-none focus:border-brand-black transition-colors placeholder:text-gray-300 text-center"
                                            autoFocus
                                        />
                                        <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 hover:text-brand-gold transition-colors text-brand-black cursor-pointer">
                                            <Search strokeWidth={1} size={32} />
                                        </button>
                                    </form>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="mt-16 text-center"
                            >
                                <h3 className="text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray mb-8">Trending Searches</h3>
                                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                                    {trendingSearches.map((term, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleTrendingSearch(term)}
                                            className="text-sm md:text-base font-light text-brand-black hover:text-brand-gold transition-colors underline-offset-8 hover:underline decoration-1"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Full-screen Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-50 bg-brand-surface text-brand-black flex flex-col px-6 py-8 md:px-12"
                    >
                        {/* Menu Header */}
                        <div className="flex justify-between items-center mb-16">
                            <button onClick={closeMobileMenu} className="hover:opacity-50 transition-opacity flex items-center gap-2">
                                <X strokeWidth={1} size={28} />
                                <span className="text-xs uppercase tracking-[0.2em] font-light">Close</span>
                            </button>
                            <Link to="/" onClick={closeMobileMenu} className="font-serif text-2xl tracking-widest absolute left-1/2 transform -translate-x-1/2">
                                LUXE GEMS
                            </Link>
                        </div>

                        {/* Menu Links */}
                        <div className="flex flex-col gap-8 flex-1 justify-center items-center text-center">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="overflow-hidden">
                                <Link to="/story" onClick={closeMobileMenu} className="text-3xl md:text-5xl font-light uppercase tracking-widest hover:text-brand-gold transition-colors inline-block pb-2">Our Story</Link>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="overflow-hidden">
                                <Link to="/shop?category=Rings" onClick={closeMobileMenu} className="text-3xl md:text-5xl font-light uppercase tracking-widest hover:text-brand-gold transition-colors inline-block pb-2">Rings</Link>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="overflow-hidden">
                                <Link to="/shop?category=Necklaces" onClick={closeMobileMenu} className="text-3xl md:text-5xl font-light uppercase tracking-widest hover:text-brand-gold transition-colors inline-block pb-2">Necklaces</Link>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="overflow-hidden">
                                <Link to="/shop?category=Earrings" onClick={closeMobileMenu} className="text-3xl md:text-5xl font-light uppercase tracking-widest hover:text-brand-gold transition-colors inline-block pb-2">Earrings</Link>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="overflow-hidden">
                                <Link to="/shop?category=Bracelets" onClick={closeMobileMenu} className="text-3xl md:text-5xl font-light uppercase tracking-widest hover:text-brand-gold transition-colors inline-block pb-2">Bracelets</Link>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="overflow-hidden mt-8">
                                <Link to="/shop" onClick={closeMobileMenu} className="text-sm md:text-base font-light uppercase tracking-[0.2em] text-brand-gold border-b border-brand-gold pb-1 hover:text-brand-black hover:border-brand-black transition-colors">Discover All Collections</Link>
                            </motion.div>
                        </div>

                        {/* Menu Footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-col gap-8 mt-auto border-t border-gray-200 pt-8"
                        >
                            <div className="flex justify-center gap-12">
                                {user ? (
                                    <>
                                        <Link to="/profile" onClick={closeMobileMenu} className="text-xs uppercase tracking-[0.2em] font-light hover:text-brand-gold transition-colors">My Profile</Link>
                                        <button onClick={() => { logout(); closeMobileMenu(); }} className="text-xs uppercase tracking-[0.2em] font-light hover:text-brand-gold transition-colors">Sign Out</button>
                                    </>
                                ) : (
                                    <Link to="/login" onClick={closeMobileMenu} className="text-xs uppercase tracking-[0.2em] font-light hover:text-brand-gold transition-colors">Sign In / Register</Link>
                                )}
                            </div>
                            <div className="flex justify-center gap-8 pb-4">
                                <button className="hover:opacity-50 transition-opacity flex items-center justify-center w-10 h-10 rounded-full border border-gray-200"><Search strokeWidth={1} size={18} /></button>
                                <button className="hover:opacity-50 transition-opacity flex items-center justify-center w-10 h-10 rounded-full border border-gray-200"><Heart strokeWidth={1} size={18} /></button>
                                <Link to="/contact" onClick={closeMobileMenu} className="hover:opacity-50 transition-opacity flex items-center justify-center w-10 h-10 rounded-full border border-gray-200"><Phone strokeWidth={1} size={18} /></Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
