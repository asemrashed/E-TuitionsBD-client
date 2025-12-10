import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../utils/loading/Loading";
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const TuitionsManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tuitions = [], isLoading, refetch } = useQuery({
    queryKey: ["tuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tuitions");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const updateStatus = async (tuition, status) => {
    const result = await Swal.fire({
      title: `${status === "approved" ? "Are you sure to approve this tuition?" : "Are you sure to reject this tuition?"}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.patch(`/tuitions/${tuition._id}`, { status });
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire(`${status === "approved" ? "Approved" : "Rejected"}`, "", status === "approved" ? "success" : "warning");
      }
    }
  };
  
  const handleDelete=(id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this tuition!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async result => {
    if (result.isConfirmed) {
    const res = await axiosSecure.delete(`/tuitions/${id}`)
    if (res.data.deletedCount > 0) {
      refetch()
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    }
  })
}

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl md:text-3xl font-bold text-primary">
          Tuitions Management
        </h1>
        <Link to="/dashboard/add-tuition" className="btn btn-primary btn-xs md:btn-sm text-white">
          + Add New
        </Link>
      </div>

      {/* Header */}
      <ul className="hidden md:grid grid-cols-[60px_1.5fr_0.7fr_0.7fr_0.7fr_1fr_0.5fr] px-3 py-3 bg-base-300 font-semibold">
        <li>#</li>
        <li>Subject</li>
        <li>Class</li>
        <li>Salary</li>
        <li>Status</li>
        <li>Approve</li>
        <li>Actions</li>
      </ul>

      {/* Rows */}
      {tuitions.map((tuition, i) => (
        <ul
          key={tuition._id}
          className="grid grid-cols-2 md:grid-cols-[60px_1.5fr_0.7fr_0.7fr_0.7fr_1fr_0.5fr]
                     gap-1 md:gap-0 px-3 py-3 gap-2 md:gap-0 border-b border-base-300 items-center"
        >
          <li className="order-1">{i + 1}</li>

          <li className="order-3 font-semibold">{tuition.subject}</li>

          <li className="order-4 text-right md:text-left">{tuition.class}</li>

          <li className="order-5 md:order-4 text-primary font-bold">
            ৳ {tuition.salary}
          </li>

          <li
            className={`order-2 md:order-5 uppercase text-xs font-semibold text-right md:text-left
              ${
                tuition.status === "approved"
                  ? "text-success"
                  : tuition.status === "rejected"
                  ? "text-error"
                  : "text-warning"
              }`}
          >
            {tuition.status}
          </li>

          <li className="order-6 flex justify-end md:justify-start">
            {tuition.status === "approved" ? (
              <button
                  onClick={() =>
                    updateStatus(tuition, "rejected")
                  }
                  className="btn btn-xs md:btn-sm bg-base-300 hover:bg-error hover:text-white border-0"
                >
                  Reject
                </button>
            ) : (
              <>
                <button
                  onClick={() =>
                    updateStatus(tuition, "approved")
                  }
                  className="btn btn-xs md:btn-sm bg-base-300 hover:bg-success hover:text-white mr-1 border-0"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    updateStatus(tuition, "rejected")
                  }
                  className="btn btn-xs md:btn-sm bg-base-300 hover:bg-error hover:text-white border-0"
                >
                  Reject
                </button>
              </>
            )}
          </li>

          <li className="order-7 col-span-2 md:col-span-1 flex justify-between md:justify-start gap-3 md:gap-5">
            <Link to={`/tuitions/${tuition._id}`}>
              <TbListDetails className="text-lg text-primary cursor-pointer" />
            </Link>
            <button
              onClick={() => handleDelete(tuition._id)}
              className="text-lg text-error cursor-pointer"
            >
              <RiDeleteBin6Line/>
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default TuitionsManagement;
