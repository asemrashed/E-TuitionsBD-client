import Hero from '../../components/Hero';
import Stats from '../../components/Stats';
import HowItWorks from './HowWorks';
import LatestTutor from './LatestTutor';
import TuitionPosts from './TuitionPosts';
import Footer from '../../components/Footer';

const Home = () => {
    return (
        <>
            <Hero />
            <Stats />
            <TuitionPosts />
            <LatestTutor />
            <HowItWorks />
            <Footer />
        </>
    );
};

export default Home;
