import axios, { AxiosInstance } from 'axios';
import Constants from "expo-constants";

const backendURL = (Constants.manifest as any)?.extra?.BACKEND_URL;

const instance: AxiosInstance = axios.create({
    baseURL: backendURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

instance.interceptors.response.use(
    (response) => response,
    (err) => {
        return Promise.reject({
            status: 500,
            errorMessage: 'Internal server Error'
        });
    }
);

export default instance;