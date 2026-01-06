import axiosInstance from './axiosInstance';

export const createWorkLog = (data) => axiosInstance.post('/work-logs', data);

export const getWorkLogs = (params) => axiosInstance.get('/work-logs', { params });

export const getMonthlyTotal = (params) => axiosInstance.get('/work-logs/monthly-total', { params });

export const updateWorkLog = (id, data) => axiosInstance.put(`/work-logs/${id}`, data);

export const deleteWorkLog = (id) => axiosInstance.delete(`/work-logs/${id}`);
