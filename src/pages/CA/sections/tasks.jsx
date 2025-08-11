import React, { useEffect, useRef } from "react";
import "./tasks.css";
// import Infi from "../components/Group 48095427.png";
import Dartz from "../utils/dartz.png";

const Tasks = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;

    window.gsap.registerPlugin(window.ScrollTrigger);

    // Horizontal pin & scroll animation for .hori containers
    const sections = rootRef.current.querySelectorAll(".hori");

    sections.forEach((hori) => {
      const panels = hori.querySelectorAll(".panel, .panel1, .panel2");
      if (panels.length > 1) {
        const scrollWidth = hori.scrollWidth;
        const clientWidth = document.documentElement.clientWidth;
        window.gsap.timeline({
          scrollTrigger: {
            trigger: hori,
            pin: true,
            scrub: 1,
            end: () => "+=" + (scrollWidth - clientWidth),
            invalidateOnRefresh: true,
          },
        }).to(
          panels,
          {
            x: () => -(scrollWidth - clientWidth) + "px",
            duration: 1,
            ease: "none",
          },
          0.05
        );
      }
    });

    
    const perksSection = rootRef.current.querySelector(".panel2 .dark");
    const rewardHeading = perksSection.querySelector(".reward");
    const perksListItems = perksSection.querySelectorAll(".perks-list li");

    const tl = window.gsap.timeline({
      scrollTrigger: {
        trigger: perksSection,
        start: "top 80%",
        toggleActions: "play none none reset",
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(
      rewardHeading,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    tl.fromTo(
      perksListItems,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.2,
      },
      "-=0.3"
    );

    return () => {
      window.ScrollTrigger && window.ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="taskperk" ref={rootRef}>
      <div className="hori">
        <div className="panel panel1">
          <div className="inner-panel">
            <img src={Dartz} alt="Vector" className="left-vector" />
            <div className="respo">Responsibilities</div>
          </div>
          {/* <img src={Infi} alt="Logo" className="infi" /> */}
        </div>
        <div className="panel panel1">
          {/* <img src={Infi} alt="Logo" className="infi" /> */}
          <div className="task">TASK 1</div>
        </div>
        <div className="panel panel1">
          {/* <img src={Infi} alt="Logo" className="infi" /> */}
          <div className="task">TASK 2</div>
        </div>
        <div className="panel panel1">
          {/* <img src={Infi} alt="Logo" className="infi" /> */}
          <div className="task">TASK 3</div>
        </div>
      </div>
      <div className="hori">
        <div className="panel panel2">
          <section className="dark">
            <div className="reward">Perks & Rewards</div>
            <ul className="perks-list">
              <li>🎓 Certificate of Appreciation</li>
              <li>🎁 Goodies and Merchandise</li>
              <li>🏆 Top CAs get LOR and exclusive passes</li>
              <li>🌐 Network with CAs from top colleges</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
