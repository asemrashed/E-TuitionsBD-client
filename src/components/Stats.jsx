import { motion } from 'framer-motion';

const stats = [
    { value: "10,000+", label: "Registered Tutors" },
    { value: "50,000+", label: "Total Applications" },
    { value: "2,500+", label: "Live Tuition Jobs" },
    { value: "62,500+", label: "Total Stakeholders" },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

const Stats = () => {
    return (
        <section className="py-16 pt-0">
            <div className="container mx-auto px-6">
                <motion.div
                    className="grid grid-cols-2 gap-6 md:grid-cols-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col gap-1 rounded-lg bg-base-300 p-6 text-center hover:scale-105 transition-transform duration-300"
                            variants={itemVariants}
                        >
                            <p className="text-3xl md:text-4xl font-bold text-base-content dark:text-primary-content">{stat.value}</p>
                            <p className="text-sm font-medium text-base-content/90">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Stats;
