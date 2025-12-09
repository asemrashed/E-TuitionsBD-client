import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';

const AllTutors = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                {/* Search Bar (Left w-1/4) */}
                <div className="w-full md:w-1/4 relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search tutors..."
                        className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary focus:outline-none rounded-lg"
                    />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold hidden md:block">Find Tutors</h2>

                {/* Sort/Categories (Right w-1/4) */}
                <div className="w-full md:w-1/4 relative">
                    <select className="select select-bordered w-full rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
                        <option disabled selected>Filter by Subject</option>
                        <option>Mathematics</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>English</option>
                        <option>Biology</option>
                    </select>
                </div>
            </div>

            {/* Grid Content Placeholder */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Placeholder Cards */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div key={item} className="flex flex-col items-center rounded-lg bg-base-200 p-6 text-center shadow-lg hover:shadow-xl transition-all border border-base-300">
                        <div className="avatar mb-4">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={`https://i.pravatar.cc/150?img=${item + 10}`} alt="avatar" />
                            </div>
                        </div>
                        <h2 className="font-bold text-lg">Tutor Name {item}</h2>
                        <p className="text-sm text-base-content/70">Expert in Math & Science</p>
                        <button className="btn btn-sm btn-outline btn-primary mt-4 w-full">View Profile</button>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default AllTutors;
