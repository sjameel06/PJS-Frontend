import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.5:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

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



const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log(refreshToken,"tokentoken")
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(
      'http://192.168.1.5:5000/api/v1/session-token/refresh-token',
      {
        token: refreshToken,
        tokenType: 'refreshToken',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
   console.log(response.data.data,"resresres")
    if (response.status === 200 && response.data.data) {
      const { accessToken, refreshToken } = response.data.data;
      console.log(accessToken,refreshToken)
      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return accessToken;
      }
    }

  } catch (error) {
    console.error('Error refreshing token:', error?.response?.data || error.message);
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/'
    return null;
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest); 
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
