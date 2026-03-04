import { Link } from 'react-router-dom';

const AdminNav = ({ activeTab }) => {
    return (
        <nav className="flex space-x-8 md:space-x-12 border-b border-gray-200 mb-8 overflow-x-auto scrollbar-hide">
            <Link
                to="/admin"
                className={`pb-4 text-xs uppercase tracking-[0.2em] font-light whitespace-nowrap transition-colors ${activeTab === 'dashboard'
                    ? 'text-brand-black border-b border-brand-black'
                    : 'text-brand-dark-gray hover:text-brand-black cursor-pointer'
                    }`}
            >
                Dashboard
            </Link>
            <Link
                to="/admin/productlist"
                className={`pb-4 text-xs uppercase tracking-[0.2em] font-light whitespace-nowrap transition-colors ${activeTab === 'products'
                    ? 'text-brand-black border-b border-brand-black'
                    : 'text-brand-dark-gray hover:text-brand-black cursor-pointer'
                    }`}
            >
                Products
            </Link>
            <Link
                to="/admin/orderlist"
                className={`pb-4 text-xs uppercase tracking-[0.2em] font-light whitespace-nowrap transition-colors ${activeTab === 'orders'
                    ? 'text-brand-black border-b border-brand-black'
                    : 'text-brand-dark-gray hover:text-brand-black cursor-pointer'
                    }`}
            >
                Orders
            </Link>
        </nav>
    );
};

export default AdminNav;
