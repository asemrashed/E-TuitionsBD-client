import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import TuitionCard from "../../components/tutor/tuition/TuitionCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../utils/loading/Loading";
import { FiFilter } from "react-icons/fi";

const AllTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: ["tuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tuitions");
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="w-full md:w-1/4 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tuitions..."
            className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary focus:outline-none rounded-lg"
          />
        </div>

        <h2 className="text-2xl font-bold hidden md:block">All Tuitions</h2>

        <div className="w-full md:w-1/4 relative">
          <select className="select select-bordered w-full rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
            <option disabled selected>
              Sort by Category
            </option>
            <option>Class 1-5</option>
            <option>Class 6-8</option>
            <option>Class 9-10</option>
            <option>Class 11-12</option>
            <option>English Medium</option>
          </select>
          <FiFilter className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none hidden md:block" />
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {tuitions.map(tuition => (
          <TuitionCard key={tuition._id} tuition={tuition} />
        ))}
      </motion.div>
    </div>
  );
};

export default AllTuitions;
