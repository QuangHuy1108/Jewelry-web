import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../store';
import { createProduct, deleteProduct } from '../services/productService';
import { Edit, Trash2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import AdminNav from '../components/layout/AdminNav';

const AdminProductList = () => {
    const { products, fetchProducts, isLoading } = useProductStore();
    const [isCreating, setIsCreating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleCreateProduct = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
            setIsCreating(true);
            try {
                const newProduct = await createProduct();
                navigate(`/admin/product/${newProduct._id}/edit`);
            } catch (error) {
                console.error('Error creating product:', error);
                alert('Failed to create product');
            } finally {
                setIsCreating(false);
            }
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                fetchProducts(); // Refresh the list
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
        }
    };

    if (isLoading && products.length === 0) {
        return <div className="min-h-screen pt-32 px-6 flex justify-center">Loading products...</div>;
    }

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-brand-white">
            <div className="max-w-7xl mx-auto">
                <AdminNav activeTab="products" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-gray-200 pb-6 gap-6 mt-8">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-serif text-brand-black tracking-wide mb-2">Inventory</h1>
                        <p className="text-sm font-light text-brand-dark-gray">Manage your exclusive jewelry collections</p>
                    </div>
                    <button
                        onClick={handleCreateProduct}
                        disabled={isCreating}
                        className="bg-brand-black text-brand-white px-8 py-4 uppercase tracking-[0.2em] text-xs font-light hover:bg-brand-gold transition-colors flex items-center gap-3 disabled:opacity-50"
                    >
                        <Plus strokeWidth={1} size={16} />
                        {isCreating ? 'Creating...' : 'New Product'}
                    </button>
                </div>

                <div className="bg-brand-surface border border-gray-100 relative">
                    <div className="overflow-x-auto scrollbar-thin">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="border-b border-gray-200 bg-brand-surface">
                                    <th className="py-6 px-6 font-light text-xs uppercase tracking-[0.2em] text-brand-dark-gray w-24">Image</th>
                                    <th className="py-6 px-6 font-light text-xs uppercase tracking-[0.2em] text-brand-dark-gray">Product Name</th>
                                    <th className="py-6 px-6 font-light text-xs uppercase tracking-[0.2em] text-brand-dark-gray">Category</th>
                                    <th className="py-6 px-6 font-light text-xs uppercase tracking-[0.2em] text-brand-dark-gray">Price</th>
                                    <th className="py-6 px-6 font-light text-xs uppercase tracking-[0.2em] text-brand-dark-gray">Stock</th>
                                    <th className="py-6 px-6 font-light text-xs uppercase tracking-[0.2em] text-brand-dark-gray text-right pr-8">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        key={product._id}
                                        className="border-b border-gray-100 hover:bg-white transition-colors group"
                                    >
                                        <td className="py-4 px-6">
                                            <div className="w-12 h-16 bg-brand-light-gray border border-gray-100 overflow-hidden relative">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-[10px] text-brand-dark-gray absolute inset-0 flex items-center justify-center">Img</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-light tracking-wide text-brand-black">{product.name}</td>
                                        <td className="py-4 px-6 text-xs uppercase tracking-widest font-light text-brand-dark-gray">{product.category}</td>
                                        <td className="py-4 px-6 text-sm font-light tracking-wider text-brand-black">${product.price.toFixed(2)}</td>
                                        <td className="py-4 px-6">
                                            <span className={`text-xs uppercase tracking-widest font-light ${product.stock > 0 ? 'text-brand-dark-gray' : 'text-red-500'}`}>
                                                {product.stock > 0 ? product.stock : 'Empty'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right pr-8 space-x-6">
                                            <button
                                                onClick={() => navigate(`/admin/product/${product._id}/edit`)}
                                                className="text-brand-dark-gray hover:text-brand-gold transition-colors inline-block"
                                                title="Edit"
                                            >
                                                <Edit strokeWidth={1} size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product._id)}
                                                className="text-brand-dark-gray hover:text-red-600 transition-colors inline-block"
                                                title="Delete"
                                            >
                                                <Trash2 strokeWidth={1} size={18} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                        {products.length === 0 && (
                            <div className="p-16 text-center text-sm font-light text-brand-dark-gray tracking-wide">
                                Your inventory is currently empty.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProductList;
