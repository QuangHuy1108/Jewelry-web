import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../store';
import { createProduct, deleteProduct } from '../services/productService';
import { Edit, Trash2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <div className="min-h-screen pt-32 px-6 md:px-12 bg-brand-light">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif text-brand-black">Products</h1>
                    <button
                        onClick={handleCreateProduct}
                        disabled={isCreating}
                        className="bg-brand-black text-brand-white px-6 py-2 uppercase tracking-widest text-sm hover:bg-brand-gold transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <Plus size={18} />
                        {isCreating ? 'Creating...' : 'Create Product'}
                    </button>
                </div>

                <div className="bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-sm uppercase tracking-wider text-gray-500">
                                    <th className="p-4 font-medium">ID</th>
                                    <th className="p-4 font-medium">Name</th>
                                    <th className="p-4 font-medium">Price</th>
                                    <th className="p-4 font-medium">Category</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        key={product._id}
                                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="p-4 text-sm font-mono text-gray-400">{product._id}</td>
                                        <td className="p-4 text-brand-black">{product.name}</td>
                                        <td className="p-4">${product.price.toFixed(2)}</td>
                                        <td className="p-4">{product.category}</td>
                                        <td className="p-4 text-right space-x-3">
                                            <button
                                                onClick={() => navigate(`/admin/product/${product._id}/edit`)}
                                                className="text-brand-black hover:text-brand-gold transition-colors inline-block"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product._id)}
                                                className="text-red-500 hover:text-red-700 transition-colors inline-block"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                        {products.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                                No products found. Create one to get started.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProductList;
