import api from './api';

export const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.token) {
        localStorage.setItem('token', data.token);
    }
    return data;
};

export const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    if (data.token) {
        localStorage.setItem('token', data.token);
    }
    return data;
};
