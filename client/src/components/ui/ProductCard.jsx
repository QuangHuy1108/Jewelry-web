import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { useCartStore, useWishlistStore } from '../../store';

const ProductCard = ({ product, isEditorial = false }) => {
    const addToCart = useCartStore(state => state.addToCart);
    const { toggleWishlist, isInWishlist } = useWishlistStore();
    const isSaved = isInWishlist(product._id);

    // Enforce strict 4:5 vertical ratio by default unless editorial grid dictates otherwise.
    // For luxury, images are typically tall for apparel/jewelry.
    const aspectRatioClass = isEditorial ? "aspect-[3/4]" : "aspect-[4/5]";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
            className="group block"
        >
            <div className={`relative overflow-hidden ${aspectRatioClass} bg-brand-light-gray mb-4`}>
                <Link to={`/product/${product._id}`} className="block w-full h-full">
                    {/* Primary Image */}
                    <motion.img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                    />
                    {/* Hover Alternate Image */}
                    {product.imageHover && (
                        <motion.img
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            src={product.imageHover}
                            alt={`${product.name} lifestyle`}
                            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                        />
                    )}
                </Link>

                {/* Wishlist Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product);
                    }}
                    className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 ${isSaved ? 'text-brand-gold opacity-100' : 'text-brand-black opacity-0 group-hover:opacity-100 hover:text-brand-gold'}`}
                >
                    <Heart size={16} strokeWidth={isSaved ? 2 : 1.5} className={isSaved ? "fill-brand-gold" : ""} />
                </button>

                {/* Quick Add To Cart */}
                <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-10">
                    <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-brand-black/95 backdrop-blur-md text-brand-white py-3 uppercase text-[10px] sm:text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-brand-gold transition-colors font-light"
                    >
                        <ShoppingBag size={14} /> Add to Cart
                    </button>
                </div>
            </div>

            <div className="text-center px-4 mt-6">
                <h3 className="text-brand-black text-xs sm:text-sm font-light tracking-wide mb-2 uppercase">
                    <Link to={`/product/${product._id}`} className="hover:text-brand-gold transition-colors inline-block relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-brand-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:origin-left">
                        {product.name}
                    </Link>
                </h3>
                <p className="text-brand-dark-gray text-xs tracking-wider mb-2">${Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                {product.numReviews > 0 && (
                    <div className="flex justify-center items-center gap-1 text-brand-black">
                        {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} size={10} fill={s <= product.rating ? "currentColor" : "none"} stroke="currentColor" />
                        ))}
                        <span className="text-[10px] text-brand-dark-gray ml-1 tracking-widest leading-none">({product.numReviews})</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ProductCard;
