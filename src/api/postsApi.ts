import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchPosts = () => axios.get(API_BASE);
export const fetchPost = (id: number) => axios.get(`${API_BASE}/${id}`);
export const createPost = (data: object) => axios.post(API_BASE, data);
export const updatePost = (id: number, data: object) =>
  axios.put(`${API_BASE}/${id}`, data);
export const deletePost = (id: number) => axios.delete(`${API_BASE}/${id}`);
