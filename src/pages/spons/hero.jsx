import React from 'react';
import './hero.css';
import Card from './Card';
import bigfm from './927bigfm.png';
import events from './events.png';
const Hero = () => {
  return (
    <div className="herodiv">
      <h1 id="heading1" className="heading svelte-1suma1w">
        <span className="heading_inside atmos svelte-1suma1w">
          OUR PREVIOUS SPONSORS
        </span>
      </h1>
      <div id="all1" className="heroinnerdiv svelte-1suma1w">
        <Card top="Powered By" img={bigfm} bottom="92.7 BIG FM" />
        <Card top="Powered By" img={events} bottom="THE COMMUNITY EVENTS" />
      </div>
    </div>
  );
};

export default Hero;
