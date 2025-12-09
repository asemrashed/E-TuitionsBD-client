import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans text-base-content bg-base-100 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    );
};

export default RootLayout;
