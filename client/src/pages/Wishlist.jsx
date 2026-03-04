import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store';
import ProductCard from '../components/ui/ProductCard';

const Wishlist = () => {
    const { wishlistItems } = useWishlistStore();

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-brand-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-gray-200 pb-6 gap-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-serif text-brand-black tracking-wide mb-2">Wishlist</h1>
                        <p className="text-sm font-light text-brand-dark-gray">Your curated selection of fine jewelry</p>
                    </div>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-brand-surface border border-gray-100">
                        <p className="text-base font-light text-brand-dark-gray mb-8">Your wishlist is currently empty.</p>
                        <Link
                            to="/shop"
                            className="bg-brand-black text-brand-white px-8 py-4 uppercase tracking-[0.2em] text-xs font-light hover:bg-brand-gold transition-colors inline-block"
                        >
                            Discover Collections
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                        {wishlistItems.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
