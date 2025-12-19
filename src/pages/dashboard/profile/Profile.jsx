import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../utils/loading/Loading";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const Profile = () => {
    const {user}= useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: userData={}, isLoading}= useQuery({
        queryKey: ["user", user.email],
        enabled: !!user,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/me?email=${user?.email}`);
            return res.data;
        },
    })
    if(isLoading || !user){
        return <Loading/>
    }
    const {displayName, email, photoURL, role,  phoneNumber, address, division, district, institution, degree, experience, graduationYear}= userData;
  return (
    <div className="w-full p-4 md:p-8 text-content-dark">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 p-6 bg-base-200 rounded-xl shadow">
        <h1 className="text-4xl font-bold mb-4 md:mb-0 text-primary">
          {displayName}
        </h1>

        <div className="flex space-x-4">
          <Link to="/dashboard/settings" className="bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-opacity-90 transition flex items-center gap-2">
            <span className="material-icons text-lg">edit</span>
            <span>Edit</span>
          </Link>
{/* 
          <button className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-red-700 transition flex items-center gap-2">
            <span className="material-icons text-lg">delete</span>
            <span>Delete</span>
          </button> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-base-200 rounded-xl shadow p-6 flex flex-col items-center">
          <img
            src={photoURL}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-primary mb-6"
          />

          <div className="w-full text-center md:text-left space-y-4">
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-400">
                Username
              </p>
              <p className="text-lg font-semibold">{displayName}</p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-wider text-gray-400">
                Email
              </p>
              <p className="text-lg font-semibold">{email}</p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-wider text-gray-400">
                Contact Number
              </p>
              {
                phoneNumber ? (
                  <p className="text-lg font-semibold">{phoneNumber}</p>
                ) : (
                  <p className="">Not added yet</p>
                )
              }
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-base-200 rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-primary mb-6 border-b border-base-300 pb-4">
            {role}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Education</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Institution</p>
                  <p className="font-medium">
                    {institution || "Not added yet"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Degree</p>
                  <p className="font-medium">
                    {degree || "Not added yet"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Graduation Year
                  </p>
                  <p className="font-medium">{graduationYear || "Not added yet"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Experience
                  </p>
                  <p className="font-medium">{experience || "Not added yet"}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Location</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-400">
                    Street Address
                  </p>
                  <p className="font-medium">
                    {address || "Not added yet"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Division</p>
                  <p className="font-medium">{division || "Not added yet"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">District</p>
                  <p className="font-medium">{district || "Not added yet"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
