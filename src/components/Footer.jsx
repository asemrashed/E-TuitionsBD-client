import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/logo.png";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content p-10 mt-12">
            <div className="footer flex justify-between max-w-7xl mx-auto">
                <nav>
                    <Link to="/" className="flex items-center gap-3">
                        <img src={logo} alt="Logo" className="h-10 w-10 rounded-md object-cover" />
                        <h1 className="font-logo text-2xl font-bold text-primary">E-TuitionBD</h1>
                    </Link>
                </nav>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <Link to="/tuitions" className="link link-hover">Tuitions</Link>
                    <Link to="/tutors" className="link link-hover">Find Tutors</Link>
                    <Link to="/contact" className="link link-hover">Contact</Link>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <Link to="/contact" className="link link-hover">Contact</Link>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl">
                            <FaXTwitter />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl">
                            <FaFacebook />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-2xl">
                            <FaInstagram />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-2xl">
                            <FaLinkedin />
                        </a>
                    </div>
                </nav>
            </div>
            <div className="footer footer-center p-4 border-t border-base-300 text-base-content mt-10">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by E-TuitionsBD</p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;
