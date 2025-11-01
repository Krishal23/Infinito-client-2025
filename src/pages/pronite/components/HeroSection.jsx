import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '../../Events/ui/button';
import InfinitoSVG from '/Infi25.svg';
import i1 from './1.jpg';
import i2 from './2.jpg';
import i3 from './3.jpg';
import warriorBg from '/proniteBG.jpg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const artists = [
    { image: i1 },
    { image: i2 },
    { image: i3 }
];

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
        const navigate = useNavigate();


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % artists.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden flex flex-col md:flex-row items-center justify-center text-white">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={warriorBg}
                    alt="Warrior Battle"
                    className="w-full h-full object-cover brightness-50"
                />
            </div>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-0" />

            {/* Left Content */}
            <div className="relative z-10 md:ml-12 flex flex-col items-center justify-center px-6 text-center md:text-left md:flex-1 md:items-start">
                {/* Hero Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-4 md:mb-8"
                >
                    <img
                        src={InfinitoSVG}
                        alt="INFINITO'25"
                        className="w-96 md:w-96 h-auto"
                    />
                </motion.div>

                {/* Stylish Text */}
                
                <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl  sm:text:xl font-bold mb-4 bg-gradient-to-l from-primary via-secondary to-accent bg-clip-text text-transparent">
            Passes Are Live!
          </h2>
          
        </motion.div>

                {/* Book Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Button
                        size="lg"
                        onClick={() => navigate('/my-pronite')}
                        className="text-xl  text-shadow text-zinc-900  px-6 md:px-8 py-4 md:py-6 bg-gradient-to-t from-primary to-accent hover:shadow-xl transition-all duration-300 mt-4"
                    >
                        <Sparkles className="mr-2 h-5 w-5" />
                        My passes
                    </Button>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 md:left-10 md:translate-x-0"
                >
                    <div className="w-6 h-10 border-2 border-zinc-400/50 rounded-full flex items-start justify-center p-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-white rounded-full"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Right Carousel Card */}
            <div className="relative z-10 md:flex-1 flex items-center justify-center mt-10 md:mt-0 px-4 md:px-0 w-full">
                <motion.div
                    key={currentIndex}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-xs md:max-w-sm w-full rounded-3xl overflow-hidden shadow-2xl"
                >
                    <img
                        src={artists[currentIndex].image}
                        alt={`Artist ${currentIndex}`}
                        className="w-52 md:h-80 object-cover"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
