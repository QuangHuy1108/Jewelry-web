import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
    const [orderNumber, setOrderNumber] = useState('');

    useEffect(() => {
        // Generate a sophisticated looking mock order number
        const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
        const datePart = new Date().getFullYear().toString().slice(-2) + (new Date().getMonth() + 1).toString().padStart(2, '0');
        setOrderNumber(`LG-${datePart}-${randomString}`);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="pt-40 pb-32 px-6 md:px-12 bg-brand-white min-h-screen flex flex-col items-center justify-center"
        >
            <div className="max-w-2xl w-full text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                    className="flex justify-center mb-10"
                >
                    <CheckCircle strokeWidth={0.5} size={80} className="text-brand-gold" />
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="font-serif text-4xl md:text-5xl text-brand-black mb-6 tracking-wide"
                >
                    Thank You
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-brand-dark-gray font-light text-base md:text-lg mb-12 leading-relaxed"
                >
                    Your order has been placed seamlessly. We are preparing your pieces with the utmost care. A confirmation email has been dispatched to you.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="p-8 border border-gray-200 bg-brand-surface mb-12"
                >
                    <p className="text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray mb-2">Order Reference</p>
                    <p className="font-serif text-2xl tracking-widest text-brand-black">{orderNumber}</p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <Link
                        to="/shop"
                        className="inline-block bg-brand-black text-brand-white px-12 py-5 uppercase text-xs tracking-[0.2em] font-light hover:bg-brand-gold transition-colors duration-500"
                    >
                        Continue Exploring
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default OrderSuccess;
