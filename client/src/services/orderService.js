import api from './api';

export const placeOrder = async (orderData) => {
    const { data } = await api.post('/orders', orderData);
    return data;
};
