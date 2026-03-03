import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore, useUserStore, useUIStore } from '../../store';
import { ShoppingBag, User, Menu, Search, Phone, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { cartItems } = useCartStore();
    const { user, logout } = useUserStore();
    const { openCart } = useUIStore();
    const location = useLocation();

    const [scrolled, setScrolled] = useState(false);

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

    const navAnimation = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100, damping: 20, duration: 0.8 }
        }
    };

    return (
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={navAnimation}
            className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between transition-all duration-700 ease-in-out
                ${scrolled ? 'py-4 px-6 md:px-12 bg-white/95 backdrop-blur-md text-brand-black shadow-sm'
                    : 'py-6 px-6 md:px-12 bg-transparent text-brand-white'}`}
        >
            {/* Left - Menu & Search */}
            <div className="flex-1 flex items-center gap-6">
                <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                    <Menu strokeWidth={1.5} size={24} />
                    <span className="hidden md:block text-sm uppercase tracking-widest">Menu</span>
                </button>
                <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                    <Search strokeWidth={1.5} size={22} />
                    <span className="hidden md:block text-sm uppercase tracking-widest">Search</span>
                </button>
            </div>

            {/* Center - Logo */}
            <div className="flex-1 flex justify-center">
                <Link
                    to="/"
                    className={`font-serif tracking-widest transition-all duration-700 ${scrolled ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'}`}
                >
                    LUXE GEMS
                </Link>
            </div>

            {/* Right - Call, Wishlist, Account, Cart */}
            <div className="flex-1 flex items-center justify-end gap-5 md:gap-8">
                <button className="hidden lg:flex items-center gap-2 hover:opacity-70 transition-opacity">
                    <Phone strokeWidth={1.5} size={20} />
                    <span className="text-sm uppercase tracking-widest">Call Us</span>
                </button>

                <button className="hover:opacity-70 transition-opacity">
                    <Heart strokeWidth={1.5} size={22} />
                </button>

                {user ? (
                    <div className="relative flex items-center group cursor-pointer py-2">
                        <User strokeWidth={1.5} size={22} />
                        <span className="hidden md:block ml-2 text-sm uppercase tracking-widest">{user.name.split(' ')[0]}</span>
                        <div className="absolute top-full right-0 pt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                            <div className="bg-white text-brand-black shadow-lg py-4 px-6 flex flex-col gap-3 min-w-[150px]">
                                <Link to="/profile" className="text-sm uppercase tracking-widest whitespace-nowrap hover:text-brand-gold transition-colors text-left">Profile</Link>
                                {user.isAdmin && (
                                    <Link to="/admin/productlist" className="text-sm uppercase tracking-widest whitespace-nowrap hover:text-brand-gold transition-colors text-left">Admin</Link>
                                )}
                                <button onClick={logout} className="text-sm uppercase tracking-widest whitespace-nowrap hover:text-brand-gold transition-colors text-left">Logout</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Link to="/login" className="hover:opacity-70 transition-opacity">
                        <User strokeWidth={1.5} size={22} />
                    </Link>
                )}

                <button
                    onClick={openCart}
                    className="relative hover:opacity-70 transition-opacity flex items-center"
                >
                    <ShoppingBag strokeWidth={1.5} size={22} />
                    <AnimatePresence>
                        {cartItems.length > 0 && (
                            <motion.span
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                className={`absolute -top-1.5 -right-2 rounded-full w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold transition-colors duration-500
                                ${transparent ? 'bg-brand-white text-brand-black' : 'bg-brand-black text-brand-white'}`}
                            >
                                {cartItems.reduce((a, c) => a + c.qty, 0)}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </motion.nav>
    );
};

export default Navbar;
