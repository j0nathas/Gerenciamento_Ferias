import { createContext, useState, useEffect, useContext } from 'react';
import api from '../../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkUser() {
            try {
                const response = await api.get('/auth/me');
                setUser(response.data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        checkUser();
    }, []);

    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        setUser(response.data);
    };

    const register = async (name, email, password) => {
        const response = await api.post('/auth/register', { name, email, password });
        setUser(response.data);
    };

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, authenticated: !!user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);