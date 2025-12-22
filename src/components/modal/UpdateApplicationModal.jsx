import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UpdateApplicationModal = ({ isOpen, onClose, application, refetch }) => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (application) {
            reset(application);
        }
    }, [application, reset]);

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.patch(`/applications/${application._id}`, data);
            if (res.data.modifiedCount > 0) {
                if(refetch) await refetch();
                onClose();
                Swal.fire("Success", "Application updated successfully", "success");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to update application", "error");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-base-100 p-8 rounded-xl shadow-xl w-full max-w-lg relative">
                <button 
                    onClick={onClose} 
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >✕</button>
                <h2 className="text-2xl font-bold mb-6 text-center">Edit Application</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Expected Salary</span>
                        </label>
                        <input 
                            type="number" 
                            {...register("tutorSalary", { required: true })} 
                            className="input input-bordered w-full" 
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Available Time</span>
                        </label>
                        <input 
                            type="text" 
                            {...register("tutoringTime", { required: true })} 
                            className="input input-bordered w-full" 
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Notes (Optional)</span>
                        </label>
                        <textarea 
                            {...register("notes")} 
                            className="textarea textarea-bordered w-full" 
                            placeholder="Any additional notes..."
                        ></textarea>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
                        <button type="submit" className="btn btn-primary text-white">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateApplicationModal;
