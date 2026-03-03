import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import HeroSection from '../components/sections/HeroSection';
import EditorialGrid from '../components/sections/EditorialGrid';
import ProductCard from '../components/ui/ProductCard';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } }
};

const getCategories = () => [
    { name: 'Bridal', description: 'Timeless symbols of your eternal devotion. Discover rings crafted with peerless precision.', image: 'https://images.unsplash.com/photo-1605100804763-247f6613d28e?auto=format&fit=crop&w=800&ar=4:5&q=80' },
    { name: 'High Jewelry', description: 'Rare gemstones meeting visionary design. The zenith of our house\'s craftsmanship.', image: 'https://images.unsplash.com/photo-1599643477874-c4a6a5bc3fbc?auto=format&fit=crop&w=800&ar=4:5&q=80' },
];

const getTrendingProducts = () => [
    { _id: '60d21b4667d0d8992e610c81', name: 'Solitaire Diamond Ring', price: 4999.00, category: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f6613d28e?auto=format&fit=crop&w=800&ar=4:5&q=80', imageHover: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=800&ar=4:5&q=80' },
    { _id: '60d21b4667d0d8992e610c82', name: 'Emerald Cut Necklace', price: 8500.00, category: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478524-fb66f7f2b184?auto=format&fit=crop&w=800&ar=4:5&q=80', imageHover: 'https://images.unsplash.com/photo-1599643477874-c4a6a5bc3fbc?auto=format&fit=crop&w=800&ar=4:5&q=80' },
    { _id: '60d21b4667d0d8992e610c83', name: 'Sapphire Drop Earrings', price: 3200.00, category: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&ar=4:5&q=80', imageHover: 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=800&ar=4:5&q=80' },
    { _id: '60d21b4667d0d8992e610c84', name: 'Rose Gold Tennis Bracelet', price: 6100.00, category: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&ar=4:5&q=80', imageHover: 'https://images.unsplash.com/photo-1573408301145-b98fc4eab913?auto=format&fit=crop&w=800&ar=4:5&q=80' }
];

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
        >
            <HeroSection />

            {/* Editorial GSAP Scroll Sequences */}
            <EditorialGrid categories={getCategories()} />

            {/* Best Sellers Grid */}
            <div className="py-24 px-6 md:px-12 text-center bg-brand-white">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    className="mb-16"
                >
                    <h2 className="font-serif text-4xl mb-4 text-brand-black">Trending Now</h2>
                    <p className="text-brand-dark-gray max-w-[600px] mx-auto">
                        The most coveted pieces from our current collection, loved by our clientele.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {getTrendingProducts().map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                <motion.div variants={fadeInUp}>
                    <Link to="/shop" className="relative inline-block text-sm uppercase tracking-widest group pb-2 text-brand-black hover:text-brand-gold transition-colors">
                        View All Best Sellers
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-brand-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out" />
                    </Link>
                </motion.div>
            </div>

            {/* Brand Story with Scroll Reveal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-brand-light-gray items-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                    }}
                    className="py-16 px-12 md:p-24 max-w-[700px] mx-auto text-center lg:text-left"
                >
                    <motion.p variants={fadeInUp} className="text-sm uppercase tracking-[0.15em] text-brand-dark-gray mb-4 font-bold">
                        Our Heritage
                    </motion.p>
                    <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl mb-6 text-brand-black">
                        Masterful Craftsmanship
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="text-brand-dark-gray mb-8 text-lg leading-relaxed">
                        Since 1920, Luxe Gems has been synonymous with unparalleled elegance. Each piece is meticulously handcrafted by master artisans using ethically sourced diamonds and the finest precious metals. Our dedication to perfection ensures that your jewelry will be cherished for generations.
                    </motion.p>
                    <motion.div variants={fadeInUp}>
                        <Link to="/about" className="relative inline-block text-sm uppercase tracking-widest group pb-2 text-brand-black hover:text-brand-gold transition-colors">
                            Read Our Story
                            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-brand-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out" />
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-[50vh] lg:h-[80vh] bg-[url('https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"
                />
            </div>
        </motion.div>
    );
};

export default Home;
