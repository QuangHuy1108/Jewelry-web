import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useProductStore } from '../store/productStore';
import { fetchProductById } from '../services/productService';
import ProductCard from '../components/ui/ProductCard';
import { Heart, Star, ShieldCheck, Truck, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetail = () => {
    const { id } = useParams();
    const addToCart = useCartStore(state => state.addToCart);
    const { products: allProducts, fetchProducts } = useProductStore();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [openAccordion, setOpenAccordion] = useState('details');
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (allProducts.length === 0) {
            fetchProducts();
        }
    }, [allProducts, fetchProducts]);

    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true);
                const data = await fetchProductById(id);
                // Creating a robust gallery array (using imageHover if it exists as image #2)
                const galleryImages = [data.image];
                if (data.imageHover) galleryImages.push(data.imageHover);
                // Fallback to push enough images to feel like a gallery
                galleryImages.push('https://images.unsplash.com/photo-1599643478524-fb66fa5320e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80&sat=-50');

                setProduct({
                    ...data,
                    images: galleryImages,
                    material: '18k Solid Gold or Platinum',
                    details: ['Handcrafted Polish', 'Color: D-F (Colorless)', 'Clarity: VS+', 'Ethically Sourced Conflict-Free']
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getProduct();
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top when ID changes
    }, [id]);

    useEffect(() => {
        if (product && allProducts.length > 0) {
            let related = allProducts.filter(p => p.category === product.category && p._id !== product._id);
            if (related.length < 4) {
                // If not enough in category, just fill with random ones
                const others = allProducts.filter(p => p._id !== product._id && !related.find(r => r._id === p._id));
                related = [...related, ...others].slice(0, 4);
            } else {
                // Shuffle and take 4
                related = related.sort(() => 0.5 - Math.random()).slice(0, 4);
            }
            setRelatedProducts(related);
        }
    }, [product, allProducts]);

    const handleAddToCart = () => {
        addToCart(product, qty);
    };

    const toggleAccordion = (section) => {
        setOpenAccordion(openAccordion === section ? '' : section);
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-brand-white">
            <span className="text-brand-dark-gray tracking-widest text-xs uppercase animate-pulse">Preparing viewing room...</span>
        </div>
    );

    if (!product) return (
        <div className="h-screen flex items-center justify-center bg-brand-white">
            <span className="text-brand-black tracking-widest text-sm uppercase">Piece not found.</span>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-brand-white min-h-screen pt-32 pb-24"
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">

                {/* Breadcrumb */}
                <div className="mb-12 text-[10px] md:text-xs text-brand-dark-gray uppercase tracking-[0.15em] font-light">
                    <Link to="/" className="hover:text-brand-black transition-colors">Home</Link>
                    <span className="mx-3">/</span>
                    <Link to="/shop" className="hover:text-brand-black transition-colors">Boutique</Link>
                    <span className="mx-3">/</span>
                    <span className="text-brand-black">{product.category}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Left Column: Image Viewer (Sticky) */}
                    <div className="lg:col-span-7 flex flex-col md:flex-row gap-6 relative">
                        {/* Thumbnail Strip */}
                        <div className="flex md:flex-col gap-4 order-2 md:order-1 overflow-x-auto md:w-24 shrink-0 scrollbar-hide">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`relative aspect-[3/4] w-20 md:w-full overflow-hidden transition-all duration-300 ${activeImage === i ? 'ring-1 ring-brand-black ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
                                >
                                    <img src={img} alt={`${product.name} detail ${i + 1}`} className="absolute w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="relative aspect-[3/4] w-full order-1 md:order-2 bg-brand-light-gray lg:sticky top-32">
                            <motion.img
                                key={activeImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                src={product.images[activeImage]}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Column: Information & Add to Cart */}
                    <div className="lg:col-span-5 flex flex-col pt-4 lg:py-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="font-serif text-3xl md:text-5xl text-brand-black mb-4 leading-tight tracking-wide"
                        >
                            {product.name}
                        </motion.h1>

                        <p className="text-xl md:text-2xl font-light tracking-wider text-brand-black mb-6">
                            ${Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>

                        <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-200">
                            <div className="flex items-center gap-2 text-brand-dark-gray text-xs tracking-widest uppercase font-light">
                                <div className="flex text-brand-black">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" stroke="none" />)}
                                </div>
                                <span>({product.numReviews} Reviews)</span>
                            </div>
                        </div>

                        <p className="text-brand-dark-gray font-light leading-relaxed mb-10 whitespace-pre-line text-sm md:text-base">
                            {product.description}
                        </p>

                        {/* Actions */}
                        <div className="mb-16">
                            {product.stock > 0 ? (
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center text-xs uppercase tracking-widest text-brand-dark-gray font-light px-2">
                                        <span>Quantity:</span>
                                        <div className="flex items-center gap-6">
                                            <button onClick={() => setQty(Math.max(1, qty - 1))} className="hover:text-brand-black px-2 py-1 transition-colors">-</button>
                                            <span className="text-brand-black">{qty}</span>
                                            <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="hover:text-brand-black px-2 py-1 transition-colors">+</button>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleAddToCart}
                                            className="flex-1 bg-brand-black text-brand-white py-5 uppercase text-xs tracking-[0.2em] font-light hover:bg-brand-gold transition-colors duration-500"
                                        >
                                            Add to Shopping Bag
                                        </button>
                                        <button className="w-16 flex items-center justify-center border border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white transition-colors duration-500">
                                            <Heart size={20} strokeWidth={1} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button disabled className="w-full bg-gray-200 text-brand-dark-gray py-5 uppercase text-xs tracking-[0.2em] font-light cursor-not-allowed">
                                    Currently Unavailable
                                </button>
                            )}
                        </div>

                        {/* Accordions */}
                        <div className="border-t border-gray-200">
                            {/* Materials / Details */}
                            <div className="border-b border-gray-200">
                                <button
                                    onClick={() => toggleAccordion('details')}
                                    className="w-full py-6 flex justify-between items-center text-xs uppercase tracking-[0.15em] hover:text-brand-gold transition-colors"
                                >
                                    <span>Materials & Specifications</span>
                                    {openAccordion === 'details' ? <ChevronUp size={16} strokeWidth={1} /> : <ChevronDown size={16} strokeWidth={1} />}
                                </button>
                                <AnimatePresence>
                                    {openAccordion === 'details' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-6 text-sm text-brand-dark-gray font-light">
                                                <p className="mb-4">Crafted explicitly for the modern heirloom collector. {product.material}</p>
                                                <ul className="space-y-2 list-inside list-disc pl-4 text-xs tracking-wider">
                                                    {product.details?.map((d, i) => <li key={i}>{d}</li>)}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Shipping */}
                            <div className="border-b border-gray-200">
                                <button
                                    onClick={() => toggleAccordion('shipping')}
                                    className="w-full py-6 flex justify-between items-center text-xs uppercase tracking-[0.15em] hover:text-brand-gold transition-colors"
                                >
                                    <span>Shipping & Returns</span>
                                    {openAccordion === 'shipping' ? <ChevronUp size={16} strokeWidth={1} /> : <ChevronDown size={16} strokeWidth={1} />}
                                </button>
                                <AnimatePresence>
                                    {openAccordion === 'shipping' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-6 text-sm text-brand-dark-gray font-light flex flex-col gap-4">
                                                <div className="flex items-start gap-4">
                                                    <Truck size={18} strokeWidth={1} className="mt-1 shrink-0" />
                                                    <p>Complimentary overnight shipping via secure courier on all orders above $2,000.</p>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <RotateCcw size={18} strokeWidth={1} className="mt-1 shrink-0" />
                                                    <p>Eligible for 30-day complimentary returns if entirely unworn with all security tags strictly intact.</p>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <ShieldCheck size={18} strokeWidth={1} className="mt-1 shrink-0" />
                                                    <p>Includes a lifetime warranty detailing uncompromised quality.</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                    </div>
                </div>

                {/* You May Also Like Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-32 pt-20 border-t border-gray-200">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center mb-16"
                        >
                            <h2 className="font-serif text-3xl md:text-4xl text-brand-black mb-4">You May Also Like</h2>
                            <p className="text-xs uppercase tracking-widest text-brand-dark-gray font-light">Curated pairings from our collection</p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p._id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ProductDetail;
