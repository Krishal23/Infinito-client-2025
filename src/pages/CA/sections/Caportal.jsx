import React, { useEffect, useRef, useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Caportal.css';
import VectorImg from '../utils/Group.png';
import Unstop from '../utils/unstop.png';
import Infinito from '../utils/Group 48095427.png';
import axiosInstance from '../../../utils/axios';
import { AuthContext } from '../../../context/AuthContext';
import { AiOutlineClose } from 'react-icons/ai';


const Caportal = () => {
  const [role, setRole] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setApplicationStatus(null);
      return;
    }
    let isMounted = true;
    const fetchUserData = async () => {
      try {
        const res = await axiosInstance.get('/user/me');
        if (isMounted) {
          setRole(res.data.user.role);
          setApplicationStatus('accepted');
        }
      } catch (error) {
        if (isMounted) {
          setRole('user');
          setApplicationStatus('rejected');
        }
      }
    };
    fetchUserData();
    return () => { isMounted = false; };
  }, [user]);

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


  const handleApplyClick = useCallback(() => {
    if (!user) {
      // show toast first, then navigate when it closes
      toast.info('Please login first to apply as a Campus Ambassador.', {
        onClose: () => navigate('/auth'),
      });
      return;
    }
    navigate('/ca-register');
  }, [navigate, user]);
  const handleDashboardClick = useCallback(() => navigate('/ca-dashboard'), [navigate]);


  return (
    <div className="register-container">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
     
      <div className="left-panel" ref={leftPanelRef}>
        <img src={VectorImg} alt="Logo" className="logo-image" />
      </div>
      <div className="right-panel" ref={rightPanelRef}>
      <div className="flex justify-between items-center p-4">
      {/* First Image */}
      <img src={Infinito} alt="Infinito Logo" className="w-32 h-auto" />

      {/* X Icon placed between the two images */}
      <AiOutlineClose className="text-bold cursor-pointer hover:text-red-500 mx-4" size={30}  />

      {/* Second Image */}
      <img src={Unstop} alt="Unstop Logo" className="w-32 h-auto" />
    </div>
    presents
        <div className="heading">CAMPUS AMBASSADOR</div>
        {role === null || applicationStatus === null ? (
          <button className="gradient-btn" ref={buttonRef} onClick={handleApplyClick}>
            Apply
          </button>
        ) : role === 'ca' ? (
          <button className="gradient-btn" ref={buttonRef} onClick={handleDashboardClick}>
            CA Dashboard
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
            We have received your application. Thank you!
          </p>
        ) : (
          <button className="gradient-btn" ref={buttonRef} onClick={handleApplyClick}>
            Apply
          </button>
        )}
      </div>
    </div>
  );
};

export default Caportal;