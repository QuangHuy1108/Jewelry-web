import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
    cartItems: [],
    addToCart: (product, qty) => {
        set((state) => {
            const existingItem = state.cartItems.find(x => x.product === product._id);
            if (existingItem) {
                return {
                    cartItems: state.cartItems.map(x =>
                        x.product === existingItem.product ? { ...x, qty } : x
                    )
                };
            } else {
                return {
                    cartItems: [...state.cartItems, { ...product, product: product._id, qty }]
                };
            }
        });
    },
    removeFromCart: (id) => set((state) => ({
        cartItems: state.cartItems.filter(x => x.product !== id)
    })),
    clearCart: () => set({ cartItems: [] }),
}));
