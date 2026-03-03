import { useEffect, useState } from 'react';
import { useUserStore } from '../store/userStore';
import { getMyOrders } from '../services/orderService';
import { useNavigate } from 'react-router-dom';

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
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto animate-fade-in">
            <h1 className="text-4xl font-serif mb-8 border-b pb-4">My Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 border-r pr-8">
                    <div className="mb-8">
                        <h2 className="text-sm uppercase tracking-widest text-brand-black mb-2 font-bold">Account Details</h2>
                        <p className="text-brand-black text-lg">{user.name}</p>
                        <p className="text-brand-gray text-sm">{user.email}</p>
                    </div>
                    {user.isAdmin && (
                        <div className="mt-4 p-4 bg-gray-50 border border-gray-100">
                            <span className="text-xs uppercase tracking-widest font-bold text-brand-gold">Admin Account</span>
                        </div>
                    )}
                </div>

                <div className="col-span-1 md:col-span-3">
                    <h2 className="text-2xl font-serif mb-6">Order History</h2>

                    {loading ? (
                        <div className="text-brand-gray text-sm tracking-widest uppercase py-8">Loading orders...</div>
                    ) : error ? (
                        <div className="text-red-500 text-sm py-4">{error}</div>
                    ) : orders.length === 0 ? (
                        <div className="bg-gray-50 p-8 text-center text-brand-gray">
                            <p className="mb-4 text-lg">You have no recent orders.</p>
                            <button onClick={() => navigate('/shop')} className="text-sm uppercase tracking-widest border-b border-brand-black pb-1 hover:text-brand-gold transition-colors">Start Shopping</button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 font-normal text-xs uppercase tracking-widest text-brand-gray">Order ID</th>
                                        <th className="py-4 font-normal text-xs uppercase tracking-widest text-brand-gray">Date</th>
                                        <th className="py-4 font-normal text-xs uppercase tracking-widest text-brand-gray">Total</th>
                                        <th className="py-4 font-normal text-xs uppercase tracking-widest text-brand-gray">Delivery Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="py-4 text-sm font-mono">{order._id.substring(0, 10)}...</td>
                                            <td className="py-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="py-4 text-sm">${order.totalPrice.toFixed(2)}</td>
                                            <td className="py-4">
                                                <span className={`text-xs px-2 py-1 rounded-full ${order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {order.isDelivered ? 'Delivered' : 'Processing'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
