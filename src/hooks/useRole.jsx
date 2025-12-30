import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {isLoading, data: role = null}= useQuery({
        queryKey:['userRole', user?.email],
        enabled: !!user?.email,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/${user?.email}/role`)
            return res.data
        }
    })
    return {role, isLoading};
};

export default useRole;