import { useState, useRef } from 'react';
import styles from './evein.module.css';

// Import event components
import Football from './Football';
import Basketball from './Basketball';
import Cricket from './Cricket';
// import Chess from './Chess';
import Atheletic from './Atheletic';
import Volleyball from './Volleyball';
import Badminton from './Badminton';
import Kabbadi from './Kabbadi';
import LawnTennis from './LawnTennis';
import Squash from './Squash';
import TableTennis from './TableTennis';
import Weight from './Weight';
import PowerLift from './PowerLifting';

// Import images
import footballimg from '../images/football.png';
import baskimg from '../images/basketball.png';
// import chessimg from '../images/chess.png';
import crickimg from '../images/cricket.png';
import atheleteimg from '../images/atheletics.png';
import volleyballimg from '../images/volleyball.png';
import badmintonimg from '../images/badminton.png';
import kabbadiimg from '../images/kabbadi.png';
import lawntennisimg from '../images/lawntennis.png';
import squashimg from '../images/squash.png';
import tabletennisimg from '../images/tabletennis.png';
import weightimg from '../images/weight.png';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import powerliftimg from '../images/powerlift.png'

// Mapping for event components
const eventComponents = {
  atheletic: <Atheletic />,
  badminton: <Badminton />,
  basketball: <Basketball />,
  cricket: <Cricket />,
  football: <Football />,
  kabbadi: <Kabbadi />,
  'Lawn Tennis': <LawnTennis />,
  squash: <Squash />,
  'Table Tennis': <TableTennis />,
  volleyball: <Volleyball />,
  'Weight Lifting': <Weight />,
  'Power Lifting':<PowerLift/>,

};

// Mapping for sport images
const sportImages = {
  atheletic: atheleteimg,
  badminton: badmintonimg,
  basketball: baskimg,
  cricket: crickimg,
  football: footballimg,
  kabbadi: kabbadiimg,
  'Lawn Tennis': lawntennisimg,
  squash: squashimg,
  'Table Tennis': tabletennisimg,
  volleyball: volleyballimg,
  'Weight Lifting': weightimg,
  'Power Lifting': powerliftimg,

};

const Evein = () => {
  const [selectedSport, setSelectedSport] = useState('football');
  const descriptionRef = useRef(null);

  const handleIconClick = (sportKey) => {
    setSelectedSport(sportKey);
    if (descriptionRef.current) {
      descriptionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.sportsPage}
       style={{
        backgroundImage: `url(${sportImages[selectedSport]})`, // Set background image dynamically
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        
      }}>
        <h1 className={styles.title}>Events</h1>
        {/* Section 1: Sports Icons */}
        <div className={styles.sportsIcons}>
          {Object.keys(eventComponents).map((sportKey) => (
            <div className={styles.icobox} key={sportKey}>
              <div
                className={styles.sportIcon}
                onClick={() => handleIconClick(sportKey)}
                style={{
                  backgroundImage: `url(${sportImages[sportKey]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <p className={styles.sportName}>
                {sportKey.charAt(0).toUpperCase() + sportKey.slice(1)}
              </p>
            </div>
          ))}
        </div>

        {/* Section 2: Event Description */}
        <div className={styles.eventDescription} ref={descriptionRef}>
          {selectedSport ? (
            <div className={styles.descriptionBox}>
              {eventComponents[selectedSport]}
            </div>
          ) : (
            <div className={styles.placeholder}>
              <h1>Infintio 2024</h1>
              <p>Select a sport to see the description</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Evein;
