import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Loading from "../../utils/loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PrimaryBtn from "../../utils/buttons/PrimaryBtn";
import TutorCard from "../../components/tutor/TutorCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const LatestTutor = () => {
  const axiosSecure = useAxiosSecure();
  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors?limit=4");
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="pb-16 bg-base-200 py-10 rounded-lg">
      <div className="container mx-auto px-6">
        <div className="flex justify-between">
          <h3 className="mb-8 text-2xl md:text-3xl font-bold text-center text-base-content dark:text-primary-content">
            New Tutors
          </h3>
          <PrimaryBtn value="See More" url="/tutors" />
        </div>
        <motion.div
          className="grid grid-cols-1 gap-6 md:gap-10 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {tutors.map(tutor => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LatestTutor;
