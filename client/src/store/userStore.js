import { create } from 'zustand';

export const useUserStore = create((set) => ({
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    setUserInfo: (data) => {
        localStorage.setItem('userInfo', JSON.stringify(data));
        set({ userInfo: data });
    },
    logout: () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        set({ userInfo: null });
    }
}));
