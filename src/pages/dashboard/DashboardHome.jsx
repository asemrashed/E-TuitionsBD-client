import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../utils/loading/Loading";
import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen, FaMoneyBillWave } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    const chartData = stats.revenueHistory?.map(item => ({
        date: item._id,
        revenue: item.revenue / 100 
    })) || [];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="stat bg-base-100 shadow rounded-xl border border-base-200">
                    <div className="stat-figure text-primary">
                        <FaUserGraduate className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Students</div>
                    <div className="stat-value text-primary">{stats.totalStudents}</div>
                </div>
                
                <div className="stat bg-base-100 shadow rounded-xl border border-base-200">
                    <div className="stat-figure text-secondary">
                        <FaChalkboardTeacher className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Tutors</div>
                    <div className="stat-value text-secondary">{stats.totalTutors}</div>
                </div>
                
                <div className="stat bg-base-100 shadow rounded-xl border border-base-200">
                    <div className="stat-figure text-accent">
                        <FaBookOpen className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Tuitions</div>
                    <div className="stat-value text-accent">{stats.totalTuitions}</div>
                </div>
                
                <div className="stat bg-base-100 shadow rounded-xl border border-base-200">
                    <div className="stat-figure text-success">
                        <FaMoneyBillWave className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Earnings</div>
                    <div className="stat-value text-success">৳ {(stats.totalRevenue / 100).toFixed(2)}</div>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-base-100 p-6 rounded-xl shadow border border-base-200 mb-8">
                <h2 className="text-xl font-bold mb-4">Platform Earnings View</h2>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="revenue" fill="#8884d8" name="Revenue (BDT)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
