import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';
import { placeOrder } from '../services/orderService';
import { motion } from 'framer-motion';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCartStore();
    const { userInfo } = useUserStore();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const orderData = {
                orderItems: cartItems.map(item => ({
                    name: item.name,
                    qty: item.qty,
                    image: item.image,
                    price: item.price,
                    product: item.product,
                })),
                shippingAddress: { address, city, country },
                paymentMethod: 'PayPal',
                itemsPrice: subtotal,
                shippingPrice: 0,
                taxPrice: 0,
                totalPrice: subtotal,
            };

            await placeOrder(orderData);
            clearCart();
            navigate('/order-success');
        } catch (err) {
            setError(err.message);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0 && !loading) {
        return <Navigate to="/cart" replace />;
    }

    const inputClasses = "w-full py-4 bg-transparent border-b border-gray-300 text-brand-black font-light text-sm focus:outline-none focus:border-brand-black transition-colors rounded-none placeholder:text-gray-400";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-32 pb-24 px-6 md:px-12 bg-brand-white min-h-screen"
        >
            <div className="max-w-6xl mx-auto">
                <header className="mb-16 md:mb-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-serif text-3xl md:text-5xl text-brand-black mb-6 tracking-wide"
                    >
                        Secure Checkout
                    </motion.h1>
                </header>

                {error && (
                    <div className="mb-8 p-4 bg-red-50 text-red-600 text-sm font-light text-center border border-red-100 max-w-2xl mx-auto">
                        {error}
                    </div>
                )}

                <form onSubmit={submitHandler} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* Left Column: Forms */}
                    <div className="lg:col-span-7 flex flex-col gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col gap-8"
                        >
                            <h2 className="text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray pb-4 border-b border-gray-200">
                                Shipping Information
                            </h2>

                            <div className="flex flex-col gap-6">
                                <div>
                                    <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required className={inputClasses} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required className={inputClasses} />
                                    <input type="text" placeholder="Country / Region" value={country} onChange={(e) => setCountry(e.target.value)} required className={inputClasses} />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col gap-8"
                        >
                            <h2 className="text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray pb-4 border-b border-gray-200">
                                Payment Method
                            </h2>
                            <div className="py-4 text-brand-dark-gray font-light text-sm">
                                Simulated Secure Payment (PayPal Demo)
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="lg:col-span-5 w-full">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="bg-brand-surface p-8 border border-gray-100 lg:sticky lg:top-32"
                        >
                            <h2 className="text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray mb-8 pb-4 border-b border-gray-200">
                                Order Summary
                            </h2>

                            <div className="flex flex-col gap-6 mb-8 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex gap-4 items-center">
                                        <div className="w-16 h-20 bg-brand-light-gray shrink-0 relative">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            <span className="absolute -top-2 -right-2 bg-brand-black text-brand-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                                                {item.qty}
                                            </span>
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <span className="font-serif text-sm tracking-wide text-brand-black line-clamp-1">{item.name}</span>
                                            <span className="text-brand-dark-gray text-xs font-light">${Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                        </div>
                                        <span className="font-light tracking-wider text-brand-black text-sm">
                                            ${Number(item.qty * item.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4 mb-8 text-sm font-light text-brand-dark-gray pt-6 border-t border-gray-200">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>Complimentary</span>
                                </div>
                            </div>

                            <div className="flex justify-between pt-6 border-t border-brand-black text-lg font-light tracking-wider text-brand-black mb-10">
                                <span>Total to Pay</span>
                                <span>${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-brand-black text-brand-white py-5 uppercase text-xs tracking-[0.2em] font-light hover:bg-brand-gold transition-colors duration-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing Securely...' : `Place Order • $${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                            </button>
                        </motion.div>
                    </div>

                </form>
            </div>
        </motion.div>
    );
};

export default Checkout;
