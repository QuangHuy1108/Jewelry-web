import { create } from 'zustand';
import { getAllProducts } from '../services/productService';
import api from '../services/api';

export const useProductStore = create((set) => ({
    products: [],
    isLoading: false,
    error: null,
    fetchProducts: async (queryString = '') => {
        set({ isLoading: true, error: null });
        try {
            const products = await getAllProducts(queryString);
            set({ products, isLoading: false });
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            set({ error: errorMessage, isLoading: false });
        }
    },
    createReview: async (productId, review) => {
        try {
            await api.post(`/products/${productId}/reviews`, review);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            };
        }
    }
}));
