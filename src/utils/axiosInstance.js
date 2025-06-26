import axios from 'axios';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Attach Authorization token from localStorage before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to refresh access token using refresh token
const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    // Use the same axios instance to preserve baseURL and headers
    const response = await axiosInstance.post('/session-token/refresh-token', {
      token: refreshToken,
      tokenType: 'refreshToken',
    });

    if (response.status === 200 && response.data?.data) {
      const { accessToken, refreshToken: newRefreshToken } = response.data.data;

      if (accessToken && newRefreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        return accessToken;
      }
    }

    throw new Error('Invalid refresh token response');
  } catch (error) {
    console.error('Error refreshing token:', error?.response?.data || error.message);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login'; // or '/'
    return null;
  }
};

// Response interceptor to handle 401 and retry after refreshing token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest); // Retry the original request
      }
    }

    return Promise.reject(error);
  }
);
console.log(axiosInstance.defaults.headers,"checkkkkkk");
export default axiosInstance;
