import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '../services/orderService';
import { motion } from 'framer-motion';
import AdminNav from '../components/layout/AdminNav';

const AdminOrderList = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getAllOrders();
                setOrders(data);
            } catch (error) {
                // Silently handle or add toast
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusStyle = (isDelivered) => {
        if (isDelivered) {
            return "bg-green-50 text-green-700 border-green-200";
        }
        return "bg-gray-50 text-brand-dark-gray border-gray-200";
    };

    if (isLoading) {
        return <div className="min-h-screen pt-32 px-6 flex justify-center text-sm font-light uppercase tracking-widest text-brand-dark-gray">Loading orders...</div>;
    }

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-brand-white">
            <div className="max-w-7xl mx-auto">
                <AdminNav activeTab="orders" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-gray-200 pb-6 gap-6 mt-8">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-serif text-brand-black tracking-wide mb-2">Orders</h1>
                        <p className="text-sm font-light text-brand-dark-gray">Manage customer purchases and fulfillments</p>
                    </div>
                </div>

                <div className="bg-brand-surface border border-gray-100 relative">
                    <div className="overflow-x-auto scrollbar-thin">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="border-b border-gray-200 bg-brand-surface">
                                    <th className="py-6 px-6 font-light text-xs uppercase tracking-[0.2em] text-brand-dark-gray">Order ID</th>
                                    <th className="py-6 px-6 font-light text-xs uppercase tracking-[0.2em] text-brand-dark-gray">Customer</th>
                                    <th className="py-6 px-6 font-light text-xs uppercase tracking-[0.2em] text-brand-dark-gray">Date</th>
                                    <th className="py-6 px-6 font-light text-xs uppercase tracking-[0.2em] text-brand-dark-gray">Total</th>
                                    <th className="py-6 px-6 font-light text-xs uppercase tracking-[0.2em] text-brand-dark-gray text-right pr-8">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        key={order._id}
                                        className="border-b border-gray-100 hover:bg-white transition-colors group"
                                    >
                                        <td className="py-4 px-6 text-sm font-mono text-gray-400">{order._id.substring(18, 24).toUpperCase()}</td>
                                        <td className="py-4 px-6 text-sm font-light tracking-wide text-brand-black">{order.user ? order.user.name : 'Guest'}</td>
                                        <td className="py-4 px-6 text-sm font-light tracking-wide text-brand-black">{new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                        <td className="py-4 px-6 text-sm font-light tracking-wider text-brand-black">${order.totalPrice.toFixed(2)}</td>
                                        <td className="py-4 px-6 text-right pr-8">
                                            <span className={`inline-block px-3 py-1 rounded-sm text-[10px] uppercase tracking-[0.15em] border ${getStatusStyle(order.isDelivered)}`}>
                                                {order.isDelivered ? 'Delivered' : 'Pending'}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                        {orders.length === 0 && (
                            <div className="p-16 text-center text-sm font-light text-brand-dark-gray tracking-wide">
                                No orders found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderList;
