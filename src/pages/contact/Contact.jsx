import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {
    const handleSendMessage = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'We will get back to you soon.',
            showConfirmButton: false,
            timer: 1500
        });
        e.target.reset();
    }

  return (
    <div className="min-h-screen bg-base-100 text-content-dark py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-base-200 p-8 rounded-2xl shadow-lg h-fit">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <p className="mb-8 text-gray-500">
              Have questions about finding a tutor or becoming one? We're here to
              help! Reach out to us through any of these channels.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl">
                  <FaPhone />
                </div>
                <div>
                  <h3 className="font-bold">Phone</h3>
                  <p className="text-gray-500">+880 1234 567890</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl">
                  <FaEnvelope />
                </div>
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="text-gray-500">support@tuitionsbd.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 className="font-bold">Office</h3>
                  <p className="text-gray-500">
                    123/A, Dhanmondi, Dhaka-1209, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-base-100 p-8 rounded-2xl shadow-lg border border-base-200">
            <h2 className="text-2xl font-bold mb-6">Send Message</h2>
            <form onSubmit={handleSendMessage} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Message</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32 w-full"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full text-white">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;