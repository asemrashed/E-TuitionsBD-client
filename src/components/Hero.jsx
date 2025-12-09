import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="py-16 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
                    <motion.div
                        className="text-center lg:text-left"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-base-content dark:text-primary-content">
                            Country's #1 Tutor Matching & Learning Platform.
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-base-content/80 lg:mx-0">
                            Find the best tutors for your needs and start your learning journey with confidence. We connect students with professional tutors for personalized learning experiences.
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex justify-center"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <img
                            alt="Students and tutor collaborating"
                            className="w-full max-w-lg rounded-xl shadow-2xl shadow-primary/20"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvC2wSM4cIwG5h10ZTp33CPJyIu3l5fZAhql7O9pHI8TDFR1BX8ktZAQNl7sQeNGmjduK4xXwZKVYV3Pot9Iek46kvO5Of5bEtlRzkajhp7KbgLpasVI6c1u86bn2RbOzaxQJVjfq82olZ2EL-Hi8HLOCJ1_FweSfH_nz0qwn1RrydSb6rpgyIlDYnouIB_9TNaByopSyIzn0gJCE_W1KxjqD8xnOCS_QdsH6qjkC8kJTj-ZiGWVl4H6z4Tplv-xO2T6XKHVn3tw"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
