import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = () => axios.get(API_URL);
export const addUser = (userData) => axios.post(API_URL, userData);
export const editUser = (id, updatedData) => axios.put(`${API_URL}/${id}`, updatedData);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
