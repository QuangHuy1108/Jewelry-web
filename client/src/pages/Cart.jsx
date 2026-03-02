import { Link } from 'react-router-dom';
import { useCartStore } from '../store';
import Button from '../components/ui/Button';
import { Trash2, ArrowRight } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, addToCart, clearCart } = useCartStore();

    if (cartItems.length === 0) {
        return (
            <div className="animate-fade-in page-transition-enter-active" style={{ paddingTop: 'calc(var(--header-height) + var(--space-64))', paddingBottom: 'var(--space-96)', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-24)', fontWeight: 400 }}>Your Shopping Bag</h1>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-32)' }}>Your bag is empty.</p>
                <Link to="/shop">
                    <Button variant="primary" style={{ padding: 'var(--space-16) var(--space-48)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Return to Shop</Button>
                </Link>
            </div>
        );
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

    return (
        <div className="animate-fade-in page-transition-enter-active" style={{ paddingTop: 'calc(var(--header-height) + var(--space-64))', paddingBottom: 'var(--space-96)' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-48)', fontWeight: 400, textAlign: 'center' }}>Your Shopping Bag</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 'var(--space-64)', alignItems: 'start' }}>

                    {/* Items List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-32)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-16)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>
                            <span>Item</span>
                            <span style={{ width: '150px', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Qty</span>
                                <span>Total</span>
                            </span>
                        </div>
                        {cartItems.map((item) => (
                            <div key={item.product} className="animate-slide-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 'var(--space-32)', borderBottom: '1px solid var(--color-border)' }}>
                                <div style={{ display: 'flex', gap: 'var(--space-24)', alignItems: 'center', flex: 1 }}>
                                    <Link to={`/product/${item.product}`}>
                                        <img src={item.image} alt={item.name} style={{ width: '100px', height: '120px', objectFit: 'cover' }} />
                                    </Link>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Link to={`/product/${item.product}`} style={{ fontSize: '1.1rem', marginBottom: 'var(--space-8)' }}>{item.name}</Link>
                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>${item.price.toFixed(2)}</p>
                                        <button onClick={() => removeFromCart(item.product)} style={{ alignSelf: 'flex-start', color: 'var(--color-text-light)', marginTop: 'var(--space-16)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Trash2 size={14} /> Remove
                                        </button>
                                    </div>
                                </div>

                                <div style={{ width: '150px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', border: '1px solid var(--color-border)', width: '80px' }}>
                                        <button onClick={() => addToCart(item, Math.max(1, item.qty - 1))} style={{ flex: 1, padding: '4px 0' }}>-</button>
                                        <span style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>{item.qty}</span>
                                        <button onClick={() => addToCart(item, item.qty + 1)} style={{ flex: 1, padding: '4px 0' }}>+</button>
                                    </div>
                                    <span style={{ fontWeight: 600 }}>${(item.qty * item.price).toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="animate-slide-up" style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--space-32)' }}>
                        <h2 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-24)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Order Summary</h2>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-16)', color: 'var(--color-text-muted)' }}>
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-24)', color: 'var(--color-text-muted)' }}>
                            <span>Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 'var(--space-24)', borderTop: '1px solid var(--color-border)', fontSize: '1.2rem', fontWeight: 600, marginBottom: 'var(--space-32)' }}>
                            <span>Total</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <Link to="/checkout" style={{ display: 'block' }}>
                            <Button variant="primary" style={{ width: '100%', padding: 'var(--space-16)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'var(--space-8)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                Proceed to Checkout <ArrowRight size={18} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
