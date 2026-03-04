import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
    persist(
        (set, get) => ({
            wishlistItems: [],

            toggleWishlist: (product) => {
                const currentItems = get().wishlistItems;
                const exists = currentItems.find((item) => item._id === product._id);

                if (exists) {
                    set({
                        wishlistItems: currentItems.filter((item) => item._id !== product._id),
                    });
                } else {
                    set({ wishlistItems: [...currentItems, product] });
                }
            },

            isInWishlist: (productId) => {
                return get().wishlistItems.some((item) => item._id === productId);
            }
        }),
        {
            name: 'luxe-wishlist-storage',
        }
    )
);
