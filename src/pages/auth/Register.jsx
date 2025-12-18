import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import SocialLogin from "./SocialLogin";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userSignUp, updateUserInfo, setLoading } = useAuth();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");
  const axiosSecure = useAxiosSecure();

const onSubmit = async (data) => {
  setRegisterError("");
  setLoading(true); 

  const { firstName, lastName, email, password, role, image } = data;
  const profileImage = image[0];
  const formData = new FormData();
  formData.append("image", profileImage);
  console.log('image',profileImage);
  try {
    const imgAPIurl = `https://api.imgbb.com/1/upload?expiration=600&key=${
      import.meta.env.VITE_IMAGE_HOSTING_KEY
    }`;
    console.log('link',imgAPIurl);
    const imgResponse = await axios.post(imgAPIurl, formData);
    console.log('imgResponse',imgResponse);
    const photoURL = imgResponse.data.data.url;

    const userResult = await userSignUp({ email, password });
    
    await updateUserInfo({
      userInfo: {
        displayName: `${firstName} ${lastName}`,
        photoURL: photoURL, 
      },
    });

    const newUser = {
      displayName: `${firstName} ${lastName}`, 
      email: userResult.user.email,
      photoURL: photoURL, 
      role: role,
      status: "pending",
      createdAt: new Date(), 
    };

    await axiosSecure.post("/users", newUser);
    
    navigate("/");
    
  } catch (error) {
    console.error("Registration error:", error);
    setRegisterError(error.message || "Registration failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-base-content">Create Account</h2>
        <p className="text-base-content/60 mt-2">
          Join us to start your learning journey
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">First Name</span>
            </label>
            <input
              type="text"
              placeholder="John"
              className={`input input-bordered w-full ${
                errors.firstName ? "input-error" : ""
              }`}
              {...register("firstName", { required: "First Name is required" })}
            />
            {errors.firstName && (
              <span className="text-error text-sm mt-1">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Doe"
              className={`input input-bordered w-full ${
                errors.lastName ? "input-error" : ""
              }`}
              {...register("lastName", { required: "Last Name is required" })}
            />
            {errors.lastName && (
              <span className="text-error text-sm mt-1">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Email</span>
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            className={`input input-bordered w-full ${
              errors.email ? "input-error" : ""
            }`}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-error text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label-text font-semibold">Image</label>
          <input
            type="file"
            className={`input file-input input-sm md:input-lg w-full p-0 mb-2 outline-0 ${errors.image ? "input-error" : ""}`}
            placeholder="your profile picture"
            {...register("image", { required: "Image is required" })}
          />
          {errors.image && (
            <span className="text-error text-sm mt-1">
              {errors.image.message}
            </span>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Password</span>
          </label>
          <input
            type="password"
            className={`input input-bordered w-full ${
              errors.password ? "input-error" : ""
            }`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-error text-sm mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Phone number</span>
          </label>
          <input
            type="number"
            className={`input input-bordered w-full ${
              errors.phoneNumber ? "input-error" : ""
            }`}
            {...register("phoneNumber", {
              required: "Phone number is required",
              minLength: {
                value: 11,
                message: "Phone number must be at least 11 characters",
              },
            })}
          />
          {errors.phoneNumber && (
            <span className="text-error text-sm mt-1">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">I am a</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="label cursor-pointer border rounded-lg px-4 py-2 hover:bg-base-200 transition-colors">
              <span className="label-text font-medium">Student</span>
              <input
                type="radio"
                value="student"
                className="radio radio-primary"
                {...register("role", { required: "Please select a role" })}
              />
            </label>
            <label className="label cursor-pointer border rounded-lg px-4 py-2 hover:bg-base-200 transition-colors justify-end">
              <span className="label-text font-medium">Tutor</span>
              <input
                type="radio"
                value="tutor"
                className="radio radio-primary"
                {...register("role", { required: "Please select a role" })}
              />
            </label>
          </div>
          {errors.role && (
            <span className="text-error text-sm mt-1">
              {errors.role.message}
            </span>
          )}
        </div>

        {registerError && (
          <p className="text-error text-center text-sm">{registerError}</p>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full text-white text-lg mt-4"
        >
          Sign Up
        </button>
      </form>

      <SocialLogin setRegisterError={setRegisterError}/>

      <p className="text-center mt-6 text-base-content/70">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-bold hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
