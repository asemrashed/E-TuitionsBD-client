import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';

const AllTuitions = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                {/* Search Bar (Left w-1/4 roughly) */}
                <div className="w-full md:w-1/4 relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search tuitions..."
                        className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary focus:outline-none rounded-lg"
                    />
                </div>

                {/* Title or Spacer */}
                <h2 className="text-2xl font-bold hidden md:block">All Tuitions</h2>

                {/* Sort/Categories (Right w-1/4 roughly) */}
                <div className="w-full md:w-1/4 relative">
                    <select className="select select-bordered w-full rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
                        <option disabled selected>Sort by Category</option>
                        <option>Class 1-5</option>
                        <option>Class 6-8</option>
                        <option>Class 9-10</option>
                        <option>Class 11-12</option>
                        <option>English Medium</option>
                    </select>
                    <FiFilter className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none hidden md:block" />
                </div>
            </div>

            {/* Grid Content Placeholder */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Placeholder Cards */}
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="card bg-base-200 shadow-xl border border-base-300">
                        <div className="card-body">
                            <h2 className="card-title text-primary">Tuition Job #{item}</h2>
                            <p>Need a tutor for Class 10 Math & Physics.</p>
                            <div className="card-actions justify-end mt-4">
                                <button className="btn btn-sm btn-primary">View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default AllTuitions;
