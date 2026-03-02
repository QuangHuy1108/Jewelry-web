import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

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
