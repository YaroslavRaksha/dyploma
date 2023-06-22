import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: process.env.BACKEND_API,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

instance.interceptors.response.use(
    (response) => response,
    (err) => {
        const { error } = err?.response?.data;
        const { message, status } = error;

        const errorObject = {
            status: status || 500,
            errorMessage: message || 'Internal server error'
        };

        return Promise.reject(errorObject);
    }
);

export default instance;
