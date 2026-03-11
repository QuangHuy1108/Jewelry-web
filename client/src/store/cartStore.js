import { create } from 'zustand';
import toast from 'react-hot-toast';

export const useCartStore = create((set, get) => ({
    cartItems: [],
    addToCart: (product) => {
        set((state) => {
            const existingItem = state.cartItems.find(x => x.product === product._id);
            if (!existingItem) {
                toast.success('Added to bag');
            }
            if (existingItem) {
                return {
                    cartItems: state.cartItems.map(x =>
                        x.product === existingItem.product ? { ...x, qty: x.qty + 1 } : x
                    )
                };
            } else {
                return {
                    cartItems: [...state.cartItems, { ...product, product: product._id, qty: 1 }]
                };
            }
        });
    },
    updateQuantity: (id, qty) => set((state) => ({
        cartItems: state.cartItems.map(x => x.product === id ? { ...x, qty } : x)
    })),
    removeFromCart: (id) => set((state) => {
        toast.success('Removed from bag');
        return {
            cartItems: state.cartItems.filter(x => x.product !== id)
        };
    }),
    clearCart: () => set({ cartItems: [] }),
}));
