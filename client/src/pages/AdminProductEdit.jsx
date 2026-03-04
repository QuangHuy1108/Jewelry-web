import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, updateProduct } from '../services/productService';

const AdminProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const product = await fetchProductById(id);
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setCategory(product.category);
                setDescription(product.description);
                setStock(product.stock || 0);
            } catch (err) {
                console.error(err);
                setError('Failed to load product details');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            loadProduct();
        }
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        setError('');
        try {
            await updateProduct(id, { name, price, image, category, description, stock });
            navigate('/admin/productlist');
        } catch (err) {
            console.error(err);
            setError('Failed to update product');
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen pt-32 px-6 flex justify-center">Loading product details...</div>;
    }

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-brand-white flex justify-center">
            <div className="w-full max-w-4xl bg-brand-surface p-8 sm:p-12 md:p-16 border border-gray-100">
                <header className="mb-12 border-b border-gray-200 pb-6">
                    <h1 className="text-3xl md:text-4xl font-serif text-brand-black tracking-wide">Edit Product</h1>
                    <p className="text-sm font-light text-brand-dark-gray mt-2">Update inventory details and specifications.</p>
                </header>

                {error && <div className="bg-red-50/50 border border-red-100 text-red-600 p-4 text-center mb-10 text-sm font-light tracking-wide">{error}</div>}

                <form onSubmit={submitHandler} className="space-y-12">
                    {/* Basic Information Section */}
                    <section>
                        <h2 className="text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray mb-6 pb-2 border-b border-gray-100">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray mb-2">Product Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-transparent border-b border-gray-300 py-3 text-sm font-light text-brand-black focus:outline-none focus:border-brand-black transition-colors placeholder:text-gray-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray mb-2">Category</label>
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-transparent border-b border-gray-300 py-3 text-sm font-light text-brand-black focus:outline-none focus:border-brand-black transition-colors placeholder:text-gray-400"
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    {/* Pricing & Inventory Section */}
                    <section>
                        <h2 className="text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray mb-6 pb-2 border-b border-gray-100">Pricing & Inventory</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray mb-2">Price ($)</label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    className="w-full bg-transparent border-b border-gray-300 py-3 text-sm font-light text-brand-black focus:outline-none focus:border-brand-black transition-colors placeholder:text-gray-400"
                                    required
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray mb-2">Count In Stock</label>
                                <input
                                    type="number"
                                    value={stock}
                                    onChange={(e) => setStock(Number(e.target.value))}
                                    className="w-full bg-transparent border-b border-gray-300 py-3 text-sm font-light text-brand-black focus:outline-none focus:border-brand-black transition-colors placeholder:text-gray-400"
                                    required
                                    min="0"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Media & Details Section */}
                    <section>
                        <h2 className="text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray mb-6 pb-2 border-b border-gray-100">Media & Details</h2>
                        <div className="space-y-8">
                            <div>
                                <label className="block text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray mb-2">Image URL</label>
                                <input
                                    type="text"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="w-full bg-transparent border-b border-gray-300 py-3 text-sm font-light text-brand-black focus:outline-none focus:border-brand-black transition-colors placeholder:text-gray-400"
                                    required
                                />
                                {image && (
                                    <div className="mt-6 w-24 h-32 bg-brand-light-gray border border-gray-100 overflow-hidden">
                                        <img src={image} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray mb-2">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full bg-transparent border-b border-gray-300 py-3 text-sm font-light text-brand-black focus:outline-none focus:border-brand-black transition-colors min-h-[120px] resize-y placeholder:text-gray-400"
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="pt-8 flex flex-col sm:flex-row justify-end gap-6 sm:gap-4 mt-12 bg-brand-surface sticky bottom-0 sm:static pb-4 sm:pb-0 z-10 border-t border-gray-200 sm:border-t-0">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/productlist')}
                            className="bg-transparent border border-gray-300 text-brand-black px-8 py-4 uppercase tracking-[0.2em] text-xs font-light hover:border-brand-black transition-colors text-center w-full sm:w-auto"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="bg-brand-black text-brand-white px-8 py-4 uppercase tracking-[0.2em] text-xs font-light hover:bg-brand-gold transition-colors disabled:opacity-50 text-center w-full sm:w-auto"
                        >
                            {isUpdating ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProductEdit;
