import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_LINK
})

const useAxiosSecure = () => {
    const { userSignOut, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
            const token = user?.accessToken;
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        axiosSecure.interceptors.response.use((response) => {
            return response;
        }, async (error) => {
            const status = error.response ? error.response.status : null;
            if (status === 401 || status === 403) {
                await userSignOut();
                navigate('/login');
            }
            return Promise.reject(error);
        })
    }, [userSignOut, navigate])

    return axiosSecure;
};

export default useAxiosSecure;
