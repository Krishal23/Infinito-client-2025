import { useEffect, useRef, useState } from "react";
import styles from "./events.module.css";
import footballimg from "../images/football.png";
import baskimg from "../images/basketball.png";
import chessimg from "../images/chess.png";
import crickimg from "../images/cricket.png";
import ludoimg from "../images/ludo.png";
import tennisimg from "../images/tennis.png";
import { Link } from "react-router-dom";
import bgmiimg from '../images/bgmi.png'
import clashroyaleimg from '../images/clashroyale.png'
import freefireimg from '../images/freefire.png'
import codmimg from '../images/codm.png'
import valorantimg from '../images/valorant.png'

const Eve = () => {
  const eventsList = [
    { id: 1, name: "freefire", image: freefireimg },
    { id: 2, name: "Basketball", image: baskimg },
    { id: 3, name: "bgmi", image: bgmiimg },
    { id: 4, name: "Cricket", image: crickimg },
    { id: 5, name: "valorant", image: valorantimg },
    { id: 6, name: "Ludo", image: ludoimg },
    { id: 7, name: "clashroyale", image: clashroyaleimg },
  ];

  const [events, setEvents] = useState(eventsList.slice(0, 6)); 
  const [page, setPage] = useState(1); 
  const observer = useRef();
  const cardSectionRef = useRef(null);
  let scrollInterval;
  let scrollDirection = 1; 

  const loadMoreEvents = () => {
    const nextPage = page + 1;
    const newEvents = eventsList.slice(0, nextPage * 6);
    setEvents(newEvents);
    setPage(nextPage);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadMoreEvents();
      }
    }, options);

    const target = document.querySelector("#scroll-anchor");
    if (target) observer.current.observe(target);

    return () => {
      if (observer.current && target) {
        observer.current.unobserve(target);
      }
    };
  }, [page]);

  const startAutoScroll = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const scrollSpeed = isMobile ? 20 : 10; // Adjust speed for mobile

    scrollInterval = setInterval(() => {
      const { scrollLeft, scrollWidth, clientWidth } = cardSectionRef.current;

      if (scrollLeft + clientWidth >= scrollWidth || scrollLeft === 0) {
        scrollDirection *= -1;
      }

      cardSectionRef.current.scrollBy({
        left: scrollDirection,
        behavior: "instant",
      });
    }, scrollSpeed);
  };

  useEffect(() => {
    startAutoScroll();

    const handleMouseOver = () => clearInterval(scrollInterval);
    const handleMouseOut = () => startAutoScroll();

    const cardSectionElement = cardSectionRef.current;
    cardSectionElement.addEventListener("mouseover", handleMouseOver);
    cardSectionElement.addEventListener("mouseout", handleMouseOut);

    return () => {
      clearInterval(scrollInterval);
      cardSectionElement.removeEventListener("mouseover", handleMouseOver);
      cardSectionElement.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div className={styles.events}>
      <h1 className={styles.title}>EVENTS</h1>
      <div className={styles.cardSection} ref={cardSectionRef}>
        {events.map((event) => (
          <div className={styles.card} key={event.id}>
            <img
              src={event.image}
              alt={event.name}
              className={styles.cardImage}
            />
          </div>
        ))}
      </div>
      <div id="scroll-anchor" className={styles.scrollAnchor}></div>
      <Link className={styles.workButton} to="/event/ins">
        SEE ALL EVENTS
      </Link>
    </div>
  );
};

export default Eve;
