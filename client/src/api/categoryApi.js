import axiosInstance from './axiosInstance';

export const getCategories = () => axiosInstance.get('/categories');
export const createCategory = (categoryData) => axiosInstance.post('/categories', categoryData);
export const deleteCategory = (id) => axiosInstance.delete(`/categories/${id}`);
