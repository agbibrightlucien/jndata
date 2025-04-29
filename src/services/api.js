import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Vendor API endpoints
export const vendorAPI = {
  register: (data) => api.post('/vendors/register', data),
  login: (data) => api.post('/vendors/login', data),
  getDashboard: () => api.get('/vendors/dashboard'),
  getOrders: () => api.get('/vendors/orders'),
  createOrder: (data) => api.post('/vendors/orders', data),
  requestWithdrawal: (data) => api.post('/vendors/withdrawals', data),
  getWithdrawals: () => api.get('/vendors/withdrawals/history')
};

// Admin API endpoints
export const adminAPI = {
  login: (data) => api.post('/admin/login', data),
  getDashboard: () => api.get('/admin/dashboard'),
  getOrders: () => api.get('/admin/orders'),
  updateOrder: (orderId, data) => api.put(`/admin/orders/${orderId}`, data),
  getWithdrawals: () => api.get('/admin/withdrawals'),
  approveWithdrawal: (withdrawalId) => api.put(`/admin/withdrawals/${withdrawalId}/approve`)
};

// Customer API endpoints
export const customerAPI = {
  placeOrder: (data) => api.post('/orders', data),
  trackOrder: (orderId) => api.get(`/orders/${orderId}`)
};