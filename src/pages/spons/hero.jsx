import React from 'react';
import './hero.css';
import Card from './Card';
import bigfm from './927bigfm.png';
import events from './events.png';
import sbi from '/sbi.png'; 
import styles from '../events_insider/evein.module.css';

const Hero = () => {
  return (
    <div className="herodiv bg-transparent flex flex-col items-center py-10">
      <h1
        className={`${styles.title} text-4xl sm:text-5xl font-bold text-center bg-clip-text text-transparent 
        bg-gradient-to-r from-[#fcb045] via-[#ff7e5f] to-[#2b1055] mb-10 mt-6`}
      >
        OUR PREVIOUS SPONSORS
      </h1>

      {/* 🏆 Title Sponsor Section */}
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#f2c94c] mb-4 tracking-wide uppercase">
          Title Sponsor'25
        </h2>
        <div
          className="w-[320px]  sm:w-[360px] p-6 py-12
                     bg-gradient-to-br from-[#0d0d2b] via-[#2b1055] to-[#fcb045] 
                     rounded-2xl shadow-xl flex flex-col justify-evenly items-center 
                     border border-yellow-400 transition-transform transform hover:scale-105"
        >
          <img
            src={sbi}
            alt="SBI Logo"
            className="w-48 h-auto object-contain"
          />
          <p className="text-white font-bold text-lg">State Bank of India</p>
        </div>
      </div>

      {/* ⚡ Other Sponsors */}
      <div id="all1" className="heroinnerdiv svelte-1suma1w flex flex-wrap justify-center gap-8">
        <Card top="Powered By" img={bigfm} bottom="92.7 BIG FM" />
        <Card top="Powered By" img={events} bottom="THE COMMUNITY EVENTS" />
      </div>
    </div>
  );
};

export default Hero;
