import { Link } from 'react-router-dom';
import { useCartStore, useUIStore } from '../../store';
import { X, Trash2, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const CartDrawer = () => {
    const { cartItems, removeFromCart, addToCart } = useCartStore();
    const { isCartOpen, closeCart } = useUIStore();

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

    return (
        <>
            {/* Backdrop */}
            {isCartOpen && (
                <div
                    onClick={closeCart}
                    style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 999, transition: 'opacity 0.3s' }}
                    className="animate-fade-in"
                />
            )}

            {/* Drawer */}
            <div style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '100%',
                maxWidth: '450px',
                height: '100vh',
                backgroundColor: 'var(--color-background)',
                zIndex: 1000,
                transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ padding: 'var(--space-24)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Your Bag ({cartItems.length})</h2>
                    <button onClick={closeCart} style={{ color: 'var(--color-text-main)', display: 'flex' }} aria-label="Close cart">
                        <X size={24} strokeWidth={1.5} />
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-24)' }}>
                    {cartItems.length === 0 ? (
                        <div style={{ textAlign: 'center', marginTop: 'var(--space-64)' }}>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-24)' }}>Your bag is currently empty.</p>
                            <Button variant="primary" onClick={closeCart} style={{ width: '100%' }}>Continue Shopping</Button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
                            {cartItems.map((item) => (
                                <div key={item.product} style={{ display: 'flex', gap: 'var(--space-16)' }}>
                                    <Link to={`/product/${item.product}`} onClick={closeCart} style={{ flexShrink: 0 }}>
                                        <img src={item.image} alt={item.name} style={{ width: '100px', height: '120px', objectFit: 'cover' }} />
                                    </Link>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                                            <Link to={`/product/${item.product}`} onClick={closeCart} style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                                                {item.name}
                                            </Link>
                                            <button onClick={() => removeFromCart(item.product)} style={{ color: 'var(--color-text-light)' }}>
                                                <Trash2 size={18} strokeWidth={1.5} />
                                            </button>
                                        </div>
                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: 'auto' }}>${item.price.toFixed(2)}</p>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-16)', marginTop: 'var(--space-16)' }}>
                                            <div style={{ border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center' }}>
                                                <button onClick={() => addToCart(item, Math.max(1, item.qty - 1))} style={{ padding: '4px 12px', fontSize: '1.2rem' }}>-</button>
                                                <span style={{ padding: '0 12px', fontSize: '0.9rem' }}>{item.qty}</span>
                                                <button onClick={() => addToCart(item, item.qty + 1)} style={{ padding: '4px 12px', fontSize: '1.2rem' }}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div style={{ padding: 'var(--space-24)', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-16)', fontSize: '1.2rem', fontWeight: 600 }}>
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-24)' }}>Shipping, taxes, and discounts codes calculated at checkout.</p>
                        <Link to="/checkout" onClick={closeCart}>
                            <Button variant="primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'var(--space-8)' }}>
                                Checkout <ArrowRight size={18} />
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
