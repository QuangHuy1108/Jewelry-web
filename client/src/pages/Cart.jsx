import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCartStore();

    if (cartItems.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="pt-40 pb-32 px-6 flex flex-col items-center justify-center min-h-[60vh] bg-brand-white text-center"
            >
                <h1 className="font-serif text-3xl md:text-5xl text-brand-black mb-6 tracking-wide">Your Shopping Bag</h1>
                <p className="text-brand-dark-gray uppercase tracking-widest text-xs font-light mb-12">Your bag is empty.</p>
                <Link to="/shop" className="bg-brand-black text-brand-white px-12 py-5 uppercase text-xs tracking-[0.2em] font-light hover:bg-brand-gold transition-colors duration-500">
                    Return to Boutique
                </Link>
            </motion.div>
        );
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-32 pb-24 px-6 md:px-12 bg-brand-white min-h-screen"
        >
            <div className="max-w-6xl mx-auto">
                <header className="mb-16 md:mb-24 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-serif text-3xl md:text-5xl text-brand-black mb-6 tracking-wide"
                    >
                        Your Shopping Bag
                    </motion.h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* Items List */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        <div className="hidden md:flex justify-between border-b border-gray-200 pb-4 text-[10px] sm:text-xs uppercase tracking-[0.15em] font-light text-brand-dark-gray">
                            <span>Item</span>
                            <span className="w-40 flex justify-between">
                                <span>Qty</span>
                                <span>Total</span>
                            </span>
                        </div>

                        {cartItems.map((item, index) => (
                            <motion.div
                                key={item.product}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="flex flex-col md:flex-row justify-between md:items-center py-6 border-b border-gray-100 gap-6 md:gap-0"
                            >
                                {/* Item Details */}
                                <div className="flex gap-6 items-center flex-1">
                                    <Link to={`/product/${item.product}`} className="w-24 shrink-0 aspect-[3/4] bg-brand-light-gray overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                    </Link>
                                    <div className="flex flex-col">
                                        <Link to={`/product/${item.product}`} className="font-serif text-lg md:text-xl text-brand-black mb-2 hover:text-brand-gold transition-colors">
                                            {item.name}
                                        </Link>
                                        {item.size && (
                                            <p className="text-brand-dark-gray text-xs uppercase tracking-widest font-light mb-2">
                                                Size: {item.size}
                                            </p>
                                        )}
                                        <p className="text-brand-dark-gray font-light text-sm tracking-wider mb-4">
                                            ${Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                        <button
                                            onClick={() => removeFromCart(item.product)}
                                            className="self-start text-[10px] uppercase tracking-widest text-brand-dark-gray hover:text-black transition-colors flex items-center gap-1.5"
                                        >
                                            <Trash2 size={12} strokeWidth={1.5} /> Remove
                                        </button>
                                    </div>
                                </div>

                                {/* Controls & Row Total */}
                                <div className="flex justify-between md:w-40 md:justify-between items-center w-full md:mt-0 mt-4">
                                    <div className="flex items-center gap-4 text-brand-black text-sm">
                                        <button onClick={() => updateQuantity(item.product, Math.max(1, item.qty - 1))} className="hover:text-brand-gold px-1 transition-colors">-</button>
                                        <span className="w-4 text-center">{item.qty}</span>
                                        <button onClick={() => updateQuantity(item.product, item.qty + 1)} className="hover:text-brand-gold px-1 transition-colors">+</button>
                                    </div>
                                    <span className="font-light tracking-wider text-brand-black md:text-right">
                                        ${Number(item.qty * item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-4 sticky top-32">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="bg-brand-surface p-8 border border-gray-100"
                        >
                            <h2 className="text-sm font-light uppercase tracking-widest text-brand-black mb-8 text-center pb-6 border-b border-gray-200">
                                Order Summary
                            </h2>

                            <div className="flex justify-between mb-4 text-sm font-light text-brand-dark-gray">
                                <span>Subtotal</span>
                                <span>${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between mb-8 text-sm font-light text-brand-dark-gray">
                                <span>Shipping</span>
                                <span>Complimentary</span>
                            </div>

                            <div className="flex justify-between pt-6 border-t border-gray-200 text-lg font-light tracking-wider text-brand-black mb-10">
                                <span>Total</span>
                                <span>${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>

                            <Link to="/checkout" className="block w-full">
                                <button className="w-full bg-brand-black text-brand-white py-5 uppercase text-xs tracking-[0.2em] font-light hover:bg-brand-gold transition-colors duration-500 flex justify-center items-center gap-3">
                                    Secure Checkout <ArrowRight size={16} strokeWidth={1} />
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Cart;
