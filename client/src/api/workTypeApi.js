import axiosInstance from './axiosInstance';

export const getWorkTypes = async () => {
    return await axiosInstance.get('/work-types');
};

export const createWorkType = async (name) => {
    return await axiosInstance.post('/work-types', { name });
};

export const deleteWorkType = async (id) => {
    return await axiosInstance.delete(`/work-types/${id}`);
};
