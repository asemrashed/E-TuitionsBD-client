const HowItWorks = () => {
  return (
    <section className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-16">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-4">
          How the Platform Works
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Connect with the perfect tutor or find eager students in just a few simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

        <div className="flex flex-col">
          <div className="bg-base-100 dark:bg-base-200 rounded-2xl shadow-lg p-6 mb-10 border-t-4 border-primary text-center">
            <h2 className="text-3xl font-bold font-display text-primary">
              Student
            </h2>
            <p className="text-gray-500 mt-1">Looking to learn?</p>
          </div>

          <div className="space-y-12 relative px-4 text-content-dark">
            <div className="relative bg-base-100 dark:bg-base-200 rounded-xl p-6 text-center shadow-md">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold">
                1
              </span>
              <h3 className="text-xl font-bold mb-1">
                Sign Up & Profile
              </h3>
              <p className="text-sm text-gray-500">
                Create your account and add your learning needs.
              </p>
            </div>

            <div className="relative bg-base-100 dark:bg-base-200 rounded-xl p-6 text-center shadow-md">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold">
                2
              </span>
              <h3 className="text-xl font-bold mb-1">
                Post Tuition
              </h3>
              <p className="text-sm text-gray-500">
                Add subject, class, schedule and budget.
              </p>
            </div>

            <div className="relative bg-base-100 dark:bg-base-200 border-2 border-primary rounded-xl p-6 text-center shadow-md">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                3
              </span>
              <h3 className="text-xl font-bold mb-1">
                Accept Tutor
              </h3>
              <p className="text-sm text-gray-500">
                Review applications and choose the best tutor.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-12 md:mt-0">
          <div className="bg-base-100 dark:bg-base-200 rounded-2xl shadow-lg p-6 mb-10 border-t-4 border-secondary text-center">
            <h2 className="text-3xl font-bold font-display text-primary">
              Tutor
            </h2>
            <p className="text-gray-500 mt-1">
              Ready to teach?
            </p>
          </div>

          <div className="space-y-12 relative px-4 text-content-dark">
            <div className="relative bg-secondary rounded-xl p-6 text-center shadow-md">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-base-100 text-secondary rounded-full flex items-center justify-center font-bold">
                1
              </span>
              <h3 className="text-xl font-bold text-white mb-1">
                Sign Up & Request
              </h3>
              <p className="text-white/80 text-sm">
                Create account and request tutor access.
              </p>
            </div>

            <div className="relative bg-secondary rounded-xl p-6 text-center shadow-md">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-base-100 text-secondary rounded-full flex items-center justify-center font-bold">
                2
              </span>
              <h3 className="text-xl font-bold text-white mb-1">
                Update Profile
              </h3>
              <p className="text-white/80 text-sm">
                Add subjects, experience and availability.
              </p>
            </div>

            <div className="relative bg-base-100 dark:bg-base-200 border-2 border-secondary rounded-xl p-6 text-center shadow-md">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold">
                3
              </span>
              <h3 className="text-xl font-bold mb-1">
                Apply on Tuitions
              </h3>
              <p className="text-sm text-gray-500">
                Browse tuitions and start teaching.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
