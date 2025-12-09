import axios from "axios";

const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_LINK
})

const useAxios = () => {
    return axiosPublic;
};

export default useAxios;
