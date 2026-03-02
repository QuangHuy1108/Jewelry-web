import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCartStore } from '../store';
import { fetchProductById } from '../services/productService';
import { Heart, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import Button from '../components/ui/Button';

const ProductDetail = () => {
    const { id } = useParams();
    const addToCart = useCartStore(state => state.addToCart);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true);
                const data = await fetchProductById(id);
                setProduct({
                    ...data,
                    // Mocking multiple images for gallery
                    images: [
                        data.image || 'https://images.unsplash.com/photo-1605100804763-247f6613d28e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1605100804763-247f6613d28e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sat=-100',
                        'https://images.unsplash.com/photo-1599643478524-fb66f7f2b184?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                    ]
                });
            } catch (err) {
                setError(err.message);
                // Luxury Mock Fallback
                setProduct({
                    _id: id,
                    name: 'Solitaire Diamond Ring',
                    price: 4999.00,
                    description: 'A masterpiece of modern design, featuring a flawless brilliant-cut diamond set in polished 18k white gold. The delicate four-prong setting maximizes light return, ensuring unparalleled sparkle from every angle.',
                    material: '18k White Gold',
                    stock: 5,
                    images: [
                        'https://images.unsplash.com/photo-1605100804763-247f6613d28e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                        'https://images.unsplash.com/photo-1605100804763-247f6613d28e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80&sat=-100',
                        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
                    ],
                    details: ['Carat: 1.50ct', 'Color: D', 'Clarity: VVS1', 'Cut: Excellent']
                });
            } finally {
                setLoading(false);
            }
        };
        getProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, qty);
        // Ideally, open the Cart drawer here
    };

    if (loading) return <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    if (!product) return <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Product Not Found</div>;

    return (
        <div className="animate-fade-in page-transition-enter-active" style={{ paddingTop: 'calc(var(--header-height) + var(--space-32))', paddingBottom: 'var(--space-96)' }}>

            {/* Breadcrumb */}
            <div className="container" style={{ marginBottom: 'var(--space-24)', fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <Link to="/">Home</Link> <span style={{ margin: '0 8px' }}>/</span> <Link to="/shop">Shop</Link> <span style={{ margin: '0 8px' }}>/</span> <span style={{ color: 'var(--color-text-main)' }}>{product.name}</span>
            </div>

            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--space-64)' }}>

                    {/* Image Gallery */}
                    <div style={{ display: 'flex', gap: 'var(--space-16)', flexDirection: 'row-reverse' }}>
                        <div style={{ flex: 1, backgroundColor: 'var(--color-surface)', position: 'relative', overflow: 'hidden' }}>
                            <img
                                src={product.images[activeImage]}
                                alt={product.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.4s ease' }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)', width: '80px' }}>
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    style={{
                                        width: '100%',
                                        aspectRatio: '3/4',
                                        border: activeImage === i ? '1px solid var(--color-primary)' : '1px solid transparent',
                                        padding: '2px',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <img src={img} alt={`${product.name} ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', padding: 'var(--space-24) 0' }} className="animate-slide-up">
                        <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-16)', letterSpacing: '0.02em', fontWeight: 400 }}>{product.name}</h1>
                        <p style={{ fontSize: '1.5rem', marginBottom: 'var(--space-24)' }}>${product.price.toFixed(2)}</p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-32)', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', color: 'var(--color-primary)' }}>
                                {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" stroke="none" />)}
                            </div>
                            <span>(48 Reviews)</span>
                        </div>

                        <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: 'var(--space-32)' }}>
                            {product.description}
                        </p>

                        <div style={{ marginBottom: 'var(--space-32)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-8)' }}>
                                <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>Size</span>
                                <Link to="#" style={{ textDecoration: 'underline', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Size Guide</Link>
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--space-16)' }}>
                                {['5', '6', '7', '8', '9'].map(size => (
                                    <button key={size} style={{ width: '40px', height: '40px', border: '1px solid var(--color-border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }} onMouseOver={e => e.currentTarget.style.borderColor = 'var(--color-primary)'} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--color-border)'}>{size}</button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: 'var(--space-16)', marginBottom: 'var(--space-48)' }}>
                            {product.stock > 0 ? (
                                <>
                                    <div style={{ display: 'flex', border: '1px solid var(--color-border)', width: '120px' }}>
                                        <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ flex: 1, padding: 'var(--space-16) 0' }}>-</button>
                                        <span style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{qty}</span>
                                        <button onClick={() => setQty(Math.min(product.stock, qty + 1))} style={{ flex: 1, padding: 'var(--space-16) 0' }}>+</button>
                                    </div>
                                    <Button variant="primary" onClick={handleAddToCart} style={{ flex: 2, padding: 'var(--space-16)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Add to Bag</Button>
                                    <button style={{ width: '60px', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }} onMouseOver={e => e.currentTarget.style.borderColor = 'var(--color-primary)'} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--color-border)'}>
                                        <Heart strokeWidth={1.5} />
                                    </button>
                                </>
                            ) : (
                                <Button variant="secondary" style={{ width: '100%', padding: 'var(--space-16)', textTransform: 'uppercase' }} disabled>Out of Stock</Button>
                            )}
                        </div>

                        {/* Trust Badges */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)', paddingTop: 'var(--space-32)', borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-16)' }}><Truck size={20} strokeWidth={1.5} /> Complimentary Express Shipping</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-16)' }}><RotateCcw size={20} strokeWidth={1.5} /> 30-Day Complimentary Returns</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-16)' }}><ShieldCheck size={20} strokeWidth={1.5} /> Lifetime Warranty on Craftsmanship</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
