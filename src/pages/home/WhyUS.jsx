import { MdVerified, MdTune, MdSecurity, MdBook, MdPayment, MdLaptop } from "react-icons/md";
import PrimaryBtn from "../../utils/buttons/PrimaryBtn";

const feature = [
  {
    id:1,
    title:"Expert Tutors",
    description:"Learn from vetted professionals and experts from top universities worldwide who are passionate about teaching.",
    icon:<MdVerified size={32} />
  },
  {
    id:2,
    title:"Flexible Timing",
    description:"Schedule your lessons according to your convenience. Learning that fits your lifestyle perfectly.",
    icon:<MdTune size={32} />
  },
  {
    id:3,
    title:"Affordable Fees",
    description:"Quality education shouldn't break the bank. Get premium tutoring at competitive and transparent rates.",
    icon:<MdPayment size={32} />
  },
  {
    id:4,
    title:"Tailored Learning",
    description:"Get a curriculum adapted specifically to your learning style, pace, and goals.",
    icon:<MdBook size={32} />
  },
  {
    id:5,
    title:"Online Learning",
    description:"Access to quality education from the comfort of your home.",
    icon:<MdLaptop size={32} />
  },
  {
    id:6,
    title:"Secure Platform",
    description:"We adhere to the highest safety and quality standards for your peace of mind.",
    icon:<MdSecurity size={32} />
  }
]

const WhyChooseUs = () => {
  return (
    <section className="container mx-auto p-6 md:p-10 text-[#111418]">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
          Why Choose Us
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Discover why our platform is the best choice for your education or teaching journey.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {feature.map((item) => (
          <div key={item.id} className="group flex flex-col rounded-md p-2 md:p-4 bg-base-200">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-16 h-16 rounded-xl ${item.id % 2 !== 0 ? "bg-primary" : "bg-secondary"} text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition`}>
                {item.icon}
            </div>
            <span className="text-gray-400 text-lg font-medium">{item.id}</span>
          </div>
          <h3 className="text-xl text-base-content font-bold mb-3">
            {item.title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            {item.description}
          </p>
        </div>
        ))}

      </div>

      {/* CTA */}
      {/* <div className="mt-14 flex justify-center">
        <PrimaryBtn to="/tutors" value="Find a Tutor Now" />
      </div> */}
    </section>
  );
};

export default WhyChooseUs;
