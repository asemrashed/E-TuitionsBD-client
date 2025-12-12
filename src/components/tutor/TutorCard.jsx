import React from "react";
import { motion } from 'framer-motion'
import PrimaryOutlineBtn from "../../utils/buttons/PrimaryOutlineBtn";

function TutorCard({ tutor }) {
    
const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5 }
    }
};
  return (
    <motion.div
      className="flex flex-col items-center rounded-lg bg-base-100 p-6 text-center shadow-lg hover:shadow-xl transition-all border-1 border-primary border-base-300 dark:border-none"
      key={tutor._id}
      initial="hidden"
      whileInView="visible"
      variants={cardVariants}
      whileHover={{ y: -5 }}
    >
      <img
        alt={`Profile of ${tutor.displayName}`}
        className="h-27 w-27 rounded-full object-cover ring-4 ring-secondary/20"
        src={tutor.photoURL}
      />
      <p className="mt-4 text-lg font-bold text-primary">{tutor.displayName}</p>
      <p className="mt-2 text-sm text-base-content/70">{tutor.email}</p>
      <p className="my-2 text-sm text-base-content/70">
        {tutor.district || "not added"}
      </p>
      <PrimaryOutlineBtn value="See Profile" url={`/tutors/${tutor._id}`} />
    </motion.div>
  );
}

export default TutorCard;
