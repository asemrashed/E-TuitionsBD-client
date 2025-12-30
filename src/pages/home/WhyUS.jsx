import { MdVerified, MdTune, MdSecurity } from "react-icons/md";

const WhyChooseUs = () => {
  return (
    <section className="w-full max-w-5xl mx-auto p-6 md:p-10 bg-base-100 dark:bg-[#101722] text-[#111418] dark:text-white">
      
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-3">
          Why Choose Us
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-base-content tracking-tight">
          Why Choose Us
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <div className="group flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div className="w-16 h-16 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition">
              <MdVerified size={32} />
            </div>
            <span className="text-gray-400 text-lg font-medium">01</span>
          </div>
          <h3 className="text-xl text-base-content font-bold mb-3">
            Quality Tutors
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Learn from vetted professionals and experts from top universities worldwide who are passionate about teaching.
          </p>
        </div>

        {/* Card 2 */}
        <div className="group flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div className="w-16 h-16 rounded-xl bg-secondary text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition">
              <MdTune size={32} />
            </div>
            <span className="text-gray-400 text-lg font-medium">02</span>
          </div>
          <h3 className="text-xl text-base-content font-bold mb-3">
            Tailored Learning
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Get a curriculum adapted specifically to your learning style, pace, and goals. Your journey reflects your unique needs.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div className="w-16 h-16 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition">
              <MdSecurity size={32} />
            </div>
            <span className="text-gray-400 text-lg font-medium">03</span>
          </div>
          <h3 className="text-xl text-base-content font-bold mb-3">
            Secure Platform
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Your well-being is at the heart of everything we do. We adhere to the highest safety and quality standards.
          </p>
        </div>
      </div>

      {/* CTA */}
      {/* <div className="mt-14 flex justify-center">
        <button className="h-14 px-8 rounded-xl bg-primary text-white text-lg font-bold shadow-lg hover:bg-[#1a6ce0] active:scale-[0.98] transition-all w-full md:w-auto min-w-[200px]">
          Find a Tutor Now
        </button>
      </div> */}
    </section>
  );
};

export default WhyChooseUs;
