import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { motion, AnimatePresence } from 'framer-motion';
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
        }
    };

    const toggleMode = () => {
        setIsRegisterMode(!isRegisterMode);
        setName('');
        setEmail('');
        setPassword('');
    };

    const inputClasses = "w-full py-4 bg-transparent border-b border-gray-300 text-brand-black font-light text-sm focus:outline-none focus:border-brand-black transition-colors rounded-none placeholder:text-gray-400";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex"
        >
            {/* Left side: Lifestyle Image */}
            <div className="hidden md:block md:w-1/2 relative bg-brand-light-gray">
                <img
                    src="https://images.unsplash.com/photo-1599643477874-c4a6a5bc3fbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Luxury Jewelry"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Right side: Login Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 bg-brand-surface pt-24 pb-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isRegisterMode ? 'register' : 'login'}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-md w-full mx-auto"
                    >
                        <header className="mb-12">
                            <h1 className="font-serif text-3xl md:text-4xl text-brand-black mb-4">
                                {isRegisterMode ? 'Client Registration' : 'Client Login'}
                            </h1>
                            <p className="font-light text-brand-dark-gray text-sm leading-relaxed">
                                {isRegisterMode
                                    ? 'Register to access exclusive collections and manage your jewelry orders.'
                                    : 'Sign in to access your secure client portal and manage your orders.'}
                            </p>
                        </header>

                        {error && (
                            <div className="mb-8 p-4 bg-red-50 text-red-600 text-sm font-light text-center border border-red-100">
                                {error}
                            </div>
                        )}

                        <form onSubmit={submitHandler} className="flex flex-col gap-8">
                            {isRegisterMode && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="flex flex-col"
                                >
                                    <label className="text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className={inputClasses}
                                        placeholder="Enter your full name"
                                    />
                                </motion.div>
                            )}

                            <div className="flex flex-col">
                                <label className="text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={inputClasses}
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="flex flex-col">
                                <div className="flex justify-between items-baseline mb-2">
                                    <label className="text-xs uppercase tracking-[0.2em] font-light text-brand-dark-gray">Password</label>
                                    {!isRegisterMode && (
                                        <Link to="#" className="text-xs font-light text-brand-dark-gray underline decoration-1 underline-offset-4 hover:text-brand-black transition-colors">
                                            Forgot?
                                        </Link>
                                    )}
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={isRegisterMode ? 6 : undefined}
                                    className={inputClasses}
                                    placeholder="Enter your password"
                                />
                            </div>

                            <Button
                                type="submit"
                                isLoading={isLoading}
                                className="w-full mt-4"
                            >
                                {isRegisterMode ? 'Create Account' : 'Sign In'}
                            </Button>
                        </form>

                        <div className="mt-12 text-center text-sm font-light text-brand-dark-gray">
                            {isRegisterMode ? 'Already have an account?' : 'New to our boutique?'}
                            {' '}
                            <button
                                onClick={toggleMode}
                                className="text-brand-black underline decoration-1 underline-offset-4 hover:text-brand-gold transition-colors ml-2"
                            >
                                {isRegisterMode ? 'Sign In' : 'Register Here'}
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Login;
