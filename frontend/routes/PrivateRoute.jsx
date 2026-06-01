import { Navigate } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';

export const PrivateRoute = ({ children }) => {
    const { authenticated, loading } = useAuth();

    if (loading) return <div>Carregando...</div>;

    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};