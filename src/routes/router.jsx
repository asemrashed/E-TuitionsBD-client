import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AllTuitions from '../pages/allTuitions/AllTuitions';
import AllTutors from '../pages/allTutors/AllTutors';
import Profile from '../pages/dashboard/profile/Profile';
import TuitionsManagement from '../pages/dashboard/tuitions-Management/TuitionsManagement';
import UsersManagement from '../pages/dashboard/users-management/UsersManagement';
import MyTuitions from '../pages/dashboard/my-tuitions/MyTuitions';
import AppliedTutors from '../pages/dashboard/applied-tutors/AppliedTutors';
import AddTuition from '../pages/dashboard/add-tuition/AddTuition';
import Payments from '../pages/dashboard/payments/Payments';
import MyApplications from '../pages/dashboard/my-applications/MyApplications';
import OngoingTuitions from '../pages/dashboard/ongoing-tuitions/OngoingTuitions';
import Settings from '../pages/dashboard/settings/Settings';
import NotFound from '../pages/error/NotFound';
import TuitionDetails from '../pages/tuitionDetails/TuitionDetails';
import Success from '../pages/dashboard/payments/Success';
import Cancelled from '../pages/dashboard/payments/Cancelled';
import PrivetRoute from './PrivetRoute';
import AdminRoute from './AdminRoute';
import TutorRoute from './TutorRoute';
import StudentRoute from './StudentRouter';
import Contact from '../pages/contact/Contact';

import DashboardHome from '../pages/dashboard/DashboardHome';
import AdminLogin from '../pages/auth/AdminLogin';

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            { path: "tuitions", element: <AllTuitions /> },
            { path: "tuitions/:id", element: <TuitionDetails /> },
            { path: "tutors", element: <AllTutors /> },
            { path: "contact", element: <Contact /> }
        ],
    },
    {
        path: "/dashboard",
        element: <PrivetRoute><DashboardLayout /></PrivetRoute>,
        children: [
            { path: "", element: <AdminRoute><DashboardHome /></AdminRoute> }, 
            { path: "profile", element: <Profile /> },
            { path: "tuitions-list", element: <AdminRoute><TuitionsManagement /></AdminRoute> },
            { path: "users-list", element: <AdminRoute><UsersManagement /></AdminRoute> },
            { path: "my-tuitions", element: <StudentRoute><MyTuitions /></StudentRoute> },
            { path: "applied-tutors", element: <StudentRoute><AppliedTutors /></StudentRoute> },
            { path: "add-tuition", element: <StudentRoute><AddTuition /></StudentRoute> },
            { path: "payments", element: <Payments /> },
            { path: "payment-success", element: <Success /> },
            { path: "payment-cancelled", element: <Cancelled /> },
            { path: "my-applications", element: <TutorRoute><MyApplications /></TutorRoute> },
            { path: "ongoing-tuitions", element: <TutorRoute><OngoingTuitions /></TutorRoute> },
            { path: "settings", element: <Settings /> },
        ]
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/admin",
                element: <AdminLogin />,
            }
        ]
    }
]);

export default router;
