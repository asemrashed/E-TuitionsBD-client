import Hero from '../../components/Hero';
import Stats from '../../components/Stats';
import HowItWorks from './HowWorks';
import LatestTutor from './LatestTutor';
import TuitionPosts from './TuitionPosts';
import WhyChooseUs from './WhyUS';
import Resources from './Resources';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <>
            <Hero />
            <Stats />
            <TuitionPosts />
            <LatestTutor />
            <HowItWorks />
            <WhyChooseUs />
            <Resources />
            <Testimonials />
        </>
    );
};

export default Home;
