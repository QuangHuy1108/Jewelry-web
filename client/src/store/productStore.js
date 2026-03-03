import { create } from 'zustand';
import { getAllProducts } from '../services/productService';

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
    }
}));
