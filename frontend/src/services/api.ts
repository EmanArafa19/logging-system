import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (data: { username: string; email: string; password: string }) =>
  api.post('/users/register', data);

export const login = (data: { email: string; password: string }) =>
  api.post('/users/login', data);

export const logout = () => api.post('/users/logout');

export const getApiKey = () => api.get('/users/me/api-key');

// Applications APIs
export const getApplications = () => api.get('/applications');

export const createApplication = (name: string) => api.post('/applications', { name });

export const deleteApplication = (name: string) => api.delete(`/applications/${name}`);

// Logs APIs
export const getLogs = (appName: string, params: {
  page?: number;
  limit?: number;
  sort?: 'recent' | 'count';
  level?: 'INFO' | 'WARN' | 'ERROR' | '';
  search?: string;
}) => api.get(`/applications/${appName}/logs`, { params });

export default api;