import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore, useUserStore, useUIStore } from '../../store';
import { ShoppingBag, User, Menu, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { cartItems } = useCartStore();
    const { userInfo, logout } = useUserStore();
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

        window.addEventListener('scroll', handleScroll);
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
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 50,
                padding: scrolled ? 'var(--space-16) var(--space-32)' : 'var(--space-24) var(--space-32)',
                backgroundColor: transparent ? 'transparent' : 'rgba(255, 255, 255, 0.98)',
                color: transparent ? 'var(--color-secondary)' : 'var(--color-primary)',
                backdropFilter: transparent ? 'none' : 'blur(10px)',
                borderBottom: transparent ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--color-border)',
                transition: 'padding 0.4s ease, background-color 0.4s ease, color 0.4s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            {/* Left - Hamburger / Links (Desktop) */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 'var(--space-24)' }}>
                <button style={{ color: 'inherit', display: 'flex' }} className="mobile-menu-btn">
                    <Menu strokeWidth={1.5} />
                </button>
                <div style={{ display: 'flex', gap: 'var(--space-24)' }} className="desktop-links">
                    <Link to="/shop" className="nav-link" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Shop</Link>
                    <Link to="#" className="nav-link" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Collections</Link>
                    <Link to="#" className="nav-link" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Our Story</Link>
                </div>
            </div>

            {/* Center - Logo */}
            <Link to="/" style={{
                fontSize: scrolled ? '1.8rem' : '2.2rem',
                fontWeight: '400',
                fontFamily: 'var(--font-family-serif)',
                letterSpacing: '0.05em',
                transition: 'font-size 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}>
                Luxe Gems
            </Link>

            {/* Right - Icons */}
            <div style={{ flex: 1, display: 'flex', gap: 'var(--space-24)', alignItems: 'center', justifyContent: 'flex-end' }}>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} style={{ color: 'inherit', display: 'flex' }}>
                    <Search strokeWidth={1.5} size={22} />
                </motion.button>

                {userInfo ? (
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} className="user-menu">
                        <motion.span whileHover={{ scale: 1.05 }} style={{ fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
                            <User strokeWidth={1.5} size={22} />
                            <span className="desktop-links">{userInfo.name.split(' ')[0]}</span>
                        </motion.span>
                        <button onClick={logout} style={{ color: 'inherit', fontSize: '0.8rem', marginLeft: 'var(--space-16)', textTransform: 'uppercase', letterSpacing: '0.05em' }} className="nav-link desktop-links">Logout</button>
                    </div>
                ) : (
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Link to="/login" style={{ color: 'inherit', display: 'flex' }}>
                            <User strokeWidth={1.5} size={22} />
                        </Link>
                    </motion.div>
                )}

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openCart}
                    style={{ position: 'relative', color: 'inherit', display: 'flex' }}
                >
                    <ShoppingBag strokeWidth={1.5} size={22} />
                    <AnimatePresence>
                        {cartItems.length > 0 && (
                            <motion.span
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                style={{
                                    position: 'absolute',
                                    top: -6,
                                    right: -8,
                                    background: transparent ? 'white' : 'var(--color-primary)',
                                    color: transparent ? 'black' : 'white',
                                    borderRadius: '50%',
                                    width: '18px',
                                    height: '18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.7rem',
                                    fontWeight: 'bold',
                                    transition: 'background 0.4s ease, color 0.4s ease'
                                }}
                            >
                                {cartItems.reduce((a, c) => a + c.qty, 0)}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .desktop-links { display: none !important; }
                }
                @media (min-width: 769px) {
                    .mobile-menu-btn { display: none !important; }
                }
            `}</style>
        </motion.nav>
    );
};

export default Navbar;
