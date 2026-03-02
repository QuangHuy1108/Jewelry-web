import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Home = () => {
    return (
        <div className="animate-fade-in page-transition-enter-active">
            {/* Hero Section */}
            <div style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1599643478524-fb66f7f2b184?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80") center/cover fixed',
                color: 'var(--color-secondary)',
                textAlign: 'center',
                paddingTop: 'var(--header-height)'
            }}>
                <div style={{ maxWidth: '800px', padding: 'var(--space-24)' }}>
                    <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 'var(--space-16)', fontSize: '0.9rem' }} className="animate-slide-up stagger-1">High Jewelry Collection</p>
                    <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: 'var(--space-24)' }} className="animate-slide-up stagger-2">Elegance Redefined</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: 'var(--space-32)', color: 'rgba(255,255,255,0.9)' }} className="animate-slide-up stagger-3">
                        Discover our exclusive collection of handcrafted pieces designed to make every moment unforgettable.
                    </p>
                    <div className="animate-slide-up stagger-4">
                        <Link to="/shop">
                            <Button variant="primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Explore Collection</Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Categories */}
            <div className="container" style={{ padding: 'var(--space-96) var(--space-24)', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-16)' }}>Discover by Category</h2>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-48)', maxWidth: '600px', margin: '0 auto var(--space-48)' }}>Explore our carefully curated selection of fine jewelry, categorized for your shopping pleasure.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-24)' }}>
                    {[
                        { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f6613d28e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                        { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643477874-c4a6a5bc3fbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                        { name: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
                    ].map(cat => (
                        <Link to={`/shop?category=${cat.name}`} key={cat.name} style={{ display: 'block', overflow: 'hidden', position: 'relative', height: '400px' }} className="product-card">
                            <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1.5s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                            <div style={{ position: 'absolute', bottom: 'var(--space-32)', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--color-secondary)', padding: 'var(--space-16) var(--space-48)', minWidth: '200px' }}>
                                <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cat.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Brand Story / Craftsmanship with parallax */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
                backgroundColor: 'var(--color-surface)',
                alignItems: 'center'
            }}>
                <div style={{ padding: 'var(--space-64) var(--space-48)', maxWidth: '600px', margin: '0 auto' }}>
                    <p style={{ textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-accent)', marginBottom: 'var(--space-16)', fontSize: '0.9rem', fontWeight: 'bold' }}>Our Heritage</p>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-24)' }}>Masterful Craftsmanship</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-32)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                        Since 1920, Luxe Gems has been synonymous with unparalleled elegance. Each piece is meticulously handcrafted by master artisans using ethically sourced diamonds and the finest precious metals. Our dedication to perfection ensures that your jewelry will be cherished for generations.
                    </p>
                    <Button variant="secondary" style={{ padding: '1rem 2.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Read Our Story</Button>
                </div>
                <div style={{ height: '600px', background: 'url("https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80") center/cover no-repeat' }}>
                </div>
            </div>
        </div>
    );
};

export default Home;
