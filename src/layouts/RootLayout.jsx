import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RootLayout = () => {
    return (
        <div className="min-h-screen max-w-[1440px] mx-auto flex flex-col font-sans text-base-content bg-base-100 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>            
            <Footer />
        </div>
    );
};

export default RootLayout;
