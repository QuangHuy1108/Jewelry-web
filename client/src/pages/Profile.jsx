import { useEffect, useState } from 'react';
import { useUserStore } from '../store/userStore';
import { getMyOrders } from '../services/orderService';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, isAuthenticated } = useUserStore();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isAuthenticated && !user) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const data = await getMyOrders();
                setOrders(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [isAuthenticated, user, navigate]);

    if (!user) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto min-h-screen"
        >
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-3xl md:text-5xl font-serif mb-12 border-b border-gray-200 pb-6 text-brand-black tracking-wide"
            >
                Client Portal
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="md:col-span-4 lg:col-span-3 border-r border-gray-100 pr-8"
                >
                    <div className="mb-10">
                        <h2 className="text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray pb-4 mb-4 border-b border-gray-100">
                            Account Details
                        </h2>
                        <p className="text-brand-black font-serif text-lg tracking-wide mb-1">{user.name}</p>
                        <p className="text-brand-dark-gray font-light text-sm">{user.email}</p>
                    </div>
                    {user.isAdmin && (
                        <div className="p-4 bg-brand-surface border border-gray-100 mt-4">
                            <span className="text-xs uppercase tracking-[0.2em] font-light text-brand-gold">Admin Privileges</span>
                        </div>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="md:col-span-8 lg:col-span-9"
                >
                    <h2 className="text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray pb-4 mb-8 border-b border-gray-100">
                        Order History
                    </h2>

                    {loading ? (
                        <div className="text-brand-dark-gray font-light text-sm tracking-wide py-8">Retrieving your orders...</div>
                    ) : error ? (
                        <div className="text-red-500 font-light text-sm py-8 border border-red-100 bg-red-50 px-4">
                            {error}
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="bg-brand-surface p-12 text-center border border-gray-100">
                            <p className="mb-6 font-light text-brand-dark-gray">Your order history is currently empty.</p>
                            <button
                                onClick={() => navigate('/shop')}
                                className="text-xs uppercase tracking-[0.2em] font-light border-b border-brand-black pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors"
                            >
                                Discover Collections
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto scrollbar-thin">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 font-light text-xs uppercase tracking-[0.2em] text-brand-dark-gray w-1/4">Order No.</th>
                                        <th className="py-4 font-light text-xs uppercase tracking-[0.2em] text-brand-dark-gray w-1/4">Date</th>
                                        <th className="py-4 font-light text-xs uppercase tracking-[0.2em] text-brand-dark-gray w-1/4">Total Amount</th>
                                        <th className="py-4 font-light text-xs uppercase tracking-[0.2em] text-brand-dark-gray w-1/4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id} className="border-b border-gray-100 hover:bg-brand-surface transition-colors">
                                            <td className="py-6 text-sm font-light text-brand-black tracking-wider uppercase">
                                                {order._id.substring(0, 8)}
                                            </td>
                                            <td className="py-6 text-sm font-light text-brand-dark-gray">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </td>
                                            <td className="py-6 text-sm font-light text-brand-black tracking-wider">
                                                ${order.totalPrice.toFixed(2)}
                                            </td>
                                            <td className="py-6">
                                                <span className={`text-xs uppercase tracking-widest font-light ${order.isDelivered ? 'text-brand-dark-gray' : 'text-brand-gold'}`}>
                                                    {order.isDelivered ? 'Delivered' : 'Processing'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Profile;
