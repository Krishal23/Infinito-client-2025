import React, { useState, useRef, useEffect } from 'react';
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
import BGMI from './BGMI';
import ClashRoyale from './ClashRoyale';
import CODM from './CODM';
import FreeFire from './FreeFire';
import Valorant from './Valorant';
import MrInfinito from './MrInfinto';

// Import images
import footballimg from '../images/football.png';
import baskimg from '../images/basketball.png';
import chessimg from '../images/chess.png';
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
import bgmiimg from '../images/bgmi.png'
import clashroyaleimg from '../images/clashroyale.png'
import freefireimg from '../images/freefire.png'
import codmimg from '../images/codm.png'
import valorantimg from '../images/valorant.png'
import mrinfinitoimg from '../images/mrinfinito.png'
import Chess from './Chess';
import axiosInstance from '../../utils/axios';


// Mapping for event components
const eventComponents = {
  // 'Clash Royale':<ClashRoyale/>,
  'Mr. Infinto': <MrInfinito />,
  'CODM': <CODM />,
  'BGMI': <BGMI />,
  'Valorant': <Valorant />,
  'Free Fire': <FreeFire />,
  athletic: <Atheletic />,
  badminton: <Badminton />,
  basketball: <Basketball />,
  cricket: <Cricket />,
  football: <Football />,
  kabaddi: <Kabbadi />,
  'Lawn Tennis': <LawnTennis />,
  squash: <Squash />,
  'Table Tennis': <TableTennis />,
  volleyball: <Volleyball />,
  'Weight Lifting': <Weight />,
  'Power Lifting': <PowerLift />,
  'Chess': <Chess />,
};


// Mapping for custom cursors
const cursorMap = {
  football: "url('https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/26bd.png') 6 6 , auto", // ⚽
  basketball: "url('https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3c0.png') 6 6 , auto", // 🏀
  cricket: "url('https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3cf.png') 6 6 , auto", // 🏏
  volleyball: "url('https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3d0.png') 6 6 , auto", // 🏐
  badminton: "url('https://cdn-icons-png.flaticon.com/512/3075/3075977.png') 6 6 , auto", // 🏸 (custom PNG)
  kabaddi: "url('https://cdn-icons-png.flaticon.com/512/814/814514.png') 6 6 , auto", // Viking shield 🛡
  athletic: "url('https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3c3-1f3fd.png') 6 6 , auto", // runner icon
  squash: "url('https://cdn-icons-png.flaticon.com/512/684/684908.png') 6 6 , auto",
  "Lawn Tennis": "url('https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3be.png') 6 6 , auto", // 🎾
  "Table Tennis": "url('https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3d3.png') 6 6 , auto",
  "Weight Lifting": "url('https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3cb.png') 6 6 , auto",
  "Power Lifting": "url('https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3cb-1f3fb.png') 6 6 , auto",
  'Chess': "url('https://cdn.custom-cursor.com/cursors/pack2106.png') 6 6 , auto",
  BGMI: "url('https://cdn-icons-png.flaticon.com/512/535/535246.png') 6 6 , auto",
  Valorant: "url('https://cdn-icons-png.flaticon.com/512/5969/5969248.png') 6 6 , auto",
  CODM: "url('https://cdn-icons-png.flaticon.com/512/3917/3917215.png') 6 6 , auto",
  "Free Fire": "url('https://cdn-icons-png.flaticon.com/512/3917/3917215.png') 6 6 , auto",
  "Mr. Infinto": "url('https://cdn-icons-png.flaticon.com/512/814/814513.png') 6 6 , auto", // Viking axe 🪓
};


// Mapping for sport images
const sportImages = {
  'Mr. Infinto': mrinfinitoimg,
  athletic: atheleteimg,
  badminton: badmintonimg,
  basketball: baskimg,
  cricket: crickimg,
  football: footballimg,
  kabaddi: kabbadiimg,
  'Lawn Tennis': lawntennisimg,
  squash: squashimg,
  'Table Tennis': tabletennisimg,
  volleyball: volleyballimg,
  'Weight Lifting': weightimg,
  'Power Lifting': powerliftimg,
  'Chess': chessimg,
  'BGMI': bgmiimg,
  // 'Clash Royale':clashroyaleimg,
  'CODM': codmimg,
  'Free Fire': freefireimg,
  'Valorant': valorantimg,

};

const Evein = () => {
  const [selectedSport, setSelectedSport] = useState('BGMI');
  const descriptionRef = useRef(null);

  const [registeredEvents, setRegisteredEvents] = useState([]);

  const normalizeEventMap = {
    athletics: "athletic",
  };

  const normalizeEvent = (event) => normalizeEventMap[event] || event;

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const res = await axiosInstance.get("/events/registered-events-name");
        setRegisteredEvents(res.data.events.map(e => normalizeEvent(e.event)));
      } catch (err) {
        console.error("Error fetching registered events:", err);
      }
    };
    fetchRegisteredEvents();
  }, []);




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
          backgroundImage: `url(${sportImages[selectedSport]})`,
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
<p
  className={`${styles.sportName} text-lg font-bold text-white tracking-wide w-fit px-3 py-1 rounded-md cursor-pointer
              transition-colors duration-300 hover:text-zinc-900 hover:bg-zinc-100 hover:scale-105`}
  style={{
    cursor: cursorMap[sportKey] || "pointer",
  }}
>
  {sportKey.charAt(0).toUpperCase() + sportKey.slice(1)}
</p>



            </div>
          ))}
        </div>

        {/* Section 2: Event Description */}
        <div className={styles.eventDescription} ref={descriptionRef}>
          {selectedSport ? (
            <div className={styles.descriptionBox}>
              {React.cloneElement(eventComponents[selectedSport], {
                isAlreadyRegistered: registeredEvents.includes(selectedSport.toLowerCase().replace(/\s+/g, "_")),
              })}
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
