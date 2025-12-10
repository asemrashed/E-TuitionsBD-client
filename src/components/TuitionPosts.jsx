import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { MdLocationOn, MdBook, MdPaid, MdPerson, MdSchedule } from 'react-icons/md';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Loading from '../utils/loading/Loading';
import PrimaryBtn from '../utils/buttons/PrimaryBtn';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const cardVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const TuitionPosts = () => {
    const axiosSecure= useAxiosSecure();
    const {data: tuitions=[], isLoading}= useQuery({
        queryKey:["tuitions"],
        queryFn: async()=>{
            const res= await axiosSecure.get("/latest-tuitions?limit=3");
            // console.log(res.data);
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
                    <h3 className="mb-8 text-3xl font-bold text-center text-base-content dark:text-primary-content">Latest Tuition Posts</h3>
                    <PrimaryBtn value="See More" url="/tuitions"/>
                </div>
                <motion.div
                    className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {tuitions.map((tuition, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col justify-between rounded-lg bg-base-200 p-6 shadow-lg hover:shadow-xl transition-shadow border border-base-300 dark:border-none"
                            variants={cardVariants}
                            whileHover={{y: -5}}
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{tuition.class}</span>
                                <div className="flex flex-col gap-2 text-sm text-base-content/70">
                                    <span>ID: {tuition.id|| "232"}</span>
                                    <span>{new Date(tuition.createdAt).toLocaleTimeString()}</span>
                                </div>
                            </div>
                            <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-3">
                                <div className="col-span-2 flex items-start gap-3">
                                    <MdLocationOn className="mt-1 text-lg text-primary" />
                                    <div>
                                        <p className="font-semibold text-base-content dark:text-primary-content">{tuition.location}</p>
                                        <p className="text-sm text-base-content/70">{tuition.address},{tuition.district}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MdBook className="mt-1 text-lg text-primary" />
                                    <div>
                                        <p className="font-semibold text-base-content dark:text-primary-content">Subjects</p>
                                        <p className="text-sm text-base-content/70">{tuition.subject}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MdPaid className="mt-1 text-lg text-primary" />
                                    <div>
                                        <p className="font-semibold text-base-content dark:text-primary-content">Tuition Fee</p>
                                        <p className="text-sm text-base-content/70">{tuition.salary}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MdPerson className="mt-1 text-lg text-primary" />
                                    <div>
                                        <p className="font-semibold text-base-content dark:text-primary-content">Tutor Gender</p>
                                        <p className="text-sm text-base-content/70">{tuition.tutorGender}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MdSchedule className="mt-1 text-lg text-primary" />
                                    <div>
                                        <p className="font-semibold text-base-content dark:text-primary-content">Tutoring Time</p>
                                        <p className="text-sm text-base-content/70">{tuition.tutoringTime}</p>
                                    </div>
                                </div>
                            </div>

                            <PrimaryBtn value="View Details" url={`/tuition/${tuition._id}`}/>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TuitionPosts;
