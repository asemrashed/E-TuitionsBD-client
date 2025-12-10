import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Loading from '../utils/loading/Loading';
import useAxiosSecure from '../hooks/useAxiosSecure';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5 }
    }
};

const TutorProfiles = () => {
    const axiosSecure = useAxiosSecure();
    const {data: tutors=[], isLoading}= useQuery({
        queryKey:["tutors"],
        queryFn: async()=>{
            const res= await axiosSecure.get("/tutors");
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
                <h3 className="mb-8 text-3xl font-bold text-center text-base-content dark:text-primary-content">New Tutors</h3>
                <motion.div
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {tutors.map((tutor) => (
                        <motion.div
                            key={tutor._id}
                            className="flex flex-col items-center rounded-lg bg-base-200 p-6 text-center shadow-lg hover:shadow-xl transition-all border border-base-300 dark:border-none"
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                        >
                            <img
                                alt={`Profile of ${tutor.displayName}`}
                                className="h-24 w-24 rounded-full object-cover ring-4 ring-primary/20"
                                src={tutor.photoURL}
                            />
                            <p className="mt-4 text-lg font-bold text-base-content dark:text-primary-content">{tutor.displayName}</p>
                            <p className="text-sm text-base-content/70">{tutor.email}</p>
                            <p className="mt-2 text-sm text-base-content/70">{tutor.district || 'not added'}</p>
                            <button className="mt-4 w-full rounded-lg bg-primary py-2 text-center font-semibold text-primary-content transition-colors hover:bg-secondary">
                                See
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TutorProfiles;
