import axios from 'axios';
import {API_BASE_URL} from "./ApiConfig";
import { logoutUser } from '../redux/slicers/authSlice';
import store from '../redux/store/store';

const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
});

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshResponse = await instance.post('/refresh_token');
                if (refreshResponse.status === 200) {
                    originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
                    return instance(originalRequest);
                } else {
                    store.dispatch(logoutUser());
                    window.location.href = '/login';
                    return Promise.reject();
                }
            } catch (refreshError) {
                store.dispatch(logoutUser());
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
instance.interceptors.request.use(
    (config) => {
        const authState = store.getState().authState;
        if (authState.isAuthenticated && authState.user && authState.user.accessToken) {
            config.headers.Authorization = `Bearer ${authState.user.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default instance;