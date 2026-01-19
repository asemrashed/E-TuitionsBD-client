import { MdPeople, MdVerified, MdHistory } from "react-icons/md";

const AboutUs = () => {
    return (
        <div className="bg-base-100 min-h-screen">
            {/* Hero Section */}
            <div className="bg-secondary/30 text-primary-content py-6 md:pt-12">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h1 className="text-3xl md:5xl font-bold text-center text-primary mb-3">About Us</h1>
                    <p className="text-base md:text-lg max-w-2xl mx-auto opacity-90">
                        Bridging the gap between knowledge and those who seek it. We are dedicated to making quality education accessible to everyone.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-2xl md:4xl font-bold text-base-content mb-6">Our Mission</h2>
                        <p className="text-base-content mb-6 leading-relaxed">
                            At E-TuitionsBD, we believe that every student deserves a tutor who understands their unique learning needs. Our mission is to create a seamless, secure, and effective platform where students can find the best mentors to achieve their academic goals.
                        </p>
                        <p className="text-base-content leading-relaxed">
                            Whether you need help with school curriculum, test preparation, or skill development, we are here to connect you with the right experts.
                        </p>
                    </div>
                    <div className="bg-base-200 rounded-2xl h-80 flex items-center justify-center">
                        {/* Placeholder for an image */}
                        <span className="text-gray-400 font-medium text-lg">Mission Image / Illustration</span>
                    </div>
                </div>
            </div>

            {/* Stats/Values Section */}
            <div className="bg-base-200 py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 bg-base-100 rounded-xl shadow-sm">
                            <MdPeople className="w-12 h-12 mx-auto text-primary mb-4" />
                            <h3 className="text-xl font-bold mb-2">Community First</h3>
                            <p className="text-gray-500">Building a supportive community of learners and educators.</p>
                        </div>
                        <div className="p-6 bg-base-100 rounded-xl shadow-sm">
                            <MdVerified className="w-12 h-12 mx-auto text-secondary mb-4" />
                            <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
                            <p className="text-gray-500">Ensuring every tutor meets our high standards of excellence.</p>
                        </div>
                        <div className="p-6 bg-base-100 rounded-xl shadow-sm">
                            <MdHistory className="w-12 h-12 mx-auto text-accent mb-4" />
                            <h3 className="text-xl font-bold mb-2">Proven Track Record</h3>
                            <p className="text-gray-500">Years of experience in connecting students with success.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
