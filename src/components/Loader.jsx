import React from "react";

export default function Loader({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 z-[9999]">
      <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-white font-semibold text-lg animate-pulse">
        {message}
      </p>
    </div>
  );
}
