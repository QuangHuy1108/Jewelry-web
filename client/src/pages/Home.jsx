import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSection from '../components/sections/HeroSection';
import EditorialGrid from '../components/sections/EditorialGrid';
import ProductCard from '../components/ui/ProductCard';
import { useProductStore } from '../store/productStore';

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } }
};

const getCategories = () => [
    { name: 'Bridal', description: 'Timeless symbols of your eternal devotion. Discover rings crafted with peerless precision.', image: 'https://images.unsplash.com/photo-1605100804763-247f6613d28e?auto=format&fit=crop&w=800&ar=4:5&q=80' },
    { name: 'High Jewelry', description: 'Rare gemstones meeting visionary design. The zenith of our house\'s craftsmanship.', image: 'https://images.unsplash.com/photo-1599643477874-c4a6a5bc3fbc?auto=format&fit=crop&w=800&ar=4:5&q=80' },
];

const Home = () => {
    const { fetchProducts, products, isLoading } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Simply slice the top 4 products to feature on the homepage
    const trendingProducts = products.length > 0 ? products.slice(0, 4) : [];

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
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-brand-black tracking-wide">Trending Now</h2>
                    <p className="text-brand-dark-gray max-w-[600px] mx-auto text-sm tracking-wider font-light uppercase">
                        The most coveted pieces from our current collection.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-20">
                    {isLoading ? (
                        <div className="col-span-full py-12 flex justify-center items-center">
                            <span className="text-brand-dark-gray tracking-widest text-xs uppercase animate-pulse">Curating Collection...</span>
                        </div>
                    ) : trendingProducts.length > 0 ? (
                        trendingProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-brand-dark-gray tracking-widest text-xs uppercase">
                            Our collection is currently being updated.
                        </div>
                    )}
                </div>

                <motion.div variants={fadeInUp}>
                    <Link to="/shop" className="relative inline-block text-[11px] uppercase tracking-[0.2em] group pb-2 text-brand-black hover:text-brand-dark-gray transition-colors">
                        Explore Full Collection
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-brand-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Home;
