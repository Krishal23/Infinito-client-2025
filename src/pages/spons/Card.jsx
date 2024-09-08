

import React, { useEffect, useRef } from 'react';
import './Card.css';
import VanillaTilt from 'vanilla-tilt';

const Card = (props) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (window.VanillaTilt) {
      // Initialize VanillaTilt on the card element
      window.VanillaTilt.init(cardRef.current, {
        reverse: false, // Change to true to reverse the tilt direction
        max: 15, // Maximum tilt rotation (degrees)
        startX: 0, // Starting tilt on the X axis
        startY: 0, // Starting tilt on the Y axis
        perspective: 1000, // Transform perspective
        easing: 'cubic-bezier(.03,.98,.52,.99)', // Easing on enter/exit
        scale: 1, // Scale factor
        speed: 300, // Speed of the enter/exit transition
        transition: true, // Set a transition on enter/exit
        axis: null, // What axis should be enabled. Can be "x" or "y"
        glare: false, // If it should have a "glare" effect
        'max-glare': 1, // The maximum "glare" opacity
        'glare-prerender': false, // Whether VanillaTilt creates the glare elements
        'full-page-listening': false, // Parallax effect listening to the whole document
        'mouse-event-element': null, // Element for mouse events
        reset: true, // Reset the tilt effect on exit
        'reset-to-start': true, // Return to initial start angle on reset
        gyroscope: true, // Enable tilting by device orientation
        gyroscopeMinAngleX: -45, // Gyroscope minimum angle X
        gyroscopeMaxAngleX: 45, // Gyroscope maximum angle X
        gyroscopeMinAngleY: -45, // Gyroscope minimum angle Y
        gyroscopeMaxAngleY: 45, // Gyroscope maximum angle Y
        gyroscopeSamples: 10, // How many gyroscope moves to decide the starting position
      });

      // Clean up VanillaTilt instance on component unmount
      return () => {
        if (cardRef.current && cardRef.current.vanillaTilt) {
          cardRef.current.vanillaTilt.destroy();
        }
      };
    }
  }, []);

  return (
    <div className='carddiv' ref={cardRef}>
      <div className='cardproptop'>{props.top}</div>
      <div className='cardimg'><img src={props.img} alt="card visual" /></div>
      <div className='cardpropbottom'>{props.bottom}</div>
    </div>
  );
};

export default Card;

