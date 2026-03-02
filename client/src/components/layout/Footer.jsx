import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-secondary)', paddingTop: 'var(--space-96)', paddingBottom: 'var(--space-32)' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-64)', marginBottom: 'var(--space-64)' }}>

                    <div>
                        <Link to="/" style={{ fontFamily: 'var(--font-family-serif)', fontSize: '2rem', letterSpacing: '0.05em', display: 'block', marginBottom: 'var(--space-24)' }}>
                            Luxe Gems
                        </Link>
                        <p style={{ color: 'var(--color-text-light)', lineHeight: '1.8', maxWidth: '300px' }}>
                            Crafting extraordinary pieces that capture life's brilliance. Our commitment to sustainable luxury redefines the modern standard of high jewelry.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-24)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Shop</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
                            <li><Link to="/shop?category=Rings" style={{ color: 'var(--color-text-light)' }} className="nav-link">Rings</Link></li>
                            <li><Link to="/shop?category=Necklaces" style={{ color: 'var(--color-text-light)' }} className="nav-link">Necklaces</Link></li>
                            <li><Link to="/shop?category=Earrings" style={{ color: 'var(--color-text-light)' }} className="nav-link">Earrings</Link></li>
                            <li><Link to="/shop?category=Bracelets" style={{ color: 'var(--color-text-light)' }} className="nav-link">Bracelets</Link></li>
                            <li><Link to="/shop" style={{ color: 'var(--color-text-light)' }} className="nav-link">All Collections</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-24)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Assistance</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
                            <li><Link to="#" style={{ color: 'var(--color-text-light)' }} className="nav-link">Contact Us</Link></li>
                            <li><Link to="#" style={{ color: 'var(--color-text-light)' }} className="nav-link">Shipping & Returns</Link></li>
                            <li><Link to="#" style={{ color: 'var(--color-text-light)' }} className="nav-link">Care Guide</Link></li>
                            <li><Link to="#" style={{ color: 'var(--color-text-light)' }} className="nav-link">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-24)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Join The Insider</h4>
                        <p style={{ color: 'var(--color-text-light)', marginBottom: 'var(--space-16)' }}>Receive exclusive access to new collections and events.</p>
                        <form style={{ display: 'flex', borderBottom: '1px solid var(--color-text-light)' }}>
                            <input
                                type="email"
                                placeholder="Email Address"
                                style={{
                                    flex: 1,
                                    padding: 'var(--space-16) 0',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    outline: 'none'
                                }}
                                required
                            />
                            <button type="submit" style={{ padding: '0 var(--space-8)', color: 'white', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                                Subscribe
                            </button>
                        </form>
                    </div>

                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 'var(--space-32)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-16)', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                    <p>&copy; {new Date().getFullYear()} Luxe Gems. All Rights Reserved.</p>
                    <div style={{ display: 'flex', gap: 'var(--space-24)' }}>
                        <Link to="#" className="nav-link">Privacy Policy</Link>
                        <Link to="#" className="nav-link">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
