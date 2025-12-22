import { useState } from "react"; // Added useState
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../utils/loading/Loading";
import { FaEye, FaTrash, FaRegEdit } from "react-icons/fa"; // Added FaRegEdit
import Swal from "sweetalert2";
import UpdateApplicationModal from "../../../components/modal/UpdateApplicationModal"; // Import Modal

const MyApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const { data: myApplications = [], isLoading, refetch } = useQuery({ // Added refetch
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

  const handleDelete =(id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
             axiosSecure.delete(`/applications/${id}`)
            .then(res => {
              if(res.data.deletedCount > 0){
                Swal.fire("Deleted!", "Application has been deleted.", "success");
                refetch();
              }
            })
            .catch(err => {
              Swal.fire("Error", "Application deletion failed.", "error");
            })
        }
    });
  };

  const handleEdit = (app) => {
      setSelectedApp(app);
      setIsModalOpen(true);
  }

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
                  {app.applicationStatus === 'pending' && (
                       <button 
                        onClick={() => handleEdit(app)}
                        className="btn btn-ghost btn-xs text-info text-lg"
                       >
                         <FaRegEdit />
                       </button>
                  )}
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
                  You haven't applied to any tuitions yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <UpdateApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        application={selectedApp} 
        refetch={refetch}
      />
    </div>
  );
};

export default MyApplications;
