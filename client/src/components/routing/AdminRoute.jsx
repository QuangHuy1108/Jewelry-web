import { Navigate } from 'react-router-dom';
import { useUserStore } from '../../store';

const AdminRoute = ({ children }) => {
    const { user, isAuthenticated } = useUserStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!user || user.isAdmin !== true) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
