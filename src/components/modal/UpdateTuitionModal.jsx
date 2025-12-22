import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UpdateTuitionModal = ({ isOpen, onClose, tuition, refetch }) => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (tuition) {
            reset(tuition);
        }
    }, [tuition, reset]);

    const onSubmit = async (data) => {
        try {
            // Exclude _id from data if it exists in form data to avoid immutable field error
            const { _id, ...updateData } = data;
            
            const res = await axiosSecure.patch(`/tuitions/${tuition._id}`, updateData);
            if (res.data.modifiedCount > 0) {
                if(refetch) await refetch();
                onClose();
                Swal.fire("Success", "Tuition updated successfully", "success");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to update tuition", "error");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-10">
            <div className="bg-base-100 p-8 rounded-xl shadow-xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
                <button 
                    onClick={onClose} 
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >✕</button>
                <h2 className="text-2xl font-bold mb-6 text-center">Edit Tuition Post</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Subject</span></label>
                        <input type="text" {...register("subject", { required: true })} className="input input-bordered w-full" />
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Class</span></label>
                        <select {...register("class", { required: true })} className="select select-bordered w-full">
                            <option>Class 1</option>
                            <option>Class 2</option>
                            <option>Class 3</option>
                            <option>Class 4</option>
                            <option>Class 5</option>
                            <option>Class 6</option>
                            <option>Class 7</option>
                            <option>Class 8</option>
                            <option>Class 9</option>
                            <option>Class 10</option>
                            <option>HSC (11-12)</option>
                            <option>University</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Salary</span></label>
                        <input type="number" {...register("salary", { required: true })} className="input input-bordered w-full" />
                    </div>

                     <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Days/Week</span></label>
                         <select {...register("daysPerWeek", { required: true })} className="select select-bordered w-full">
                            <option>1 Day/Week</option>
                            <option>2 Days/Week</option>
                            <option>3 Days/Week</option>
                            <option>4 Days/Week</option>
                            <option>5 Days/Week</option>
                            <option>6 Days/Week</option>
                            <option>7 Days/Week</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Tutor Gender Preference</span></label>
                        <select {...register("tutorGender", { required: true })} className="select select-bordered w-full">
                            <option>Any</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                     </div>

                    <div className="form-control md:col-span-2">
                         <label className="label"><span className="label-text font-semibold">Address</span></label>
                         <input type="text" {...register("detailedAddress", { required: true })} className="input input-bordered w-full" placeholder="Full address" />
                     </div>

                    <div className="md:col-span-2 mt-6 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
                        <button type="submit" className="btn btn-primary text-white">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTuitionModal;
