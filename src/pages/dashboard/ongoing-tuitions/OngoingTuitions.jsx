import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../utils/loading/Loading";
import { FaEye, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const OngoingTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: myApplications = [], isLoading } = useQuery({
    queryKey: ["my-tuitions", user?.email],
    queryFn: async () => {
      const tuitions = await axiosSecure.get(`/applications?email=${user.email}`);
      return tuitions.data;
    },
  });

  const handleDelete =(id) => {
    axiosSecure.delete(`/applications/${id}`)
    .then(res => {
      if(res.data.deletedCount > 0){
        Swal.fire("Success", "Application deleted successfully.", "success");
      }
    })
    .catch(err => {
      Swal.fire("Error", "Application deletion failed.", "error");
    })
  };

  if (isLoading) return <Loading />;
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">MY APPLICATIONS</h1>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <div className="w-full">
          <ul
            className="hidden md:grid grid-cols-[60px_1.2fr_1.5fr_0.8fr_1fr_0.8fr_0.7fr] 
               px-4 py-3 bg-base-300 font-semibold rounded-t-lg"
          >
            <li>#</li>
            <li>Subject</li>
            <li>Location</li>
            <li>Salary</li>
            <li>Time</li>
            <li>Status</li>
            <li>Actions</li>
          </ul>

          <div>
            {myApplications.map((app, index)=> (
              <ul
                key={app._id}
                className="grid grid-cols-2 md:grid-cols-[60px_1.2fr_1.5fr_0.8fr_1fr_0.8fr_0.7fr]
               gap-2 md:gap-0 px-4 py-4 border-b border-base-300 items-center"
              >
                {/* Sl */}
                <li className="font-bold text-primary md:order-1 col-span-2 md:col-span-1">
                  {index + 1}
                </li>

                {/* Subject */}
                <li className="font-bold text-primary md:order-1 col-span-2 md:col-span-1">
                  {app.subject}
                </li>

                {/* Location */}
                <li className="md:order-2 col-span-2 md:col-span-1">
                  <div className="flex flex-col">
                    <span>{app.district}</span>
                    <span className="text-xs text-gray-400">
                      {app.location}
                    </span>
                  </div>
                </li>

                {/* Salary */}
                <li className="font-semibold md:order-3">
                  ৳ {app.tutorSalary}
                </li>

                {/* time */}
                <li className="md:order-4 text-sm flex justify-end md:justify-start">
                  {app.tutoringTime || "N/A"}
                </li>

                {/* Status */}
                <li className="md:order-5">
                  <span
                    className={`badge ${
                      app.applicationStatus === "pending"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {app.applicationStatus}
                  </span>
                </li>

                {/* Actions */}
                <li className="flex gap-2 md:order-6 justify-end md:justify-start">
                  <button className="btn btn-ghost btn-xs text-info text-lg">
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleDelete(app._id)}
                    className="btn btn-ghost btn-xs text-error text-lg"
                  >
                    <FaTrash />
                  </button>
                </li>
              </ul>
            ))}

            {myApplications.length === 0 && (
              <div>
                <p className="text-center py-4">
                  No tuitions application accepted yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingTuitions;
