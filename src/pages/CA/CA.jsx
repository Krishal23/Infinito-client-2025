import React, { useEffect, useState } from 'react';
import About from './sections/About';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Caportal from './sections/Caportal';

import FAQ from './sections/FAQ';
// import Contact from './sections/Contact';

import Tasks from './sections/tasks';

const sections = ['caportal', 'about', 'tasks',  'faq', 'contact'];
// const sections = ['caportal', 'about', 'perks', 'faq', 'contact'];
const CA = () => {
  const [activeSection, setActiveSection] = useState('caportal');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let current = 'caportal';

      sections.forEach(id => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollPosition) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div >
        <Navbar/>
      <Caportal id="caportal" />
      <About id="about" />
      <Tasks id="tasks" />
      
      <FAQ id="faq" />
      {/* <Contact id="contact" /> */}
      <Footer/>
    </div>
    
  );
};

export default CA;
