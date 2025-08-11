import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Caportal.css';
import VectorImg from '../utils/Group.png';

const Caportal = () => {
  const [role, setRole] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const navigate = useNavigate();

  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user-role');
        const data = await response.json();
        setRole(data.role);
        setApplicationStatus(data.applicationStatus || 'none');
      } catch (error) {
        console.error('Failed to fetch user role:', error);
        setRole('user');
        setApplicationStatus('none');
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.gsap.fromTo(
        leftPanelRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftPanelRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reset',
            invalidateOnRefresh: true,
          },
        }
      );
      window.gsap.fromTo(
        rightPanelRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightPanelRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reset',
            invalidateOnRefresh: true,
          },
        }
      );
     
      if (buttonRef.current) {
        window.gsap.fromTo(
          buttonRef.current,
          { scale: 0.7, y: 50, opacity: 0 },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.5,
            ease: 'back.out(1.6)',
            scrollTrigger: {
              trigger: buttonRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reset',
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }
  }, [role, applicationStatus]);

  const handleApplyClick = () => navigate('/register');
  const handleDashboardClick = () => navigate('/cadashboard');

  return (
    <div className="register-container">
      <div className="left-panel" ref={leftPanelRef}>
        <img src={VectorImg} alt="Logo" className="logo-image" />
      </div>
      <div className="right-panel" ref={rightPanelRef}>
        <div className="heading">CAMPUS AMBASSADOR</div>
        {role === null || applicationStatus === null ? (
          <p>Loading...</p>
        ) : role === 'user' && applicationStatus === 'none' ? (
          <button className="gradient-btn" ref={buttonRef} onClick={handleApplyClick}>
            Apply
          </button>
        ) : applicationStatus === 'pending' ? (
          <p
            ref={buttonRef}
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#fd761c',
              margin: '40px 0',
            }}
          >
            Application Pending
          </p>
        ) : applicationStatus === 'accepted' && role === 'ambassador' ? (
          <button className="gradient-btn" ref={buttonRef} onClick={handleDashboardClick}>
            Go to Dashboard
          </button>
        ) : (
          <p>Please contact support for your application status.</p>
        )}
      </div>
    </div>
  );
};

export default Caportal;
