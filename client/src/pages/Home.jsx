import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCartStore } from '../store';
import { ShoppingBag, Heart } from 'lucide-react';

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const Home = () => {
    const { scrollY } = useScroll();
    // Parallax effect for the hero background
    const yHero = useTransform(scrollY, [0, 1000], [0, 300]);

    const addToCart = useCartStore(state => state.addToCart);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Hero Section with Parallax */}
            <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
                <motion.div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '110%',
                    y: yHero,
                    background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1515562141207-7a8ef25ce99c?auto=format&fit=crop&w=1920&q=80") center/cover no-repeat',
                    zIndex: -1
                }} />

                <div style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'var(--color-secondary)',
                    textAlign: 'center',
                    paddingTop: 'var(--header-height)'
                }}>
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        style={{ maxWidth: '800px', padding: 'var(--space-24)' }}
                    >
                        <motion.p variants={fadeInUp} style={{ textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 'var(--space-16)', fontSize: '0.9rem' }}>High Jewelry Collection</motion.p>
                        <motion.h1 variants={fadeInUp} style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: 'var(--space-24)' }}>Elegance Redefined</motion.h1>
                        <motion.p variants={fadeInUp} style={{ fontSize: '1.2rem', marginBottom: 'var(--space-32)', color: 'rgba(255,255,255,0.9)' }}>
                            Discover our exclusive collection of handcrafted pieces designed to make every moment unforgettable.
                        </motion.p>
                        <motion.div variants={fadeInUp}>
                            <Link to="/shop">
                                <Button variant="primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Shop Now</Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Featured Categories with scroll reveal */}
            <div className="container" style={{ padding: 'var(--space-96) var(--space-24)', textAlign: 'center' }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-16)' }}>Discover by Category</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-48)', maxWidth: '600px', margin: '0 auto var(--space-48)' }}>Explore our carefully curated selection of fine jewelry, categorized for your shopping pleasure.</p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={staggerContainer}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-24)' }}
                >
                    {[
                        { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f6613d28e?auto=format&fit=crop&w=800&ar=1:1&q=80' },
                        { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643477874-c4a6a5bc3fbc?auto=format&fit=crop&w=800&ar=1:1&q=80' },
                        { name: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&ar=1:1&q=80' },
                        { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&ar=1:1&q=80' }
                    ].map(cat => (
                        <motion.div variants={fadeInUp} key={cat.name}>
                            <Link to={`/shop?category=${cat.name}`} style={{ display: 'block', overflow: 'hidden', position: 'relative', height: '450px' }} className="product-card">
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    src={cat.image}
                                    alt={cat.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{ position: 'absolute', bottom: 'var(--space-32)', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--color-secondary)', padding: 'var(--space-16) var(--space-48)', minWidth: '200px' }}>
                                    <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cat.name}</h3>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Best Sellers Grid */}
            <div className="container" style={{ padding: '0 var(--space-24) var(--space-96)', textAlign: 'center' }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-16)' }}>Trending Now</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-48)', maxWidth: '600px', margin: '0 auto var(--space-48)' }}>The most coveted pieces from our current collection, loved by our clientele.</p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={staggerContainer}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-32)' }}
                >
                    {[
                        { _id: '1', name: 'Solitaire Diamond Ring', price: 4999.00, category: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f6613d28e?auto=format&fit=crop&w=800&ar=4:5&q=80', imageHover: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=800&ar=4:5&q=80' },
                        { _id: '2', name: 'Emerald Cut Necklace', price: 8500.00, category: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478524-fb66f7f2b184?auto=format&fit=crop&w=800&ar=4:5&q=80', imageHover: 'https://images.unsplash.com/photo-1599643477874-c4a6a5bc3fbc?auto=format&fit=crop&w=800&ar=4:5&q=80' },
                        { _id: '3', name: 'Sapphire Drop Earrings', price: 3200.00, category: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&ar=4:5&q=80', imageHover: 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=800&ar=4:5&q=80' },
                        { _id: '4', name: 'Rose Gold Tennis Bracelet', price: 6100.00, category: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&ar=4:5&q=80', imageHover: 'https://images.unsplash.com/photo-1573408301145-b98fc4eab913?auto=format&fit=crop&w=800&ar=4:5&q=80' }
                    ].map((p, index) => (
                        <motion.div variants={fadeInUp} key={p._id} className="product-card">
                            <div className="product-image-container" style={{ aspectRatio: '3/4', marginBottom: 'var(--space-16)' }}>
                                <Link to={`/product/${p._id}`}>
                                    <img src={p.image} alt={p.name} className="primary-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <img src={p.imageHover} alt={`${p.name} alternate`} className="secondary-img" />
                                </Link>
                                <div className="quick-actions">
                                    <Button variant="secondary" style={{ padding: '0.5rem', flex: 1, backgroundColor: 'white', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '0.85rem', textTransform: 'uppercase' }} onClick={() => addToCart(p, 1)}>
                                        <ShoppingBag size={16} /> Add
                                    </Button>
                                </div>
                                <button style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--color-primary)', backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '50%', padding: '8px', display: 'flex', border: 'none', cursor: 'pointer' }} className="nav-link">
                                    <Heart size={18} strokeWidth={1.5} />
                                </button>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-8)', fontWeight: '400' }}>
                                    <Link to={`/product/${p._id}`}>{p.name}</Link>
                                </h3>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>${p.price.toFixed(2)}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div variants={fadeInUp} style={{ marginTop: 'var(--space-48)' }}>
                    <Link to="/shop">
                        <Button variant="secondary" style={{ padding: '1rem 3rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>View All Best Sellers</Button>
                    </Link>
                </motion.div>
            </div>

            {/* Brand Story with Scroll Reveal */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
                backgroundColor: 'var(--color-surface)',
                alignItems: 'center'
            }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                    style={{ padding: 'var(--space-64) var(--space-48)', maxWidth: '600px', margin: '0 auto' }}
                >
                    <motion.p variants={fadeInUp} style={{ textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-accent)', marginBottom: 'var(--space-16)', fontSize: '0.9rem', fontWeight: 'bold' }}>Our Heritage</motion.p>
                    <motion.h2 variants={fadeInUp} style={{ fontSize: '2.5rem', marginBottom: 'var(--space-24)' }}>Masterful Craftsmanship</motion.h2>
                    <motion.p variants={fadeInUp} style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-32)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                        Since 1920, Luxe Gems has been synonymous with unparalleled elegance. Each piece is meticulously handcrafted by master artisans using ethically sourced diamonds and the finest precious metals. Our dedication to perfection ensures that your jewelry will be cherished for generations.
                    </motion.p>
                    <motion.div variants={fadeInUp}>
                        <Button variant="secondary" style={{ padding: '1rem 2.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Read Our Story</Button>
                    </motion.div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ height: '700px', background: 'url("https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80") center/cover no-repeat' }}
                />
            </div>
        </motion.div>
    );
};

export default Home;
