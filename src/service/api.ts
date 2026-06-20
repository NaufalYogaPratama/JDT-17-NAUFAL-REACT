import axios from "axios";
import { ACCESS_TOKEN, BASE_URL } from "../constants";

const API = axios.create();

export const setAxiosConfig = (token: string) => {
    
}

API.interceptors.request.use((axiosConfig) => {
    axiosConfig.baseURL = BASE_URL;
    axiosConfig.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;

    return axiosConfig;
})

export default API