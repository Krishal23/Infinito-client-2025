import React, { useState, useEffect } from "react";

const TypewriterSafetyNotice = ({ messages = [], speed = 50, pause = 2000 }) => {
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [displayMsg, setDisplayMsg] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  if (!messages || messages.length === 0) return null;

  const currentMessage = messages[currentMsgIndex];

  useEffect(() => {
    let timeout;

    if (typing) {
      if (msgIndex < currentMessage.msg.length) {
        timeout = setTimeout(() => {
          setDisplayMsg((prev) => prev + currentMessage.msg[msgIndex]);
          setMsgIndex((prev) => prev + 1);
        }, speed);
      } else {
        // Finished typing this message, pause before next
        timeout = setTimeout(() => setTyping(false), pause);
      }
    } else {
      // Reset to next message
      timeout = setTimeout(() => {
        const nextIndex = (currentMsgIndex + 1) % messages.length;
        setCurrentMsgIndex(nextIndex);
        setDisplayMsg("");
        setMsgIndex(0);
        setTyping(true);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [typing, msgIndex, currentMessage, currentMsgIndex, messages, speed, pause]);

  return (
    <div className="p-1 bg-blue-50/20 border-l-4 border-blue-500 rounded-md shadow-md max-w-xl mb-2">
      {/* Header displayed fully */}
     <span className="flex items-center space-x-2">
  <h4 className="text-lg font-bold text-blue-700 m-0">{currentMessage.header}:</h4>
  <span className="text-gray-800 text-base flex items-center">
    {displayMsg}
    <span className="inline-block w-1 h-6 bg-blue-700 ml-1 animate-blink"></span>
  </span>
</span>

      {/* Tailwind cursor animation */}
      <style>
        {`
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 1s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default TypewriterSafetyNotice;
