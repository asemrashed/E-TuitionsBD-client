import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import locationData from "../../../../public/location.json";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../utils/loading/Loading";

const AddTuition = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [districts, setDistricts] = useState([]);
  const navigate = useNavigate();

  const handleDivisionChange = e => {
    const divisionId = e.target.value;
    const selectedDivision = locationData.find(
      div => div.division_id === divisionId
    );
    setDistricts(selectedDivision ? selectedDivision.districts : []);
  };

  const { data: student = [], isLoading } = useQuery({
    queryKey: ["student", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });
  console.log("student", student);
  if (isLoading) {
    return <Loading />;
  }

  const onSubmit = async data => {
    try {
      const divisionName = locationData.find(
        div => div.division_id === data.division
      )?.division_name;
      const districtName = districts.find(
        dist => dist.district_id === data.district
      )?.district_name;

      const tuitionData = {
        ...data,
        division: divisionName,
        district: districtName,
        createdAt: new Date(),
        status: "pending",
        tutorName: user?.displayName,
        tutorEmail: user?.email,
        tutorPhoto: user?.photoURL,
        phoneNumber: data?.phoneNumber,
      };

      const res = await axiosSecure.post("/tuitions", tuitionData);
      if (res.data.insertedId) {
        reset();
        navigate("/dashboard/my-tuitions");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Tuition Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="w-full p-4 md:p-8 bg-base-200 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        Add New Tuition
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-100 p-6 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Student Info (Read Only) */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Name</span>
          </label>
          <input
            type="text"
            defaultValue={user?.displayName}
            readOnly
            className="input input-bordered w-full bg-base-200"
            {...register("name", { value: user?.displayName })}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Email</span>
          </label>
          <input
            type="email"
            defaultValue={user?.email}
            readOnly
            className="input input-bordered w-full bg-base-200"
            {...register("email", { value: user?.email })}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Phone Number</span>
          </label>
          <input
            type="number"
            defaultValue={student?.phoneNumber}
            readOnly
            className="input input-bordered w-full"
            {...register("phoneNumber", { required: true })}
          />
        </div>

        {/* Tuition Info */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Class/Grade</span>
          </label>
          <select
            className="select select-bordered w-full"
            {...register("class", { required: true })}
          >
            <option disabled selected>
              Select Class
            </option>
            <option>Class 1</option>
            <option>Class 2</option>
            <option>Class 3</option>
            <option>Class 4</option>
            <option>Class 5</option>
            <option>Class 6</option>
            <option>Class 7</option>
            <option>Class 8</option>
            <option>Class 9</option>
            <option>Class 10</option>
            <option>SSC Candidate</option>
            <option>HSC Candidate</option>
            <option>English Medium</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Subject</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Math, English, Physics"
            className="input input-bordered w-full"
            {...register("subject", { required: true })}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Preferred Tutor Gender
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register("tutorGender", { required: true })}
            >
              <option disabled selected>
                Select Gender
              </option>
              <option>Male</option>
              <option>Female</option>
              <option>Any</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Student Gender
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register("studentGender", { required: true })}
            >
              <option disabled selected>
                Select Gender
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Tutoring Time</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 4:00 PM - 6:00 PM"
            className="input input-bordered w-full"
            {...register("tutoringTime", { required: true })}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Salary Using (BDT)</span>
          </label>
          <input
            type="number"
            placeholder="e.g. 5000"
            className="input input-bordered w-full"
            {...register("salary", { required: true })}
          />
        </div>

        {/* Location */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Division</span>
          </label>
          <select
            className="select select-bordered w-full"
            {...register("division", { required: true })}
            onChange={handleDivisionChange}
          >
            <option disabled selected value="">
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
          <label className="label">
            <span className="label-text font-semibold">District</span>
          </label>
          <select
            className="select select-bordered w-full"
            {...register("district", { required: true })}
            disabled={districts.length === 0}
          >
            <option disabled selected value="">
              Select District
            </option>
            {districts.map(dist => (
              <option key={dist.district_id} value={dist.district_id}>
                {dist.district_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control flex flex-col">
          <label className="label">
            <span className="label-text font-semibold">Full Address</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            placeholder="address..."
            {...register("address", { required: true })}
          ></textarea>
        </div>

        <div className="form-control flex flex-col">
          <label className="label">
            <span className="label-text font-semibold">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            placeholder="description..."
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="form-control md:col-span-2 mt-3">
          <button
            type="submit"
            className="btn btn-primary w-full text-white text-lg"
          >
            Post Tuition
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTuition;
