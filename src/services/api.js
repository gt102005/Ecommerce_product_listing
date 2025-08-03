import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.in/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET all products
export const getAllProducts = () => api.get('/products');

// GET single product by ID
export const getProductById = (id) => api.get(`/products/${id}`);

export default api;
