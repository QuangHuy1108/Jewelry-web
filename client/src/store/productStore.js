import { create } from 'zustand';
import { getAllProducts } from '../services/productService';
import api from '../services/api';

export const useProductStore = create((set) => ({
    products: [],
    isLoading: false,
    error: null,
    fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
            const products = await getAllProducts();
            set({ products, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
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
