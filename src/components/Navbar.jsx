import { Link, NavLink } from 'react-router-dom';
import { FiSearch, FiMenu } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import logo from '../assets/logo.png';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const { user, userSignOut } = useAuth();

    const handleSignOut = async () => {
        try {
            await userSignOut();
        } catch (error) {
            console.error(error);
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Tuitions Listing', path: '/tuitions' },
        { name: 'Tutor Listing', path: '/tutors' },
        { name: 'Contact', path: '/contact' },
        { name: 'Dashboard', path: '/dashboard' },
    ];

    return (
        <div className="flex flex-col w-full z-50">
            <header className="sticky top-0 w-full bg-base-200/95 backdrop-blur shadow-lg shadow-black/5 z-50 transition-all duration-300">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between py-3 gap-4">
                        <Link to="/" className="flex items-center gap-3">
                            <img src={logo} alt="Logo" className="h-10 w-10 rounded-md object-cover" />
                            <h1 className="font-logo text-2xl font-bold text-primary">E-TuitionBD</h1>
                        </Link>

                        <div className="hidden md:block flex-1 w-full md:px-8 max-w-lg">
                            <div className="relative w-full">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search for tutors or subjects"
                                    className="input input-sm md:input-md w-full rounded-full border-0 bg-base-100 pl-10 pr-4 text-base-content placeholder:text-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                             {/* Mobile Menu Dropdown */}
                            <div className="md:hidden dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle">
                                    <FiMenu className="text-2xl" />
                                </label>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                     {navLinks.map((link) => (
                                        <li key={link.name}>
                                            <Link to={link.path}>{link.name}</Link>
                                        </li>
                                     ))}
                                     <li><Link to="/login">Sign In</Link></li>
                                     <li><Link to="/register">Sign Up</Link></li>
                                </ul>
                            </div>
                            
                            <ThemeToggle />
                            {user ? (
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="User" />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                        <li><Link to="/dashboard/profile">Dashboard</Link></li>
                                        <li><button onClick={handleSignOut}>Logout</button></li>
                                    </ul>
                                </div>
                            ) : (
                                <div className="hidden md:flex items-center gap-2">
                                    <Link to={'/login'} className="btn btn-sm btn-ghost text-primary font-semibold hover:bg-primary/10">Sign In</Link>
                                    <Link to={'/register'} className="btn btn-sm btn-primary text-primary-content font-semibold shadow-sm hover:bg-primary/90 border-none">Sign Up</Link>
                                </div>
                            )}
                        </div>
                    </div>

                    <nav className="hidden md:flex h-12 items-center justify-center border-t border-base-content/10 overflow-x-auto">
                        <ul className="flex h-full items-center gap-4 md:gap-8 text-base-content text-sm md:text-base whitespace-nowrap px-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `flex h-full items-center border-b-2 px-2 font-medium transition-colors ${isActive ? 'border-primary text-primary font-semibold' : 'border-transparent hover:border-primary hover:text-primary'}`
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default Navbar;
