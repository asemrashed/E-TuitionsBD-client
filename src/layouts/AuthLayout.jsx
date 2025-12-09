import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex bg-base-100 relative overflow-hidden">
            {/* Mobile Background Image (Blurry) */}
            <div
                className="absolute inset-0 z-0 lg:hidden bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80')",
                    filter: "blur(8px) brightness(0.6)"
                }}
            />

            {/* Content Section (Left on Desktop, Centered on Mobile) */}
            <motion.div
                className="w-full lg:w-1/2 z-10 flex flex-col justify-center px-8 md:px-16"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-8 text-center lg:text-left">
                    <Link to="/" className="font-logo text-4xl font-bold text-primary dark:text-primary lg:text-primary-content mix-blend-difference">
                        E-TuitionBD
                    </Link>
                </div>

                <div className="bg-base-200/90 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-8 rounded-2xl shadow-xl lg:shadow-none">
                    <Outlet />
                </div>
            </motion.div>

            {/* Image Section (Right on Desktop) */}
            <motion.div
                className="hidden lg:block w-1/2 relative bg-primary/5"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
                    alt="Student Learning"
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-base-100/50" />
            </motion.div>
        </div>
    );
};

export default AuthLayout;
