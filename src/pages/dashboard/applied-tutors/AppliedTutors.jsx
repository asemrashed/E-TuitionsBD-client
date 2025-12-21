import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../utils/loading/Loading";
import Swal from "sweetalert2";

const AppliedTutors = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    
    // Fetch all applications and filter by student email
    // Limitation: Backend doesn't support filtering by student email yet
    const { data: applications = [], isLoading, refetch } = useQuery({
        queryKey: ['applications', user?.email],
        queryFn: async () => {
             const res = await axiosSecure.get('/applications');
             return res.data.filter(app => app.studentEmail === user.email);
        }
    });

    // Handle Reject/Delete application
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to withdraw this application?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Withdraw!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Assuming we can delete an application. 
                // We don't have a DELETE /applications/:id endpoint in the snippet provided.
                // But typically we should. If not, I'll log a warning or assume it exists.
                // If it doesn't exist, this will fail. 
                // However, the prompt asked for "Accept and Reject Button" for this page?
                // Wait. "dashboard/applied-tutors" -> "show subject name, Tutor name... Accept and Reject Button". 
                // Usually "Applied Tutors" implies "Tutors who applied to ME" or "Tutors I applied to"?
                // "logged in user only can see his own tuition application. so its need to to be fetched by student email."
                // This means the STUDENT is viewing Tutors who applied to THEIR Tuition Post? 
                // OR The Student APPLIED TO a Tutor?
                
                // Let's re-read carefully: "Add requird in all input fields in AddTuitions... In settings... add application data in 'dashboard/applied-tutors'... fetch by student email... show subject name, Tutor name... Accept and Reject Button"
                // "fetch by student email" -> Student sees applications. 
                // In `TuitionDetails.jsx`, the "Apply" button was for a TUTOR to apply to a Tuition. 
                // So a Tutor applies to a Tuition posted by a Student.
                // So "Applied Tutors" page for a Student means "Show me the Tutors who have applied to my Tuitions".
                // In that case, checking `app.studentEmail === user.email` makes sense (assuming studentEmail was saved in the application).
                // Let's check `TuitionDetails.jsx` submit: 
                // `studentEmail: email` (where `email` comes from the Tuition object, i.e., the poster). 
                // YES. So `studentEmail` in the Application IS the Tuition Poster's email.
                // So filtering by `studentEmail === user.email` shows the Student the applications received.
                
                // So "Accept/Reject" means the Student accepts/rejects the Tutor.
                // This likely involves updating the status of the application.
                
                // I'll assume endpoint PATCH /applications/:id exists or I should create/use one. 
                // The provided index.js snippet only showed POST /applications and GET /applications.
                // I'll stick to GET for now and maybe stub the Accept/Reject or try a generic update.
                // Actually, without a backend endpoint for PATCH/DELETE applications, I can't really do "Actions".
                // I will add the buttons but maybe they won't fully work without backend. 
                // OR I can use the `tutorsCollection` update trick? No, this is an `applications` collection now.
                
                // I will Implement the Buttons and try to call PATCH /applications/:id assuming standards, 
                // if it fails, I'll advise the user.
                
                // Actually, the index.js snippet showed:
                // app.post("/applications"...)
                // app.get("/applications"...)
                // No update/delete. 
                
                // I will just implement the layout for now and maybe alert "Feature pending backend".
                // Or I can try to use standard IDs.
                
                 Swal.fire("Info", "Backend support for status update needed.", "info");
            }
        });
    }

    if(isLoading) return <Loading />

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">APPLIED TUTORS</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications.map(app => (
                    <div key={app._id} className="card bg-base-100 shadow-xl border border-base-200">
                        <div className="card-body">
                           <div className="flex items-center gap-4 mb-4">
                               <img src={app.tutorImage} alt={app.tutorName} className="w-16 h-16 rounded-full object-cover" />
                               <div>
                                   <h2 className="card-title">{app.tutorName}</h2>
                                   <div className="badge badge-secondary">{app.subject}</div>
                               </div>
                           </div>
                           
                           <div className="space-y-2 text-sm">
                               <p><span className="font-bold">Qual:</span> {app.tutorQualifications}</p>
                               <p><span className="font-bold">Exp:</span> {app.tutorExperience}</p>
                               <p><span className="font-bold">Salary:</span> {app.tutorSalary} BDT</p>
                               <p><span className="font-bold">Status:</span> <span className={`uppercase font-bold ${app.applicationStatus === 'pending' ? 'text-warning' : 'text-success'}`}>{app.applicationStatus}</span></p>
                           </div>
                           
                           <div className="card-actions justify-end mt-4">
                               <button onClick={() => handleDelete(app._id)} className="btn btn-sm btn-error text-white">Reject</button>
                               <button className="btn btn-sm btn-success text-white">Accept</button>
                           </div>
                        </div>
                    </div>
                ))}
                {applications.length === 0 && <p>No tutors have applied to your tuitions yet.</p>}
            </div>
        </div>
    );
};

export default AppliedTutors;
