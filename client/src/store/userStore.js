import { create } from 'zustand';
import { login, register } from '../services/authService';
import { useCartStore } from './cartStore';

export const useUserStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('userInfo')) || null,
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,

    loginUser: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
            const data = await login(credentials);
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userInfo', JSON.stringify(data));
            }
            set({ user: data, isAuthenticated: true, isLoading: false, error: null });
            return data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed';
            set({ error: errorMessage, isLoading: false });
            throw new Error(errorMessage);
        }
    },

    registerUser: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            const data = await register(userData);
            // Registration successful! We just return the data now instead of logging in.
            set({ isLoading: false, error: null });
            return data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Registration failed';
            set({ error: errorMessage, isLoading: false });
            throw new Error(errorMessage);
        }
    },

    logout: () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        set({ user: null, isAuthenticated: false, error: null });
        // Clear cart to prevent items showing up for next user
        useCartStore.getState().clearCart();
    }
}));
