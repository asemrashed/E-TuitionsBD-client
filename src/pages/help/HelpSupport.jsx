import { Link } from 'react-router-dom';
import { MdQuestionAnswer, MdContactSupport, MdKeyboardArrowDown } from "react-icons/md";

const HelpSupport = () => {
    return (
        <div className="min-h-screen bg-base-100 pb-20">
             {/* Header */}
             <div className="bg-secondary/30 text-primary-content py-6 md:pt-12">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h1 className="text-3xl md:5xl font-bold text-center text-primary mb-3 md:mb-6">Help & Support</h1>
                    <p className="text-base md:text-lg max-w-2xl mx-auto opacity-90">
                        Find answers to common questions or get in touch with our team.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 mt-12">
                
                {/* FAQ Section */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <MdQuestionAnswer className="text-3xl text-primary" />
                        <h2 className="text-2xl font-bold text-base-content">Frequently Asked Questions</h2>
                    </div>

                    <div className="join join-vertical w-full bg-base-100 border border-base-200 rounded-xl">
                        <div className="collapse collapse-arrow join-item border-base-300 border-b">
                            <input type="radio" name="my-accordion-4" defaultChecked /> 
                            <div className="collapse-title text-xl font-medium">
                                How do I find a tutor?
                            </div>
                            <div className="collapse-content"> 
                                <p className="text-gray-600">You can browse our "Tutors" page to see a list of available tutors. You can filter by subject, location, and price. Once you find a suitable tutor, you can view their profile and contact them directly or book a session.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow join-item border-base-300 border-b">
                            <input type="radio" name="my-accordion-4" /> 
                            <div className="collapse-title text-xl font-medium">
                                How are payments handled?
                            </div>
                            <div className="collapse-content"> 
                                <p className="text-gray-600">All payments are processed securely through our platform. You can pay for sessions individually or buy packages. We support major credit cards and mobile financial services.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow join-item border-base-300 border-b">
                            <input type="radio" name="my-accordion-4" /> 
                            <div className="collapse-title text-xl font-medium">
                                Can I become a tutor?
                            </div>
                            <div className="collapse-content"> 
                                <p className="text-gray-600">Yes! If you have the expertise and passion for teaching, you can register as a tutor. Navigate to the registration page, select "Tutor", and complete your profile. Our team will verify your credentials.</p>
                            </div>
                        </div>
                         <div className="collapse collapse-arrow join-item border-base-300">
                            <input type="radio" name="my-accordion-4" /> 
                            <div className="collapse-title text-xl font-medium">
                                What if I'm not satisfied with a session?
                            </div>
                            <div className="collapse-content"> 
                                <p className="text-gray-600">We prioritize your satisfaction. If you encounter any issues, please report it to our support team within 24 hours of the session. We will investigate and offer a refund or credit if applicable.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Redirection Section */}
                <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center border border-primary/10">
                    <MdContactSupport className="text-5xl text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-base-content mb-3">Still need help?</h2>
                    <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                        Our support team is just a click away. Reach out to us for personalized assistance.
                    </p>
                    <Link to="/contact" className="btn btn-primary px-8 text-lg">
                        Contact Us
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default HelpSupport;
