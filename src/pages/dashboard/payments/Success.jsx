import React from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useState } from 'react';
import { useRef } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Success = () => {
    const [ payment, setPayment ] = useState({})
    const axiosSecure = useAxiosSecure()
    const [searchParams] =useSearchParams();
    const sessionId = searchParams.get('session_id')
    const hasRun = useRef(false);

    useEffect(()=>{
        if (hasRun.current) return;
        hasRun.current = true;
        if(sessionId){
            axiosSecure.patch(`/payment-success?sessionId=${sessionId}`)
            .then(res => {
                setPayment(res.data)
            })
            Swal.fire("success", "Payment successful.", "success");
        }
    },[sessionId, axiosSecure])

    return (
        <div className='w-full min-h-[40vh] flex flex-col items-center justify-center'>
            <h2 className="text-2xl text-green-500!">Transection Successful</h2>
            <p className='mt-2'>Your transaction id - <strong className='text-primary'>{payment.transactionId}</strong></p>
        </div>
    );
};

export default Success;