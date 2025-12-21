import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../utils/loading/Loading";
import { FaEye, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const MyApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: myApplications = [], isLoading } = useQuery({
    queryKey: ["my-applications", user?.email],
    queryFn: async () => {
      const tutorRes = await axiosSecure.get(`/tutors?email=${user.email}`);
      const tutor = Array.isArray(tutorRes.data)
        ? tutorRes.data[0]
        : tutorRes.data;

      if (!tutor || !tutor._id) return [];

      const appsRes = await axiosSecure.get("/applications");
      return appsRes.data.filter(app => app.tutorId === tutor._id);
    },
  });

  const handleDelete = id => {
    Swal.fire("Info", "Backend delete support needed.", "info");
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">MY APPLICATIONS</h1>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table w-full">
          <ul
            className="hidden md:grid grid-cols-[1.2fr_1.5fr_0.8fr_1fr_0.8fr_0.7fr] 
               px-4 py-3 bg-base-300 font-semibold rounded-t-lg"
          >
            <li>Subject</li>
            <li>Location</li>
            <li>Salary</li>
            <li>Student Phone</li>
            <li>Status</li>
            <li>Actions</li>
          </ul>

          <tbody>
            {myApplications.map((app) => (
  <ul
    key={app._id}
    className="grid grid-cols-2 md:grid-cols-[1.2fr_1.5fr_0.8fr_1fr_0.8fr_0.7fr]
               gap-2 px-4 py-4 border-b border-base-300 items-center"
  >
    {/* Subject */}
    <li className="font-bold text-primary md:order-1 col-span-2 md:col-span-1">
      {app.subject}
    </li>

    {/* Location */}
    <li className="md:order-2 col-span-2 md:col-span-1">
      <div className="flex flex-col">
        <span>{app.district}</span>
        <span className="text-xs text-gray-400">{app.location}</span>
      </div>
    </li>

    {/* Salary */}
    <li className="font-semibold md:order-3">
      ৳ {app.tutorSalary}
    </li>

    {/* Phone */}
    <li className="md:order-4 text-sm flex justify-end md:justify-start">
      {app.studentNumber || "N/A"}
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
    <li className="flex gap-2 md:order-6 justify-end">
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
              <tr>
                <td colSpan="6" className="text-center py-4">
                  You haven't applied to any tuitions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplications;
