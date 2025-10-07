import React, { useState } from "react";
import "./NoticeScroller.css";
import { IoClose } from "react-icons/io5"; 

const NoticeScroller = ({visible,setVisible}) => {

  const notices = [
    "⚡ Early Bird Passes just @ ₹499 — Hurry, Ends Soon!",
    "📢 Pronite Pass sales are now live! Grab yours before they run out.",
    "🚀 Registrations for flagship events are closing soon. Register now!",
    "👕 Official merchandise is available at the store. Check out the new designs.",
    "🏨 Accommodation details have been updated. Please check the portal.",
  ];

  // Duplicate for seamless loop
  const allNotices = [...notices, ...notices];

  if (!visible) return null; // Hide scroller when closed

  return (
    <div className="notice-scroller-container flex ">
      <div className="notice-scroller-content">
        {allNotices.map((notice, index) => (
          <span key={index} className="notice-item">
            {notice}
          </span>
        ))}
      </div>

      <div
        className="notice-close-btn"
        onClick={() => setVisible(false)}
        aria-label="Close notices"
      >
        <IoClose size={22} />
      </div>
    </div>
  );
};

export default NoticeScroller;
