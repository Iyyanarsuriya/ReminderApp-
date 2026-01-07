import axios from './axiosInstance';

export const getMemberRoles = () => axios.get('/member-roles');
export const createMemberRole = (data) => axios.post('/member-roles', data);
export const deleteMemberRole = (id) => axios.delete(`/member-roles/${id}`);
