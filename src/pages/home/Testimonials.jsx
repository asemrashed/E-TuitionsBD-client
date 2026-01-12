import { useState } from 'react';
import { MdFormatQuote, MdArrowBack, MdArrowForward } from "react-icons/md";

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Parent",
            text: "E-TuitionsBD has been a game-changer for my son's math grades. The tutor we found is patient, knowledgeable, and incredibly effective.",
            image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        },
        {
            id: 2,
            name: "Ahmed Rahman",
            role: "A-Level Student",
            text: "The flexibility to schedule classes around my other commitments is amazing. I managed to cover my entire syllabus in just 3 months!",
            image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        },
        {
            id: 3,
            name: "Fatima Begum",
            role: "University Student",
            text: "Finding a tutor for advanced physics was so hard until I used this platform. Highly recommended for anyone looking for specific expertise.",
            image: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-20 bg-base-200">
            <div className="max-w-4xl mx-auto px-6 text-center">
                 <div className="mb-12">
                     <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">What Our Students Say</h2>
                     <p className="text-gray-500">Trusted by hundreds of students and parents across the country.</p>
                 </div>

                <div className="relative bg-base-100 rounded-2xl shadow-xl p-8 md:p-12">
                    <MdFormatQuote className="text-6xl text-primary/20 absolute top-8 left-8" />
                    
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-6 ring-4 ring-primary/20">
                            <img 
                                src={testimonials[activeIndex].image} 
                                alt={testimonials[activeIndex].name} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        <blockquote className="text-xl md:text-2xl font-medium text-base-content mb-8 italic">
                            "{testimonials[activeIndex].text}"
                        </blockquote>

                        <div>
                            <h4 className="text-lg font-bold text-base-content">{testimonials[activeIndex].name}</h4>
                            <p className="text-sm text-primary font-medium">{testimonials[activeIndex].role}</p>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                        <button 
                            onClick={prevTestimonial}
                            className="btn btn-circle btn-sm btn-ghost hover:bg-base-200"
                            aria-label="Previous testimonial"
                        >
                            <MdArrowBack size={20} />
                        </button>
                        <div className="flex gap-2 items-center">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        idx === activeIndex ? "w-8 bg-primary" : "w-2 bg-base-300"
                                    }`}
                                    aria-label={`Go to testimonial ${idx + 1}`}
                                />
                            ))}
                        </div>
                        <button 
                            onClick={nextTestimonial}
                            className="btn btn-circle btn-sm btn-ghost hover:bg-base-200"
                            aria-label="Next testimonial"
                        >
                            <MdArrowForward size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
