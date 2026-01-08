import axios from './axiosInstance';

export const getVehicleLogs = async () => {
    const response = await axios.get('/vehicle-logs');
    return response.data;
};

export const createVehicleLog = async (data) => {
    const response = await axios.post('/vehicle-logs', data);
    return response.data;
};

export const updateVehicleLog = async (id, data) => {
    const response = await axios.put(`/vehicle-logs/${id}`, data);
    return response.data;
};

export const deleteVehicleLog = async (id) => {
    const response = await axios.delete(`/vehicle-logs/${id}`);
    return response.data;
};
