import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../utils/loading/Loading";
import UpdateProfileModal from "../../../components/modal/UpdateProfileModal";

const Settings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: userData = {}, isLoading, refetch } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/me?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading || !user) {
    return <Loading />;
  }

  const {
      displayName,
      email,
      photoURL,
      phoneNumber,
      address,
      division,
      district,
      institution,
      study,
      graduationYear,
      experience,
      role
  } = userData;

  return (
    <div className="w-full p-4 md:p-8 text-content-dark">
        <div className="flex justify-between items-center mb-6">
             <h1 className="text-3xl font-bold text-primary">My Profile</h1>
             <button 
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary text-white"
             >
                Update Profile
             </button>
        </div>

      <div className="bg-base-200 rounded-xl shadow p-6 space-y-8">
        <div className="flex justify-center">
             <img
              src={photoURL}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-primary"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          <div>
            <span className="font-bold block text-sm text-gray-500">Name</span>
            <span>{displayName}</span>
          </div>
           <div>
            <span className="font-bold block text-sm text-gray-500">Email</span>
            <span>{email}</span>
          </div>
          <div>
             <span className="font-bold block text-sm text-gray-500">Phone</span>
             <span>{phoneNumber || "N/A"}</span>
          </div>
          <div>
             <span className="font-bold block text-sm text-gray-500">Role</span>
             <span className="uppercase badge badge-primary font-bold text-white">{role}</span>
          </div>
          <div>
             <span className="font-bold block text-sm text-gray-500">Institution</span>
             <span>{institution || "N/A"}</span>
          </div>
          <div >
             <span className="font-bold block text-sm text-gray-500">Study</span>
             <span>{study || "N/A"}</span>
          </div>
          <div className={role === "tutor" ? "" : "hidden"}>
             <span className="font-bold block text-sm text-gray-500">Graduation Year</span>
             <span>{graduationYear || "N/A"}</span>
          </div>
           {role === 'tutor' && (
             <div className={`${role === "tutor" ? "" : "hidden"}`}>
                <span className="font-bold block text-sm text-gray-500">Experience</span>
                <span>{experience || "N/A"}</span>
             </div>
           )}
          <div className="md:col-span-2">
             <span className="font-bold block text-sm text-gray-500">Address</span>
             <span>{address ? `${address}, ${district}, ${division}` : "N/A"}</span>
          </div>
        </div>
      </div>
      
      <UpdateProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        user={userData}
        refetch={refetch}
      />
    </div>
  );
};

export default Settings;
