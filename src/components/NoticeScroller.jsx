import React, { useState } from "react";
import "./NoticeScroller.css";
import { IoClose } from "react-icons/io5"; 

const NoticeScroller = ({visible,setVisible}) => {

  const notices = [
    "📢 Pronite Pass sales are live! Grab yours before they run out. Closing soon!!",
    "👕 Official merchandise is available at the store. Check out the new designs.",
    "🚀 Events Registrations has been closed now",
    "🏨 Accommodation booking has been closed now.",
    "🧾 No on spot Accomodation available.",
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
