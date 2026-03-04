import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useProductStore } from '../store/productStore';
import { useUserStore } from '../store/userStore';
import { useWishlistStore } from '../store/wishlistStore';
import { fetchProductById } from '../services/productService';
import ProductCard from '../components/ui/ProductCard';
import { Heart, Star, ShieldCheck, Truck, RotateCcw, ChevronDown, ChevronUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetail = () => {
    const { id } = useParams();
    const addToCart = useCartStore(state => state.addToCart);
    const { products: allProducts, fetchProducts, createReview } = useProductStore();
    const { user } = useUserStore();
    const { toggleWishlist, isInWishlist } = useWishlistStore();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [openAccordion, setOpenAccordion] = useState('details');
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviewError, setReviewError] = useState('');
    const [reviewLoading, setReviewLoading] = useState(false);

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

    const submitReviewHandler = async (e) => {
        e.preventDefault();
        setReviewError('');
        if (rating === 0) {
            setReviewError('Please select a rating.');
            return;
        }
        setReviewLoading(true);
        const res = await createReview(id, { rating, comment });
        if (res.success) {
            setRating(0);
            setComment('');
            // Optional: You could re-fetch the product to update reviews list immediately
            const data = await fetchProductById(id);
            setProduct(prev => ({ ...prev, reviews: data.reviews, numReviews: data.numReviews, rating: data.rating }));
        } else {
            setReviewError(res.error || 'Failed to submit review');
        }
        setReviewLoading(false);
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
                    <div className="lg:col-span-7 flex flex-col md:flex-row gap-6 relative items-start">
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
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill={s <= product.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1} />)}
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
                                <div className="flex flex-col gap-5">
                                    <div className="flex justify-between items-center flex-wrap gap-4 px-2">
                                        <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-brand-dark-gray font-light">
                                            <span>Quantity:</span>
                                            <div className="flex items-center gap-4">
                                                <button onClick={() => setQty(Math.max(1, qty - 1))} className="hover:text-brand-black px-2 py-1 transition-colors">-</button>
                                                <span className="text-brand-black">{qty}</span>
                                                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="hover:text-brand-black px-2 py-1 transition-colors">+</button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsSizeGuideOpen(true)}
                                            className="text-[10px] uppercase font-light tracking-widest text-brand-dark-gray border-b border-transparent hover:text-brand-black hover:border-brand-black transition-colors pb-0.5"
                                        >
                                            View Size Guide
                                        </button>
                                    </div>
                                    <div className="flex gap-4 mt-2">
                                        <button
                                            onClick={handleAddToCart}
                                            className="flex-1 bg-brand-black text-brand-white py-5 uppercase text-xs tracking-[0.2em] font-light hover:bg-brand-gold transition-colors duration-500"
                                        >
                                            Add to Shopping Bag
                                        </button>
                                        <button
                                            onClick={() => toggleWishlist(product)}
                                            className={`w-16 flex items-center justify-center border border-brand-black transition-colors duration-500 ${isInWishlist(product._id) ? 'bg-brand-black text-brand-white' : 'text-brand-black hover:bg-brand-black hover:text-brand-white'}`}
                                        >
                                            <Heart size={20} strokeWidth={isInWishlist(product._id) ? 2 : 1} className={isInWishlist(product._id) ? "fill-brand-white" : ""} />
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

                            {/* Care & Maintenance */}
                            <div className="border-b border-gray-200">
                                <button
                                    onClick={() => toggleAccordion('care')}
                                    className="w-full py-6 flex justify-between items-center text-xs uppercase tracking-[0.15em] hover:text-brand-gold transition-colors"
                                >
                                    <span>Care & Maintenance</span>
                                    {openAccordion === 'care' ? <ChevronUp size={16} strokeWidth={1} /> : <ChevronDown size={16} strokeWidth={1} />}
                                </button>
                                <AnimatePresence>
                                    {openAccordion === 'care' && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-6 text-sm text-brand-dark-gray font-light flex flex-col gap-4 leading-relaxed">
                                                <p>To preserve the brilliance of your piece, we recommend removing it before swimming, exercising, or applying cosmetics and perfumes.</p>
                                                <p>Clean gently with a soft, lint-free cloth or a mild jewelry cleanser. Store individually in the provided Luxe Gems suede pouch or a lined jewelry box to prevent scratching and atmospheric exposure.</p>
                                                <p>We offer complimentary professional cleaning, inspection, and polishing for all our creations once a year.</p>
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

                {/* Reviews Section */}
                <div className="mt-32 pt-16 border-t border-gray-200">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                        <div className="lg:col-span-5">
                            <h2 className="font-serif text-3xl text-brand-black mb-8">Client Experiences</h2>
                            {product.reviews && product.reviews.length > 0 ? (
                                <div className="flex flex-col gap-10 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin">
                                    {product.reviews.map((review) => (
                                        <div key={review._id} className="pb-8 border-b border-gray-100 last:border-0">
                                            <div className="flex items-center gap-2 mb-3 text-brand-black">
                                                {[1, 2, 3, 4, 5].map(s => (
                                                    <Star key={s} size={12} fill={s <= review.rating ? "currentColor" : "none"} stroke="currentColor" />
                                                ))}
                                            </div>
                                            <p className="text-brand-dark-gray font-light text-sm mb-4 leading-relaxed">"{review.comment}"</p>
                                            <div className="text-xs uppercase tracking-widest text-brand-dark-gray">
                                                — {review.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-brand-dark-gray text-sm font-light">Be the first to share your experience with this piece.</p>
                            )}
                        </div>

                        <div className="lg:col-span-7">
                            <h2 className="text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray pb-4 border-b border-gray-200 mb-8">
                                Write a Review
                            </h2>
                            {user ? (
                                <form onSubmit={submitReviewHandler} className="flex flex-col gap-8 max-w-lg">
                                    {reviewError && <div className="text-red-600 text-xs font-light">{reviewError}</div>}

                                    <div className="flex flex-col gap-4">
                                        <label className="text-xs uppercase tracking-widest text-brand-dark-gray font-light">Rating</label>
                                        <div className="flex gap-2 text-brand-light-gray">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <button
                                                    key={s}
                                                    type="button"
                                                    onClick={() => setRating(s)}
                                                    className={`hover:text-brand-black transition-colors ${s <= rating ? 'text-brand-black' : ''}`}
                                                >
                                                    <Star size={24} fill={s <= rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <label className="text-xs uppercase tracking-widest text-brand-dark-gray font-light">Your Experience</label>
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            required
                                            rows="4"
                                            className="w-full py-4 bg-transparent border-b border-gray-300 text-brand-black font-light text-sm focus:outline-none focus:border-brand-black transition-colors resize-none placeholder:text-gray-400"
                                            placeholder="Beautifully crafted..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={reviewLoading}
                                        className="bg-brand-black text-brand-white py-4 px-8 w-fit uppercase text-xs tracking-[0.2em] font-light hover:bg-brand-gold transition-colors duration-500 disabled:bg-gray-300"
                                    >
                                        {reviewLoading ? 'Submitting...' : 'Submit Review'}
                                    </button>
                                </form>
                            ) : (
                                <div className="p-8 bg-brand-surface border border-gray-100 text-center">
                                    <p className="text-brand-dark-gray font-light text-sm mb-4">Please log in to share your experience.</p>
                                    <Link to="/login" className="text-xs uppercase tracking-[0.2em] text-brand-black border-b border-brand-black pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
                                        Sign In
                                    </Link>
                                </div>
                            )}
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

            {/* Size Guide Modal */}
            <AnimatePresence>
                {isSizeGuideOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-brand-white/80 backdrop-blur-sm p-4 md:p-0"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-brand-surface border border-gray-200 w-full max-w-2xl relative shadow-2xl"
                        >
                            <button
                                onClick={() => setIsSizeGuideOpen(false)}
                                className="absolute right-6 top-6 text-brand-dark-gray hover:text-brand-black transition-colors"
                            >
                                <X strokeWidth={1} size={24} />
                            </button>

                            <div className="p-10 md:p-14">
                                <div className="text-center mb-10">
                                    <h3 className="font-serif text-2xl text-brand-black mb-2">Size Guide</h3>
                                    <p className="text-xs uppercase tracking-widest text-brand-dark-gray font-light">Find your perfect fit</p>
                                </div>

                                <div className="mb-8">
                                    <h4 className="text-sm font-light text-brand-black mb-4 border-b border-gray-200 pb-2">Rings</h4>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left font-light text-sm text-brand-dark-gray">
                                            <thead>
                                                <tr className="text-xs uppercase tracking-widest text-brand-black">
                                                    <th className="pb-3 pr-4 font-normal">US</th>
                                                    <th className="pb-3 pr-4 font-normal">UK / AU</th>
                                                    <th className="pb-3 pr-4 font-normal">EU</th>
                                                    <th className="pb-3 font-normal">Diameter (mm)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-t border-gray-100"><td className="py-3">5</td><td>J 1/2</td><td>49</td><td>15.7</td></tr>
                                                <tr className="border-t border-gray-100"><td className="py-3">6</td><td>L 1/2</td><td>52</td><td>16.5</td></tr>
                                                <tr className="border-t border-gray-100"><td className="py-3">7</td><td>N 1/2</td><td>54</td><td>17.3</td></tr>
                                                <tr className="border-t border-gray-100"><td className="py-3">8</td><td>P 1/2</td><td>57</td><td>18.1</td></tr>
                                                <tr className="border-t border-gray-100"><td className="py-3">9</td><td>R 1/2</td><td>60</td><td>18.9</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-light text-brand-black mb-4 border-b border-gray-200 pb-2">Bracelets</h4>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left font-light text-sm text-brand-dark-gray">
                                            <thead>
                                                <tr className="text-xs uppercase tracking-widest text-brand-black">
                                                    <th className="pb-3 pr-4 font-normal">Size</th>
                                                    <th className="pb-3 pr-4 font-normal">Inches</th>
                                                    <th className="pb-3 font-normal">Centimeters</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-t border-gray-100"><td className="py-3">Small</td><td>6.0" - 6.5"</td><td>15 - 16.5</td></tr>
                                                <tr className="border-t border-gray-100"><td className="py-3">Medium</td><td>6.5" - 7.0"</td><td>16.5 - 18</td></tr>
                                                <tr className="border-t border-gray-100"><td className="py-3">Large</td><td>7.0" - 7.5"</td><td>18 - 19</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProductDetail;
