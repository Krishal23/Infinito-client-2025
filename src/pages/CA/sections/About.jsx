import React, { useEffect, useRef } from "react";
import "./About.css";
import VectorImg from "../utils/Coats_Of_Arms_12.png";

const About = () => {
  const whyRef = useRef(null);
  const whycaRef = useRef(null);
  const vectorRef = useRef(null);

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    gsap.fromTo(
      whyRef.current,
      { opacity: 0, y: 200, scale: 0.85 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "cubic-bezier(0.4, 0, 0.2, 1)",
        scrollTrigger: {
          trigger: whyRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
          invalidateOnRefresh: true,
        }
      }
    );
    gsap.fromTo(
      whycaRef.current,
      { opacity: 0, y: 200, scale: 0.85 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "cubic-bezier(0.4, 0, 0.2, 1)",
        scrollTrigger: {
          trigger: whycaRef.current,
          start: "top 85%",
          end: "top 40%",
          scrub: true,
          invalidateOnRefresh: true,
        }
      }
    );
    gsap.fromTo(
      vectorRef.current,
      { opacity: 0, x: 250, scale: 0.8 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        ease: "cubic-bezier(0.4, 0, 0.2, 1)",
        scrollTrigger: {
          trigger: vectorRef.current,
          start: "top 90%",
          end: "top 40%",
          scrub: true,
          invalidateOnRefresh: true,
        }
      }
    );
  }, []);

  return (
    <section className="about-section">
      <div className="about-content">
        <div className="why" ref={whyRef}>Why ca?</div>
        <div className="whyca" ref={whycaRef}>
          Be the bridge between your college and Infinito. Take up exciting challenges, grow your network, and earn certificates and rewards!
        </div>
      </div>
      <div className="about-vector" ref={vectorRef}>
        <img src={VectorImg} alt="Logo" className="logo-img" />
      </div>
    </section>
  );
};

export default About;
