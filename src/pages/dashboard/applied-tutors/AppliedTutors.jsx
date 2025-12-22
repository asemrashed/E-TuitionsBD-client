import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../utils/loading/Loading";
import Swal from "sweetalert2";

const AppliedTutors = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["applications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data.filter(app => app.studentEmail === user.email);
    },
  });

  const handleAccept=(app)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Accept this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Accept!",
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await axiosSecure.post(`/payment-checkout-session`,{
          applicationId:app._id,
          tuitionId: app.tuitionId,
          studentEmail: app.studentEmail,
          tutorEmail: app.tutorEmail,
          salary: app.tutorSalary,
          tutoringTime: app.tutoringTime,
        })
        if (res.data.url) {
          window.location.href = res.data.url;
          refetch();
        }
      }
    });
  }

  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Reject this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Reject!",
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/applications/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("success", "Application rejected.", "success");
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">APPLIED TUTORS</h1>
      <ul className="hidden md:grid grid-cols-[60px_1.5fr_1fr_0.7fr_0.7fr_0.7fr_1fr] px-4 py-3 bg-base-300 font-semibold rounded-t-lg">
        <li>SL No</li>
        <li>Tutor</li>
        <li>Qualification</li>
        <li>Experience</li>
        <li>Salary</li>
        <li>Status</li>
        <li>Actions</li>
      </ul>

      {applications.map((app, index) => (
        <ul
          key={app._id}
          className="grid grid-cols-2 md:grid-cols-[60px_1.5fr_1fr_0.7fr_0.7fr_0.7fr_1fr]
               gap-2 md:gap-0 px-4 items-center shadow-xl md:shadow-none py-1 md:py-2 md:border-b border-base-300"
        >
          <li>{index + 1}</li>
          <li className="flex items-center gap-3 col-span-2 md:col-span-1">
            <img
              src={app.tutorImage}
              alt={app.tutorName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{app.tutorName}</p>
              <span className="badge badge-secondary badge-sm">
                {app.subject}
              </span>
            </div>
          </li>

          <li>{app.tutorQualifications}</li>

          <li className="flex justify-end md:justify-start">
            {app.tutorExperience}
          </li>

          <li className="font-bold text-primary">৳ {app.tutorSalary}</li>

          <li>
            <span
              className={`uppercase font-bold flex justify-end md:justify-start ${
                app.applicationStatus === "pending"
                  ? "text-warning"
                  : "text-success"
              }`}
            >
              {app.applicationStatus}
            </span>
          </li>

          <li className="flex col-span-2 md:col-span-1">
           {app.applicationStatus === "pending" ? (
            <div className="flex gap-2 justify-between md:justify-start">
            <button
              onClick={() => handleDelete(app._id)}
              className="btn btn-xs btn-error text-white"
            >
              Reject
            </button>
            <button onClick={()=>handleAccept(app)} className="btn btn-xs btn-success text-white">
              Accept
            </button>
            </div>
           ) : (
            <button
              onClick={() => handleDelete(app._id)}
              className="btn btn-xs btn-error text-white"
            >
              Reject
            </button>
           )}
          </li>
        </ul>
      ))}

      {applications.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No tutors have applied to your tuitions yet.
        </div>
      )}
    </div>
  );
};

export default AppliedTutors;
