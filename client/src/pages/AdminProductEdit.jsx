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
        <div className="min-h-screen pt-32 px-6 md:px-12 bg-brand-light flex justify-center">
            <div className="w-full max-w-2xl bg-white p-8 shadow-sm">
                <h1 className="text-3xl font-serif text-brand-black mb-8 text-center uppercase tracking-widest">Edit Product</h1>

                {error && <div className="bg-red-50 text-red-600 p-4 text-center mb-6 text-sm">{error}</div>}

                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-black transition-colors"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Price ($)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-black transition-colors"
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Count In Stock</label>
                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(Number(e.target.value))}
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-black transition-colors"
                                required
                                min="0"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Image URL</label>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-black transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Category</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-black transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-black transition-colors min-h-[100px]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="w-full bg-brand-black text-brand-white py-4 uppercase tracking-widest text-sm hover:bg-brand-gold transition-colors disabled:opacity-50 mt-8"
                    >
                        {isUpdating ? 'Updating...' : 'Update Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminProductEdit;
