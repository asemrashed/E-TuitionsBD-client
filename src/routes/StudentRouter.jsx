import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../utils/loading/Loading';

const StudentRoute = ({children}) => {
    const {loading} = useAuth()
    const {role, isLoading} = useRole()

    if(loading || isLoading){
        return <Loading/>
    }
    
    if(role !== 'student'){
        return <div className='text-3xl w-full h-full flex items-center justify-center'>Forbidden Route</div>
    }
    return children
};

export default StudentRoute;