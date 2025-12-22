import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../utils/loading/Loading";
import { FaMoneyBillWave } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const Payments = () => {
    const axiosSecure = useAxiosSecure();
    const user = useAuth()
    const {role, isLoading:roleLoading} = useRole()
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.user?.email}&role=${role}`);
            return res.data;
        }
    });

    if (isLoading || roleLoading) return <Loading />;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <FaMoneyBillWave className="text-primary" />
                PAYMENT HISTORY
            </h1>

            <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
              <div className="w-full">
                <ul className="hidden md:grid grid-cols-[60px_1.5fr_1fr_1.5fr_1fr] px-4 py-3 bg-base-300 font-semibold rounded-t-lg">
                    <li>#</li>
                    {role === 'tutor' ? (
                        <li>Student Email</li>
                    ) : (
                        <li>Tutor Email</li>
                    )}
                    <li>Amount</li>
                    <li>Trx ID</li>
                    <li>Date</li>
                </ul>

                <div>
                   {payments.map((payment, index) => (
                       <ul key={payment._id} className="grid grid-cols-1 md:grid-cols-[60px_1.5fr_1fr_1.5fr_1fr] gap-2 md:gap-0 px-4 py-4 border-b border-base-300 items-center">
                           <li className="font-bold md:order-1 flex justify-between md:block">
                               <span className="md:hidden">SL:</span>
                               <span>{index + 1}</span>
                           </li>
                           {role === 'tutor' ? (
                               <li className="md:order-2 break-all flex justify-between md:block">
                                   <span className="md:hidden font-semibold">Student:</span>
                                   <span>{payment.studentEmail || "N/A"}</span>
                               </li>
                           ) : (
                               <li className="md:order-2 break-all flex justify-between md:block">
                                   <span className="md:hidden font-semibold">Tutor:</span>
                                   <span>{payment.tutorEmail || "N/A"}</span>
                               </li>
                           )}
                           <li className="font-bold text-success md:order-4 flex justify-between md:block">
                               <span className="md:hidden">Amount:</span>
                               <span>{(payment.amount / 100).toFixed(2)} {payment.currency?.toUpperCase()}</span>
                           </li>
                           <li className="text-sm font-mono md:order-5 break-all flex justify-between md:block">
                               <span className="md:hidden font-semibold">Trx ID:</span>
                               <span>{payment.transectionId}</span>
                           </li>
                           <li className="text-sm text-gray-500 md:order-6 flex justify-between md:block">
                               <span className="md:hidden font-semibold">Date:</span>
                               <span>{new Date(payment.createdAt).toLocaleDateString()}</span>
                           </li>
                       </ul>
                   ))}
                   {payments.length === 0 && (
                       <div className="text-center py-8 text-gray-500">
                           No payments found.
                       </div>
                   )}
                </div>
              </div>
            </div>
        </div>
    );
};

export default Payments;
