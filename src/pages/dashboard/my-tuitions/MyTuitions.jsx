import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../utils/loading/Loading";
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const MyTuitions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: myTuitions = [], isLoading } = useQuery({
        queryKey: ['my-tuitions', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/tuitions?email=${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    return (
        <div className="w-full p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-primary">My Tuitions</h2>
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
                            <th>Location</th>
                            <th>Salary</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myTuitions.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-8 text-lg text-gray-500">
                                    You haven't posted any tuitions yet.
                                </td>
                            </tr>
                        ) : (
                            myTuitions.map((item, index) => (
                                <tr key={item._id} className="hover:bg-base-200/50 transition-colors border-b border-base-200 last:border-none">
                                    <th className="font-bold">{index + 1}</th>
                                    <td>
                                        <div className="font-bold text-lg">{item.subject}</div>
                                        <div className="text-xs badge badge-ghost">{item.tutorGender} Tutor Pref.</div>
                                    </td>
                                    <td className="font-medium">{item.class}</td>
                                    <td>
                                        <div className="font-medium">{item.district}</div>
                                        <div className="text-xs opacity-60 truncate max-w-[150px]">{item.division}</div>
                                    </td>
                                    <td className="font-mono text-primary font-bold">
                                        ৳ {item.salary}
                                    </td>
                                    <td>
                                        <div className={`badge ${item.status === 'pending' ? 'badge-warning' : item.status === 'approved' ? 'badge-success' : 'badge-ghost'} gap-2 text-xs font-semibold uppercase`}>
                                            {item.status}
                                        </div>
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

export default MyTuitions;
