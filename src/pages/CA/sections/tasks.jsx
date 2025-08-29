import React, { useEffect, useRef } from "react";
import "./tasks.css";
import { FaBullhorn, FaBell, FaUsers, FaClipboardList, FaHandsHelping, FaUserTie, FaFileAlt } from "react-icons/fa";
import Dartz from "../utils/dartz.png";

const Tasks = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;

    window.gsap.registerPlugin(window.ScrollTrigger);

    const sections = rootRef.current.querySelectorAll(".hori");
sections.forEach((hori) => {
  const panels = gsap.utils.toArray(".panel, .panel1, .panel2", hori);

  if (panels.length > 1) {
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: hori,
        pin: true,
        scrub: 1,
        end: () => "+=" + hori.offsetWidth * (panels.length - 1), 
        invalidateOnRefresh: true,
      },
    });
  }
});



    return () => {
      window.ScrollTrigger && window.ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="taskperk" ref={rootRef}>
      <div className="hori">

        {/* Responsibilities Panel 1 */}
    <div className="panel panel1 ">
      <div className="inner-panel  flex items-center justify-center ">
        <div className="respo">Responsibilities</div>

        <div className="task-card ">
          <FaBullhorn className="task-icon" />
          <p>Bring active participation from your college community</p>
        </div>

        <div className="task-card">
          <FaBell className="task-icon" />
          <p>Share regular updates about Infinito with students</p>
        </div>
      </div>
    </div>

    {/* Responsibilities Panel 2 */}
    <div className="panel panel1  flex items-center justify-center">
      <div className="inner-panel flex items-center justify-center">
        <div className="respo">Responsibilities</div>

        <div className="task-card">
          <FaUsers className="task-icon" />
          <p>Represent Infinito at college events & activities</p>
        </div>

        <div className="task-card">
          <FaHandsHelping className="task-icon" />
              <p>Assist with coordination & on-the-day event support</p>
            </div>
          </div>
        </div>

        {/* Perks Panel */}
      
      </div>
        <div className="panel panel2">
          <section className="dark">
            <div className="reward">Perks & Rewards</div>
            <ul className="perks-list">
              <li><FaClipboardList className="perk-icon" /> Certificate By Infinito, IITP!</li>
              <li><FaBullhorn className="perk-icon" /> Exclusive Goodies & Merchandise</li>
              <li><FaUserTie className="perk-icon" /> LOR & Recognition for Top CAs</li>
              <li><FaUsers className="perk-icon" /> Network with peers from top colleges</li>
            </ul>
          </section>
        </div>
    </div>

  );
};

export default Tasks;