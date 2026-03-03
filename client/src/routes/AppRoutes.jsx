import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Checkout from '../pages/Checkout';
import Profile from '../pages/Profile';
import AdminRoute from '../components/routing/AdminRoute';
import AdminProductList from '../pages/AdminProductList';
import AdminProductEdit from '../pages/AdminProductEdit';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/admin/productlist" element={
                <AdminRoute>
                    <AdminProductList />
                </AdminRoute>
            } />
            <Route path="/admin/product/:id/edit" element={
                <AdminRoute>
                    <AdminProductEdit />
                </AdminRoute>
            } />
        </Routes>
    );
};

export default AppRoutes;
