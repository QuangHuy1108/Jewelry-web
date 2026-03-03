import api from './api';

export const getAllProducts = async () => {
    const { data } = await api.get('/products');
    return data;
};

export const fetchProductById = async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
};

export const createProduct = async () => {
    const { data } = await api.post('/products', {});
    return data;
};

export const updateProduct = async (id, productData) => {
    const { data } = await api.put(`/products/${id}`, productData);
    return data;
};

export const deleteProduct = async (id) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
};
