import { useEffect, useState } from 'react';
import { useProductStore, useCartStore } from '../store';
import { fetchProducts } from '../services/productService';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import Button from '../components/ui/Button';

const Shop = () => {
    const { products, setProducts, loading, setLoading, setError } = useProductStore();
    const addToCart = useCartStore(state => state.addToCart);
    const [filter, setFilter] = useState('All');
    const [sort, setSort] = useState('newest');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                setError(err.message);
                // Luxury Mock Data
                setProducts([
                    { _id: '1', name: 'Solitaire Diamond Ring', price: 4999.00, category: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f6613d28e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', imageHover: 'https://images.unsplash.com/photo-1605100804763-247f6613d28e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sat=-100' },
                    { _id: '2', name: 'Emerald Cut Necklace', price: 8500.00, category: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478524-fb66f7f2b184?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', imageHover: 'https://images.unsplash.com/photo-1599643477874-c4a6a5bc3fbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                    { _id: '3', name: 'Sapphire Drop Earrings', price: 3200.00, category: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', imageHover: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sat=-100' },
                    { _id: '4', name: 'Rose Gold Tennis Bracelet', price: 6100.00, category: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', imageHover: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sat=-100' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, [setProducts, setLoading, setError]);

    const displayedProducts = products
        .filter(p => filter === 'All' ? true : p.category === filter)
        .sort((a, b) => {
            if (sort === 'price-asc') return a.price - b.price;
            if (sort === 'price-desc') return b.price - a.price;
            return 0; // newest etc.
        });

    return (
        <div className="animate-fade-in page-transition-enter-active" style={{ paddingTop: 'calc(var(--header-height) + var(--space-32))', paddingBottom: 'var(--space-96)' }}>
            <div className="container">
                <h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-24)', textAlign: 'center' }}>The Collection</h1>

                {/* Filters & Sorting */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-48)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-16)', flexWrap: 'wrap', gap: 'var(--space-16)' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-24)', overflowX: 'auto', paddingBottom: '4px' }}>
                        {['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                style={{
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    fontSize: '0.85rem',
                                    paddingBottom: '4px',
                                    borderBottom: filter === cat ? '1px solid var(--color-primary)' : '1px solid transparent',
                                    transition: 'border-color 0.3s ease'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-16)' }}>
                        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sort By</span>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            style={{ padding: 'var(--space-8)', border: 'none', borderBottom: '1px solid var(--color-border)', backgroundColor: 'transparent', outline: 'none', cursor: 'pointer' }}
                        >
                            <option value="newest">Newest Arrivals</option>
                            <option value="price-asc">Price (Low to High)</option>
                            <option value="price-desc">Price (High to Low)</option>
                        </select>
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div> : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-32)' }}>
                        {displayedProducts.map((p, index) => (
                            <div key={p._id} className={`product-card animate-slide-up stagger-${(index % 5) + 1}`}>
                                <div className="product-image-container" style={{ aspectRatio: '3/4', marginBottom: 'var(--space-16)' }}>
                                    <Link to={`/product/${p._id}`}>
                                        <img src={p.image} alt={p.name} className="primary-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <img src={p.imageHover || p.image} alt={`${p.name} alternate`} className="secondary-img" />
                                    </Link>

                                    <div className="quick-actions">
                                        <Button variant="secondary" style={{ padding: '0.5rem', flex: 1, backgroundColor: 'white', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '0.85rem', textTransform: 'uppercase' }} onClick={() => addToCart(p, 1)}>
                                            <ShoppingBag size={16} /> Add
                                        </Button>
                                    </div>
                                    <button style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--color-primary)', backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '50%', padding: '8px', display: 'flex', border: 'none', cursor: 'pointer' }} className="nav-link">
                                        <Heart size={18} strokeWidth={1.5} />
                                    </button>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-8)', fontWeight: '400' }}>
                                        <Link to={`/product/${p._id}`}>{p.name}</Link>
                                    </h3>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>${p.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
