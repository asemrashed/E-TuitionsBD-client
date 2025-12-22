import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../utils/loading/Loading';

const PrivetRoute = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation()

    if(loading){
        return <Loading/>
    }

    if(!user){
        return <Navigate state={location?.pathname} to={'/login'} />
    }

    return children
};

export default PrivetRoute;