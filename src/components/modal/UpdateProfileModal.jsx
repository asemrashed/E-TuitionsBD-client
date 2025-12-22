import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import locationData from "../../../public/location.json";
import Loading from "../../utils/loading/Loading";

const UpdateProfileModal = ({ isOpen, onClose, user: userData, refetch }) => {
  const { updateUserInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [imgLoading, setImgLoading] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, watch } = useForm();
  const role = userData.role;
  useEffect(() => {
    if (userData && isOpen) {
      setPreview(userData.photoURL || "");

      const currentDivisionId =
        locationData.find(d => d.division_name === userData.division)
          ?.division_id || "";
      const currentDistrictId = "";
      const divObj = locationData.find(
        d => d.division_name === userData.division
      );
      const divId = divObj ? divObj.division_id : "";

      if (divObj) {
        setDistricts(divObj.districts);
      } else {
        setDistricts([]);
      }

      const distObj = divObj?.districts.find(
        d => d.district_name === userData.district
      );
      const distId = distObj ? distObj.district_id : "";

      reset({
        displayName: userData.displayName,
        phoneNumber: userData.phoneNumber,
        institution: userData.institution,
        study: userData.study,
        graduationYear: userData.graduationYear,
        experience: userData.experience,
        address: userData.address,
        division: divId,
        district: distId,
      });
    }
  }, [userData, isOpen, reset]);

  const handleDivisionChange = e => {
    const divisionId = e.target.value;
    const selectedDivision = locationData.find(
      div => div.division_id === divisionId
    );
    setDistricts(selectedDivision ? selectedDivision.districts : []);
  };

  const handleImageChange = async e => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    const imgAPIurl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_HOSTING_KEY
    }`;

    try {
      setImgLoading(true);
      const imgResponse = await axios.post(imgAPIurl, formData);
      setPreview(imgResponse.data.data.url);
    } catch (error) {
      console.error("Image upload failed", error);
      Swal.fire("Error", "Image upload failed", "error");
    } finally {
      setImgLoading(false);
    }
  };

  const onSubmit = async data => {
    const divisionName = locationData.find(
      div => div.division_id === data.division
    )?.division_name;
    const districtName = districts.find(
      dist => dist.district_id === data.district
    )?.district_name;

    try {
      setSaving(true);

      const updateData = {
        ...data,
        division: divisionName || data.division,
        district: districtName || data.district,
        photoURL: preview,
      };

      // 1. Update User Collection
      await axiosSecure.patch(`/users/me?email=${userData.email}`, updateData);

      // 2. Update Firebase Profile
      await updateUserInfo({
        userInfo: {
          displayName: data.displayName,
          photoURL: preview,
        },
      });

      // 3. Update Tutor Collection if user is a tutor
      if (userData.role === "tutor") {
        const tutorRes = await axiosSecure.get(
          `/tutors?email=${userData.email}`
        );
        const tutor = Array.isArray(tutorRes.data)
          ? tutorRes.data[0]
          : tutorRes.data;
        if (tutor && tutor._id) {
          await axiosSecure.patch(`/tutors/${tutor._id}`, {
            ...updateData,
            name: data.displayName,
            image: preview,
          });
        }
      }

      if (refetch) {
          try {
              await refetch();
          } catch(e) {
              console.error("Refetch failed", e);
          }
      }
      
      onClose();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setSaving(false); // Ensure this is false before close? Or finally block handles it. 
      // Finally block handles it, but maybe race condition with unmount? 
      // If modal closes, component unmounts. State update on unmounted component warning might occur but not critical. 
      // Issue "loading problem is not solve yet".
      // Maybe the parent component doesn't update fast enough? 
      // Or maybe the user is redirected? 
      // "just navigate where from the user comes".
      // Let's not navigate automatically unless requested. User said "or just navigate where from the user comes". 
      // If I'm in Settings, I stay in Settings. If in UsersManagement, stay there. 
      // The modal is used in multiple places. 
      // I will rely on onClose closing the modal.
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-base-100 rounded-xl shadow-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Edit Profile</h2>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              
            {imgLoading ? (<span className="loading loading-spinner loading-xl w-24 h-24 p-12 rounded-full object-cover border-4 border-primary"></span>) : (
              <img
                src={preview}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-primary"
              />)}
              <label className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-opacity-90 transition">
                <FaCamera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label font-semibold">Name</label>
              <input
                type="text"
                readOnly
                {...register("displayName", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Email</label>
              <input
                value={userData?.email}
                disabled
                className="input input-bordered w-full bg-base-200 cursor-not-allowed"
              />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Phone Number</label>
              <input
                {...register("phoneNumber", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Institution</label>
              <input
                {...register("institution", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Study</label>
              <input
                {...register("study", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div className={`form-control ${role === "tutor" ? "" : "hidden"}`}>
              <label className="label font-semibold">Graduation Year</label>
              <input
                {...register("graduationYear")}
                className="input input-bordered w-full"
              />
            </div>

            {userData?.role === "tutor" && (
              <div className={`form-control ${role === "tutor" ? "" : "hidden"}`}>
                <label className="label font-semibold">Experience</label>
                <select
                  className="select select-bordered w-full"
                  {...register("experience")}
                >
                  <option disabled value="">
                    Select Experience
                  </option>
                  <option>Starting</option>
                  <option>6 month+</option>
                  <option>1 year+</option>
                  <option>2 year+</option>
                  <option>3 year+</option>
                  <option>4 year+</option>
                  <option>5 year+</option>
                  <option>10 year+</option>
                </select>
              </div>
            )}

            <div className="form-control">
              <label className="label font-semibold">Address</label>
              <input
                {...register("address", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Division</label>
              <select
                className="select select-bordered w-full"
                {...register("division", { required: true })}
                onChange={handleDivisionChange}
              >
                <option disabled value="">
                  Select Division
                </option>
                {locationData.map(div => (
                  <option key={div.division_id} value={div.division_id}>
                    {div.division_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label font-semibold">District</label>
              <select
                className="select select-bordered w-full"
                {...register("district", { required: true })}
                disabled={districts.length === 0}
              >
                <option disabled value="">
                  Select District
                </option>
                {districts.map(dist => (
                  <option key={dist.district_id} value={dist.district_id}>
                    {dist.district_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary text-white"
            >
              {saving ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
