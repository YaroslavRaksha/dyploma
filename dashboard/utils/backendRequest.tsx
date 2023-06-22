import { AxiosRequestConfig } from "axios";
import backendApiInstance from "./backendApiInstance";

type Method = "GET" | "POST" | "PUT" | "DELETE";

const makeNextRequest = async <T>(
    url: string,
    method: Method = "GET",
    options?: AxiosRequestConfig,
): Promise<T> => {

    try {
        const { data } = await backendApiInstance.request<T>({
            url,
            method,
            ...options,
        });
        return data;
    } catch (error) {
        throw error;
    }
};

export default makeNextRequest;
