import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { MdLocationOn, MdBook, MdPaid, MdPerson, MdSchedule } from 'react-icons/md';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Loading from '../utils/loading/Loading';
import PrimaryBtn from '../utils/buttons/PrimaryBtn';
import TuitionCard from './tutor/tuition/TuitionCard';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const TuitionPosts = () => {
    const axiosSecure= useAxiosSecure();
    const {data: tuitions=[], isLoading}= useQuery({
        queryKey:["latest-tuitions"],
        queryFn: async()=>{
            const res= await axiosSecure.get("/latest-tuitions?limit=3");
            console.log(res.data);
            return res.data;
        }
    })
    if(isLoading){
        return <Loading/>
    }
    return (
        <section className="pb-16 bg-base-100">
            <div className="container mx-auto px-6">
                <div className="flex justify-between">
                    <h3 className="mb-8 text-2xl md:text-3xl font-bold text-center text-base-content dark:text-primary-content">Latest Tuition Posts</h3>
                    <PrimaryBtn value="See More" url="/tuitions"/>
                </div>
                <motion.div
                    className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {tuitions.map((tuition) => (
                        <TuitionCard key={tuition._id} tuition={tuition}/>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TuitionPosts;
