import { Link, useParams } from "react-router-dom";
import {
  MdSchool,
  MdSubject,
  MdAttachMoney,
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdPerson,
  MdSchedule,
} from "react-icons/md";
import InfoCard from "./InfoCard";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../utils/loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const TuitionDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const { data: tuition = {}, isLoading } = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/${id}`);
      return res.data;
    },
  });
  const { data: tutorData = [], isLoading: isTutorLoading } = useQuery({
    queryKey: ["tutor", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutors?email=${user?.email}`);
      return res.data;
    },
  });
  const currentTutor = tutorData?.status === "active"

  useEffect(() => {
    if (currentTutor && isModalOpen) {
      reset({
        name: currentTutor.name || user?.displayName,
        image: currentTutor.image || user?.photoURL,
        qualifications: currentTutor.qualifications || "",
        experience: currentTutor.experience || "",
        salary: currentTutor.salary || "",
      });
    }
  }, [currentTutor, isModalOpen, reset, user]);

  const {
    address,
    description,
    class: className,
    createdAt,
    district,
    email,
    number,
    salary,
    subject,
    tutorGender,
    studentGender,
    tutoringTime,
    _id:tuitionId,
  } = tuition;

  const handleApply = () => {
    if (!user) {
      return Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please login to apply.",
      });
    }

    if (!currentTutor) {
      return Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You are not an approved tutor.",
      });
    }

    setIsModalOpen(true);
  };

  const onSubmit = async (data) => {
    try {
      // Assuming we need to update the tutor's data
      // And we might need to link this application to the tuition? 
      // The prompt says "update tutor data with a new field 'applicationStatus: pending'".
      // It doesn't explicitly say to create an 'Application' record, but updating tutor data implies the tutor's status changes?
      // Or maybe it means "Apply for this tuition" -> Update tutor's status? 
      // Re-reading: "update tutor data with a new field. 'applicationStatus: pending'".
      // This implies the Tutor object itself gets this field. 
      // This seems slightly odd for a many-to-many relationship (Tutors apply to Tuitions), 
      // but I will follow the instruction literally: Update Tutor Data.
      
      if (!currentTutor?._id) return;

      const updateData = {
        applicationStatus: "pending",
        tuitionId: tuitionId,
      };

      const res = await axiosSecure.patch(`/tutors/${currentTutor._id}`, updateData);

      if (res.data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted",
          text: "Your application is pending approval.",
        });
        setIsModalOpen(false);
      }
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to submit application.",
        });
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-4 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-primary">
          Tuition Details
        </h1>
        <div className="flex flex-col items-end justify-center text-sm">
          <div className="flex items-center gap-1 text-primary text-sm font-semibold">
            <MdSchedule />
            Posted on
          </div>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <InfoCard icon={<MdSchool />} label="Class">
          {className}
        </InfoCard>

        <InfoCard icon={<MdLocationOn />} label="District">
          {district}
        </InfoCard>

        <InfoCard icon={<MdSchedule />} label="Tutoring Time">
          {tutoringTime}
        </InfoCard>

        <InfoCard icon={<MdSubject />} label="Subject">
          {subject}
        </InfoCard>

        <InfoCard icon={<MdPerson />} label="Pref. tutor">
          {tutorGender}
        </InfoCard>

        <InfoCard icon={<MdAttachMoney />} label="Salary">
          {salary}
        </InfoCard>

        <InfoCard
          icon={<MdLocationOn />}
          label="Address"
          className="col-span-2 md:col-span-3"
        >
          {address}
        </InfoCard>

        <InfoCard icon={<MdEmail />} label="Email">
          {email}
        </InfoCard>

        <InfoCard icon={<MdPerson />} label="Student">
          {studentGender}
        </InfoCard>

        <InfoCard
          icon={<MdPhone />}
          label="Mobile Number"
          className="col-span-2 md:col-span-1"
        >
          {number}
        </InfoCard>
      </div>
      <div className="bg-base-100 dark:bg-[#1a222d] border border-base-300 dark:border-gray-800 rounded-xl p-4">
        <h3 className="mb-2 flex items-center gap-2">
          <MdSubject className="text-primary" /> Description
        </h3>
        <p className="text-sm">{description}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
        <Link to="/dashboard/tuitions" className="btn btn-outline btn-sm">
          Back
        </Link>

        <div className="hidden md:block" />

        <button
          onClick={handleApply}
          className="btn btn-primary btn-sm text-white"
        >
          Apply
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-base-100 p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Apply as Tutor</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tutor Name</span>
                </label>
                <input
                  type="text"
                  readOnly
                  {...register("name", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Picture URL</span>
                </label>
                <input
                  type="text"
                  {...register("image", { required: true })} // Assuming URL string
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Qualifications</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. B.Sc in CSE"
                  {...register("qualifications", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Experience</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2 years"
                  {...register("experience", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

               <div className="form-control">
                <label className="label">
                  <span className="label-text">Expected Salary</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  {...register("salary", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-white">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TuitionDetails;