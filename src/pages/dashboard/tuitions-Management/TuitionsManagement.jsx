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
    queryKey: ["tuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tuitions");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const handleApprove = tuition => {
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Approve",
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/tuitions/${tuition._id}`, {
          status: "approved",
        });
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire("Approved!", "", "success");
        }
      }
    });
  };

  const handleReject = tuition => {
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Reject",
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/tuitions/${tuition._id}`, {
          status: "rejected",
        });
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire("Rejected!", "", "warning");
        }
      }
    });
  };

  return (
    <div className="w-full p-4 md:p-8">

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl md:text-3xl font-bold text-primary">Tuitions Management</h2>
        <Link to="/dashboard/add-tuition" className="btn btn-primary btn-xs md:btn-sm text-white">
          + Add New
        </Link>
      </div>

      <div className="hidden md:block overflow-x-auto shadow-xl rounded-lg bg-base-100">
        <table className="table w-full">
          <thead className="bg-base-200 text-sm uppercase">
            <tr>
              <th>#</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Tuition Fee</th>
              <th>Status</th>
              <th>Approve</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tuitions.map((tuition, index) => (
              <tr key={tuition._id}>
                <th>{index + 1}</th>
                <td className="font-semibold">{tuition.subject}</td>
                <td>{tuition.class}</td>
                <td className="text-primary font-bold">৳ {tuition.salary}</td>
                <td className="uppercase text-xs font-semibold">{tuition.status}</td>
                <td>
                  <button
                    className="btn btn-success btn-xs text-white mr-1"
                    onClick={() => handleApprove(tuition)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-error btn-xs text-white"
                    onClick={() => handleReject(tuition)}
                  >
                    Reject
                  </button>
                </td>
                <td className="flex gap-2">
                  <TbListDetails className="text-lg text-primary" />
                  <FaRegEdit className="text-lg text-info" />
                  <RiDeleteBin6Line className="text-lg text-error" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {tuitions.map(tuition => (
          <div
            key={tuition._id}
            className="bg-base-200 rounded-xl p-4 shadow grid grid-cols-2 gap-3 text-sm"
          >
            <div className="font-semibold">Subject</div>
            <div>{tuition.subject}</div>

            <div className="font-semibold">Class</div>
            <div>{tuition.class}</div>

            <div className="font-semibold">Salary</div>
            <div className="text-primary font-bold">৳ {tuition.salary}</div>

            <div className="font-semibold">Status</div>
            <div className="uppercase">{tuition.status}</div>

            <div className="font-semibold">Approve</div>
            <div className="flex gap-1">
              <button
                className="btn btn-success btn-xs text-white"
                onClick={() => handleApprove(tuition)}
              >
                Approve
              </button>
              <button
                className="btn btn-error btn-xs text-white"
                onClick={() => handleReject(tuition)}
              >
                Reject
              </button>
            </div>
            
            <div className="font-semibold">Actions</div>
            <div className="flex gap-1">
              <TbListDetails className="text-lg text-primary" />
              <FaRegEdit className="text-lg text-info" />
              <RiDeleteBin6Line className="text-lg text-error" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TuitionsManagement;
