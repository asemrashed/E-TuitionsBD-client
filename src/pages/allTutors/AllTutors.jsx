import { FiSearch } from 'react-icons/fi';
import TutorCard from '../../components/tutor/TutorCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../utils/loading/Loading';

const AllTutors = () => {
  const axiosSecure = useAxiosSecure();
  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors");
      // console.log(res.data);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
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
                    <div
          className="grid grid-cols-1 gap-6 md:gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
            {tutors.map(tutor => (
              <TutorCard key={tutor._id} tutor={tutor} />
            ))}
            
        </div>
        </div>
    );
};

export default AllTutors;
