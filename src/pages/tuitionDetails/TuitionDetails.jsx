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
import { useQuery } from "@tanstack/react-query"
import Loading from "../../utils/loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TuitionDetails = () => {
  const axiosSecure = useAxiosSecure();
  const {id} = useParams();
  const { data: tuition={}, isLoading }= useQuery({
    queryKey: ['tuition', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/${id}`);
      return res.data;
    }
  })
  console.log(tuition);

  const {address, description, class: className, createdAt, district, email, number, salary, subject, tutorGender, tutoringTime, _id}= tuition
  const { data: student={}, isLoading: studentLoading }= useQuery({
    queryKey: ['student', email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${email}`);
      return res.data;
    }
  })
  console.log('studed', student);
  if(isLoading || studentLoading  ){
    return <Loading/>
  }
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-4">

      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-primary">
          Tuition Details
        </h1>
        <div className="flex flex-col items-end justify-center text-sm">
          <div className="flex items-center gap-1 text-primary text-sm font-semibold"><MdSchedule />Posted on</div>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        <InfoCard icon={<MdSchool />} label="Class">
          {className}
        </InfoCard>
        
        <InfoCard
          icon={<MdLocationOn />}
          label="District"
        >
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
          {tutorGender}
        </InfoCard>

        <InfoCard icon={<MdPhone />} label="Mobile Number" className="col-span-2 md:col-span-1">
          {number}
        </InfoCard>
      </div>
      <div className="bg-base-100 dark:bg-[#1a222d] border border-base-300 dark:border-gray-800 rounded-xl p-4">
        <h3 className="mb-2 flex items-center gap-2"><MdSubject className="text-primary"/> Description</h3>
        <p className="text-sm">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">

        <Link
          to="/dashboard/tuitions"
          className="btn btn-outline btn-sm"
        >
          Back
        </Link>

        <div className="hidden md:block" />

        <button className="btn btn-primary btn-sm text-white">
          Apply
        </button>
      </div>
    </div>
  );
};

export default TuitionDetails;