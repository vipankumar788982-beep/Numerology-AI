import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data)
};

export const reportAPI = {
  generate: (data) => api.post('/reports/generate', data),
  getByShareId: (shareId) => api.get(`/reports/share/${shareId}`),
  getUserReports: () => api.get('/reports/user')
};

export const adminAPI = {
  getInterpretations: (language) => api.get(`/admin/interpretations/${language}`),
  updateInterpretations: (language, data) => api.put(`/admin/interpretations/${language}`, data)
};

export default api;
