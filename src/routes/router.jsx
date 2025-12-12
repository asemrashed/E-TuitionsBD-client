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
            { path: "tutors", element: <AllTutors /> },
            { path: "contact", element: <div>Contact Page</div> },
        ],
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            { path: "profile", element: <Profile /> },
            { path: "tuitions-list", element: <TuitionsManagement /> },
            { path: "users-list", element: <UsersManagement /> },
            { path: "my-tuitions", element: <MyTuitions /> },
            { path: "applied-tutors", element: <AppliedTutors /> },
            { path: "add-tuition", element: <AddTuition /> },
            { path: "payments", element: <Payments /> },
            { path: "my-applications", element: <MyApplications /> },
            { path: "ongoing-tuitions", element: <OngoingTuitions /> },
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
            }
        ]
    }
]);

export default router;
