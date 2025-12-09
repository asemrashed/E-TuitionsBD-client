import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../utils/loading/Loading";
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const TuitionsManagement = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: tuitions = [], isLoading, refetch } = useQuery({
        queryKey: ['tuitions'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tuitions`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    const handleApprove=(tuition)=>{
        Swal.fire({
        title: "Are you sure?",
        text: "You won't be approved this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, approve it!",
        }).then(async result => {
        if (result.isConfirmed) {
            axiosSecure.patch(`/tuitions/${tuition._id}`,{status:'approved'})
            .then(res=>{
                if(res.data.modifiedCount>0){
                    refetch()
                    Swal.fire("Approved!", "Tuition has been approved.", "success");
                }
            })
            .catch(err=>{
                Swal.fire("Failed!", "Tuition has not been approved.", "error");
            })
        }
    })
}
    const handleReject=(tuition)=>{
        Swal.fire({
        title: "Are you sure?",
        text: "You won't be rejected this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reject it!",
        }).then(async result => {
        if (result.isConfirmed) {
            axiosSecure.patch(`/tuitions/${tuition._id}`,{status:'rejected'})
            .then(res=>{
                if(res.data.modifiedCount>0){
                    refetch()
                    Swal.fire("Rejected!", "Tuition has been rejected.", "warning");
                }
            })
            .catch(err=>{
                Swal.fire("Failed!", "Tuition has not been rejected.", "error");
            })
        }
    })
}

    return (
        <div className="w-full p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-primary">Tuitions Management</h2>
                <Link to="/dashboard/add-tuition" className="btn btn-primary btn-sm text-white">
                    + Add New
                </Link>
            </div>
            
            <div className="overflow-x-auto shadow-xl rounded-lg bg-base-100">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-base-200 text-base-content uppercase text-sm font-bold">
                        <tr>
                            <th className="py-4">#</th>
                            <th>Subject Info</th>
                            <th>Class</th>
                            <th>Salary</th>
                            <th>Status</th>
                            <th>Approve</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tuitions.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-8 text-lg text-gray-500">
                                    You haven't posted any tuitions yet.
                                </td>
                            </tr>
                        ) : (
                            tuitions.map((tuition, index) => (
                                <tr key={tuition._id} className="hover:bg-base-200/50 transition-colors border-b border-base-200 last:border-none">
                                    <th className="font-bold">{index + 1}</th>
                                    <td>
                                        <div className="font-bold text-lg">{tuition.subject}</div>
                                        <div className="text-xs badge badge-ghost">{tuition.tutorGender} Tutor Pref.</div>
                                    </td>
                                    <td className="font-medium">{tuition.class}</td>
                                    <td className="font-mono text-primary font-bold">
                                        ৳ {tuition.salary}
                                    </td>
                                    <td>
                                        <div className={` ${tuition.status === 'pending' ? 'text-warning' : tuition.status === 'approved' ? 'text-success' : 'text-error'} gap-2 text-xs font-semibold uppercase`}>
                                            {tuition.status}
                                        </div>
                                    </td>
                                    <td>
                                        <button className="btn btn-success btn-xs md:btn-sm join-item text-white" 
                                            onClick={() => handleApprove(tuition)}>
                                            Approve
                                        </button>
                                        <button className="btn btn-error btn-xs md:btn-sm ml-1 join-item text-white" 
                                            onClick={() => handleReject(tuition)}
                                            >
                                            Reject
                                        </button>
                                    </td>
                                    <td>
                                        <div className="join">
                                            <button className="btn btn-ghost btn-xs join-item text-primary tooltip" data-tip="View Details">
                                                <TbListDetails className="text-lg mr-1"/>
                                            </button>
                                            <button className="btn btn-ghost btn-xs join-item text-info tooltip" data-tip="Edit">
                                                <FaRegEdit className="text-lg mr-1"/>
                                            </button>
                                            <button className="btn btn-ghost btn-xs join-item text-error tooltip" data-tip="Delete">
                                                <RiDeleteBin6Line className="text-lg mr-1"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TuitionsManagement;
