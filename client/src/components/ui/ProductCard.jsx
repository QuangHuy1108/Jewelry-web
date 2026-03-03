import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCartStore } from '../../store';

const ProductCard = ({ product, isEditorial = false }) => {
    const addToCart = useCartStore(state => state.addToCart);

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
                <button className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm text-brand-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-brand-gold">
                    <Heart size={16} strokeWidth={1.5} />
                </button>

                {/* Quick Add To Cart */}
                <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-10">
                    <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-brand-black text-brand-white py-4 uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-brand-dark-gray transition-colors"
                    >
                        <ShoppingBag size={14} /> Add to Cart
                    </button>
                </div>
            </div>

            <div className="text-center px-2">
                <h3 className="text-brand-black text-sm md:text-base font-medium tracking-wide mb-1">
                    <Link to={`/product/${product._id}`} className="hover:text-brand-gold transition-colors">
                        {product.name}
                    </Link>
                </h3>
                <p className="text-brand-dark-gray text-sm">${product.price.toFixed(2)}</p>
            </div>
        </motion.div>
    );
};

export default ProductCard;
