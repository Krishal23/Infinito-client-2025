import HeroSection from './components/HeroSection.jsx';
import LineupSection from './components/LineupSection.jsx';
import VideoSection from './components/VideoSection.jsx';
import GallerySection from './components/GallerySection.jsx';
import HistorySection from './components/HistorySection.jsx';
import Footer from '../../components/Footer.jsx';
import Navbar from '../../components/Navbar.jsx';

const ProniteIndex = () => {
  return (
    <main className="w-full bg-zinc-800">
        <Navbar/>
      <HeroSection />
      <LineupSection />
      {/* <VideoSection /> */}
      {/* <GallerySection /> */}
      <HistorySection />
      <Footer />
    </main>
  );
};

export default ProniteIndex;
