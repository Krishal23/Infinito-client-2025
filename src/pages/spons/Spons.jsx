import Hero from './hero';
import Content from './content';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Content2 from './content2';

const Spons = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0d0d2b 0%, #2b1055 50%, #fcb045 100%)',
        color: 'white',
        minHeight: '100vh',
        overflowX: 'hidden',
        fontFamily: "'aAtmospheric', sans-serif",
        scrollBehavior: 'smooth',
      }}
    >
      <Navbar />
      <Hero />
      <Content />
      <Content2 />
      <Footer />
    </div>
  );
};

export default Spons;
