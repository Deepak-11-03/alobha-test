// Importing required modules
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "https://super-cod-4prvrvq6gw6f5qjp-3000.app.github.dev/api"

// Create an Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add Authorization token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `${token}`,
      };
    }
    return config;
  },
  (error) => {
    // console.log(error)
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Process successful response
    return response.data;
  },
  (error) => {
    if(error?.response?.data?.responseCode === 401){
      localStorage.removeItem("persist:root"); // Clear persisted state
        localStorage.clear()

        const navigate = useNavigate(); // Hook for navigation
      navigate('/'); // Redirect to login page
    }
    // Handle response errors
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Example service functions
export const getData = async (endpoint, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, { params });
    return response;
    
  } catch (error) {
    return error.response.data
  }
};

export const postData = async (endpoint ,data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Post Data Error:', error.message);
    }
    return error?.response?.data;
  }
};

export const putData = async (endpoint , data) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Put Data Error:', error.message);
    }
    return error.response.data
  }
};

export const patchData = async (endpoint , data) => {
  try {
    const response = await apiClient.patch(endpoint, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Patch Data Error:', error.message);
    }
    return error.response.data
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Delete Data Error:', error.message);
    }
    return error.response.data
  }
};


export default apiClient;
