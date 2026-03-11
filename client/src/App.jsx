import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

// Scroll to top on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Toaster position="top-center" toastOptions={{
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSize: '14px',
                    fontWeight: '300',
                    letterSpacing: '0.05em',
                    borderRadius: '0',
                    padding: '16px 24px'
                }
            }} />
            <Navbar />
            <CartDrawer />
            <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1 }}>
                    <AppRoutes />
                </div>
            </main>
            <Footer />
        </BrowserRouter>
    )
}

export default App;
