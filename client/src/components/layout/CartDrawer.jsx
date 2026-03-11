import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCartStore();
    const { isCartOpen, closeCart } = useUIStore();

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="fixed top-0 right-0 w-full max-w-[450px] h-screen bg-brand-white z-[1000] shadow-2xl flex flex-col"
                    >
                        <div className="p-6 md:p-8 flex justify-between items-center border-b border-gray-100">
                            <h2 className="font-serif text-2xl tracking-wide text-brand-black">Your Bag ({cartItems.length})</h2>
                            <button onClick={closeCart} className="text-brand-dark-gray hover:text-brand-black transition-colors" aria-label="Close cart">
                                <X size={24} strokeWidth={1} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 md:p-8">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center mt-[-10%]">
                                    <p className="text-brand-dark-gray uppercase tracking-widest text-[10px] font-light mb-8">Your bag is currently empty.</p>
                                    <button onClick={closeCart} className="bg-brand-black text-brand-white px-8 py-4 uppercase text-[10px] tracking-[0.2em] font-light hover:bg-brand-gold transition-colors duration-500 w-full">
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-8">
                                    {cartItems.map((item) => (
                                        <div key={item.product} className="flex gap-6">
                                            <Link to={`/product/${item.product}`} onClick={closeCart} className="shrink-0 w-[90px] aspect-[3/4] bg-brand-light-gray overflow-hidden">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                            </Link>
                                            <div className="flex flex-1 flex-col">
                                                <div className="flex justify-between items-start mb-1">
                                                    <Link to={`/product/${item.product}`} onClick={closeCart} className="font-serif text-lg tracking-wide text-brand-black hover:text-brand-gold transition-colors line-clamp-2 pr-4">
                                                        {item.name}
                                                    </Link>
                                                    <button onClick={() => removeFromCart(item.product)} className="text-brand-dark-gray hover:text-black transition-colors mt-1 shrink-0">
                                                        <Trash2 size={14} strokeWidth={1.5} />
                                                    </button>
                                                </div>
                                                {item.size && (
                                                    <p className="text-brand-dark-gray text-xs uppercase tracking-widest font-light mb-1">
                                                        Size: {item.size}
                                                    </p>
                                                )}
                                                <p className="text-brand-dark-gray font-light tracking-wider text-sm mb-auto">
                                                    ${Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </p>

                                                <div className="flex items-center mt-4">
                                                    <div className="flex items-center gap-4 text-brand-black text-xs font-light">
                                                        <button onClick={() => updateQuantity(item.product, Math.max(1, item.qty - 1))} className="hover:text-brand-gold px-1 transition-colors">-</button>
                                                        <span className="w-4 text-center">{item.qty}</span>
                                                        <button onClick={() => updateQuantity(item.product, item.qty + 1)} className="hover:text-brand-gold px-1 transition-colors">+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="p-6 md:p-8 border-t border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <p className="text-brand-black font-serif text-xl tracking-wide">Subtotal</p>
                                    <p className="text-brand-black font-serif text-xl tracking-wide">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                </div>
                                <Link to="/checkout" onClick={closeCart} className="bg-brand-black text-brand-white px-8 py-4 uppercase text-[10px] tracking-[0.2em] font-light hover:bg-brand-gold transition-colors duration-500 w-full flex justify-between items-center">
                                    Checkout
                                    <ArrowRight size={16} strokeWidth={1.5} />
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence >
    );
};

export default CartDrawer;
