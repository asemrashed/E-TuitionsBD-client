import { motion } from 'framer-motion';

const tutors = [
    {
        name: "Jane Doe",
        institution: "Dhaka University",
        location: "Dhaka, Bangladesh",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7nofJ-BoPl0aojQ9RyFjoW6zrC-ORs6Zaz7Leks7c90ihHzDnocBAIRKVhGoN_v3n1-7DqKQe7OUW-57UEBn6fRnlI0pLz2YScYnxomEGnj-sF-3tzRNkzQXybTduPbGIQi6An4DO9h_MppKuzIy2oRhyQQt_1RtesmwcorFa38YfxOZGEuFRdAp4LyLa8rXEDdpuMEcM9aBaKEQM2kzy-r1mXurxAYJMXYcu2CYQw3dkDy9g23qpbJ9Sz-0u9_jdWYmesHiUow"
    },
    {
        name: "John Smith",
        institution: "BUET",
        location: "Chittagong, Bangladesh",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjtwwdlqQTVsaYEbALG85fHmKplSbdchgc3aJTOMcpWVFBoUpzDRVuvW1b8FzUkCCuuPnr0eGNncpTM9SFyUBNjB7n06D2Dz4gqZJ_0Fjq_XKRIYe71GD0im-vvZuo_txzVWPdpgpVVS_Wrd3fvAuRwdUY4Lx42CC8BubmUWZK0Q-2ho1BsN0h5oTQujX65kVtpQU33Y9Xze5_kjTE6wOcgnFevrEL6N-uBk-y61iVJ1FPhooIz9M7WikYl1bgKS-vGTI3lfgusQ"
    },
    {
        name: "Emily Johnson",
        institution: "Dhaka Medical College",
        location: "Sylhet, Bangladesh",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-qoCtlqAoBO0AtS7Fiuw2HtlweGBH14OWYGQBkgnUdo-virJPbXHfGCnan2_uPuZMM63eazPv-wP1yJbh0NgmqyBZ20DxIi3U3NKZYv3MIqXbmpFXaE1uYW9Jk4e-Qlutaza_qLwcy7FQKTn89eheMjL5qaRMYQPqQ71sOlwR2j14T3C1zbXWCfeFhNIGWyrP4D-nk8eMM0QitidHlg8hUyClS4LXdOhCXFtNsvURD7XBEX2hKSTGiJ750R6NCFH6SfW32hWBdQ"
    },
    {
        name: "Michael Brown",
        institution: "North South University",
        location: "Dhaka, Bangladesh",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjIHitt16kiQ3jzyI3ZiwRPcIRn5t5n64JLXmcfRaTNuVLMFQXFcE6WFThNqo5QKjf-TprMdk7lAXPOT0C-F7xtB03jdqC7GTxkRGgAGdvuP4Sp0JFgQpH9TXpq9-m9IwPkKxOrzAGIzbhQSWCNA6QOb0KMMh1ttNlT4-n1m7hTcElZzeiy8oCr9rOsoP2FSIoj-yHvQcTejPBlV1yZFsqKznzk2ZJd8oZMGbcmQr5dlNLtVjiASPPLsoLETPfDiSRsLE6hgjLpA"
    }
];

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
                    {tutors.map((tutor, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center rounded-lg bg-base-200 p-6 text-center shadow-lg hover:shadow-xl transition-all border border-base-300 dark:border-none"
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                        >
                            <img
                                alt={`Profile of ${tutor.name}`}
                                className="h-24 w-24 rounded-full object-cover ring-4 ring-primary/20"
                                src={tutor.image}
                            />
                            <p className="mt-4 text-lg font-bold text-base-content dark:text-primary-content">{tutor.name}</p>
                            <p className="text-sm text-base-content/70">{tutor.institution}</p>
                            <p className="mt-2 text-sm text-base-content/70">{tutor.location}</p>
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
