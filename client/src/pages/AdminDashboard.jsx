import { Package, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import AdminNav from '../components/layout/AdminNav';

const AdminDashboard = () => {
    const stats = [
        { title: 'Total Revenue', value: '$124,500.00', icon: DollarSign, trend: '+12.5%' },
        { title: 'Total Orders', value: '84', icon: ShoppingBag, trend: '+5.2%' },
        { title: 'Total Products', value: '142', icon: Package, trend: 'Updated today' },
    ];

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="font-serif text-3xl md:text-5xl text-brand-black mb-4">Command Center</h1>
                    <p className="text-xs uppercase tracking-widest text-brand-dark-gray font-light">Overview & Analytics</p>
                </header>

                <AdminNav activeTab="dashboard" />

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="p-8 border border-gray-200 bg-gray-50 flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <p className="text-xs uppercase tracking-widest text-brand-dark-gray font-light">{stat.title}</p>
                                <stat.icon size={20} strokeWidth={1} className="text-brand-black" />
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl text-brand-black mb-4">{stat.value}</h2>
                            <div className="flex items-center gap-2 text-xs text-brand-dark-gray font-light mt-auto">
                                {stat.trend.startsWith('+') && <TrendingUp size={14} className="text-green-600" />}
                                <span>{stat.trend}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Sales Chart Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="border border-gray-200 bg-gray-50 p-8 pt-10"
                >
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="font-serif text-xl md:text-2xl text-brand-black">Revenue Overview</h2>
                        <select className="bg-transparent border-b border-gray-300 text-xs uppercase tracking-widest text-brand-black font-light focus:outline-none pb-1 pr-4 appearance-none cursor-pointer">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>This Year</option>
                        </select>
                    </div>

                    <div className="h-[400px] w-full flex items-center justify-center border border-dashed border-gray-300 relative">
                        {/* Decorative Chart Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between p-8 opacity-20">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <div key={i} className="w-full h-px bg-brand-dark-gray"></div>
                            ))}
                        </div>
                        <div className="flex items-end h-full w-full px-12 pt-16 gap-4 z-10 opacity-60">
                            <div className="w-full bg-brand-black h-[40%] transition-all hover:opacity-80"></div>
                            <div className="w-full bg-brand-black h-[60%] transition-all hover:opacity-80"></div>
                            <div className="w-full bg-brand-black h-[30%] transition-all hover:opacity-80"></div>
                            <div className="w-full bg-brand-black h-[80%] transition-all hover:opacity-80"></div>
                            <div className="w-full bg-brand-black h-[50%] transition-all hover:opacity-80"></div>
                            <div className="w-full bg-brand-black h-[90%] transition-all hover:opacity-80"></div>
                            <div className="w-full bg-brand-black h-[70%] transition-all hover:opacity-80"></div>
                        </div>
                        <p className="absolute text-brand-dark-gray text-xs uppercase tracking-widest font-light bg-gray-50 px-4 py-2 z-20">
                            Interactive Chart Component Required
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;
