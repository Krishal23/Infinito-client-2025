import { useState } from "react";
import UniversalTable from "./UniversalTableEvents";

export function Events({ data }) {
  const sportsList = Object.keys(data || {});
  const [selectedSport, setSelectedSport] = useState(sportsList[0] || "");

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {sportsList.map((sport) => (
          <button
            key={sport}
            onClick={() => setSelectedSport(sport)}
            className={`px-4 py-2 rounded-2xl text-sm font-semibold shadow-md transition-all duration-200 
              ${selectedSport === sport 
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white scale-105" 
                : "bg-gray-100 hover:bg-indigo-100 text-gray-700"
              }`}
          >
            {sport}
          </button>
        ))}
      </div>

      <UniversalTable
        data={data[selectedSport] || []}
        title={`${selectedSport} Applicants`}
      />
    </div>
  );
}
