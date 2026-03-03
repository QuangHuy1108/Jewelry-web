import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import Button from '../components/ui/Button';

const Login = () => {
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const { user, isAuthenticated, isLoading, error, loginUser, registerUser } = useUserStore();
    const redirect = new URLSearchParams(location.search).get('redirect') ? `/${new URLSearchParams(location.search).get('redirect')}` : '/';

    useEffect(() => {
        if (isAuthenticated || user) {
            navigate(redirect);
        }
    }, [navigate, isAuthenticated, user, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (isRegisterMode) {
                await registerUser({ name, email, password });
                alert('Registration successful! Please log in with your new credentials.');
                setIsRegisterMode(false);
                setPassword('');
            } else {
                await loginUser({ email, password });
                navigate(redirect);
            }
        } catch (err) {
            // Error is handled by the store
            console.error('Authentication error:', err);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: 'var(--space-16)',
        border: 'none',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'transparent',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.3s ease',
        fontFamily: 'var(--font-family-main)'
    };

    const toggleMode = () => {
        setIsRegisterMode(!isRegisterMode);
        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="animate-fade-in page-transition-enter-active" style={{ height: '100vh', display: 'flex' }}>
            <div style={{ flex: 1, display: 'none', '@media (min-width: 768px)': { display: 'block' }, background: 'url("https://images.unsplash.com/photo-1599643477874-c4a6a5bc3fbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80") center/cover no-repeat' }}>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'var(--space-48)', backgroundColor: 'var(--color-surface)' }}>
                <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }} className="animate-slide-up">

                    <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-16)', fontWeight: 400, fontFamily: 'var(--font-family-serif)' }}>
                        {isRegisterMode ? 'Create Account' : 'Welcome Back'}
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-48)', lineHeight: 1.6 }}>
                        {isRegisterMode ? 'Please enter your details to create an exclusive client account.' : 'Please enter your details to access your exclusive client account.'}
                    </p>

                    {error && <div style={{ color: 'var(--color-error)', marginBottom: 'var(--space-24)', fontSize: '0.9rem' }}>{error}</div>}

                    <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-32)' }}>
                        {isRegisterMode && (
                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--space-8)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-light)' }}>Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    style={inputStyle}
                                    onFocus={(e) => e.target.style.borderBottomColor = 'var(--color-primary)'}
                                    onBlur={(e) => e.target.style.borderBottomColor = 'var(--color-border)'}
                                />
                            </div>
                        )}
                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--space-8)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-light)' }}>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={inputStyle}
                                onFocus={(e) => e.target.style.borderBottomColor = 'var(--color-primary)'}
                                onBlur={(e) => e.target.style.borderBottomColor = 'var(--color-border)'}
                            />
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-8)' }}>
                                <label style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-light)' }}>Password</label>
                                {!isRegisterMode && <Link to="#" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textDecoration: 'underline' }}>Forgot?</Link>}
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={inputStyle}
                                minLength={isRegisterMode ? 6 : undefined}
                                onFocus={(e) => e.target.style.borderBottomColor = 'var(--color-primary)'}
                                onBlur={(e) => e.target.style.borderBottomColor = 'var(--color-border)'}
                            />
                        </div>

                        <Button type="submit" variant="primary" disabled={isLoading} style={{ width: '100%', padding: 'var(--space-16)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 'var(--space-16)' }}>
                            {isLoading ? 'Processing...' : (isRegisterMode ? 'Sign Up' : 'Sign In')}
                        </Button>
                    </form>

                    <div style={{ marginTop: 'var(--space-48)', textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                        {isRegisterMode ? 'Already have an account?' : 'New to Luxe Gems?'}
                        {' '}
                        <button onClick={toggleMode} style={{ color: 'var(--color-primary)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', padding: 0 }}>
                            {isRegisterMode ? 'Sign In' : 'Create an Account'}
                        </button>
                    </div>
                </div>
            </div>
            <style>{`
                @media (max-width: 900px) {
                    .animate-fade-in > div:first-child { display: none !important; }
                }
            `}</style>
        </div>
    );
};

export default Login;
