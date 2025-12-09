import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../utils/loading/Loading";
import axios from "axios";
import Swal from "sweetalert2";

const Settings = () => {
  const { user, updateUserInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm();

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/me?email=${user.email}`);
      return res.data;
    },
  });

  const {
    displayName,
    email,
    photoURL,
    phoneNumber,
    address,
    division,
    district,
    institution,
    degree,
    graduationYear,
  } = userData;

  useEffect(() => {
    reset({
      displayName,
      phoneNumber,
      address,
      division,
      district,
      institution,
      degree,
      graduationYear,
    });
    setPreview(photoURL);
  }, [userData, reset, photoURL]);

  const handleImageChange = async e => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
    formData.append("image", file);
    const imgAPIurl = `https://api.imgbb.com/1/upload?expiration=600&key=${
      import.meta.env.VITE_IMAGE_HOSTING_KEY
    }`;

    const imgResponse = await axios.post(imgAPIurl, formData);
    const photoURL = imgResponse.data.data.url;
    setPreview(photoURL);
  };
}

  const onSubmit = async data => {
    Swal.fire({
      title: "Are you sure?",
      text: `You wan't change your data!`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          setSaving(true);
          await axiosSecure.patch(`/users/me?email=${email}`, {
            ...data,
            photoURL: preview,
          });
          await updateUserInfo({
            userInfo: {
              photoURL: preview,
            },
          });
          queryClient.invalidateQueries(["user", email]);
          navigate("/dashboard/profile");
        } catch (err) {
          console.error(err);
        } finally {
          setSaving(false);
        }
      }
    });
  };

  if (isLoading || !user) {
    return <Loading />;
  }

  return (
    <div className="w-full p-4 md:p-8 text-content-dark">
      <h1 className="text-3xl font-bold text-primary mb-6">Edit Profile</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-200 rounded-xl shadow p-6 space-y-8"
      >
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={preview}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-primary"
            />

            <label className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full cursor-pointer">
              <FaCamera />
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
          <div>
            <label className="label">Name</label>
            <input
              {...register("displayName", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Email</label>
            <input
              value={email}
              disabled
              className="input input-bordered w-full bg-base-300 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="label">Phone Number</label>
            <input
              {...register("phoneNumber")}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Institution</label>
            <input
              {...register("institution")}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Degree</label>
            <input
              {...register("degree")}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Graduation Year</label>
            <input
              {...register("graduationYear")}
              className="input input-bordered w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="label">Address</label>
            <input
              {...register("address")}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Division</label>
            <input
              {...register("division")}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">District</label>
            <input
              {...register("district")}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/profile")}
            className="btn btn-ghost"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="btn bg-primary text-white hover:bg-opacity-90"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
