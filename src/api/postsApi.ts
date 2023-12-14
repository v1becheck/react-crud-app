import axios from 'axios';

const apiBase = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = () => axios.get(apiBase);
export const fetchPost = (id: number) => axios.get(`${apiBase}/${id}`);
export const createPost = (data: object) => axios.post(apiBase, data);
export const updatePost = (id: number, data: object) =>
  axios.put(`${apiBase}/${id}`, data);
export const deletePost = (id: number) => axios.delete(`${apiBase}/${id}`);
