import React from 'react';
import {
  FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard,
  FaGraduationCap, FaUsers, FaTrophy, FaCalendar,
  FaDownload
} from 'react-icons/fa';
import "jspdf-autotable";




const RegistrationDetailsModal = ({ isOpen, onClose, data, eventType }) => {
  if (!isOpen || !data) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleString("en-GB", {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  };



  const renderUser = (user, roleLabel) => (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <FaUser className="text-blue-600" /> {roleLabel}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium">Name:</span> {user.fullname || user.name || "—"}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Email:</span> {user.email || "—"}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Phone:</span> {user.phoneNumber || user.contactNumber || "—"}
        </div>
        {user.aadharId && (
          <div className="flex items-center gap-2">
            <span className="font-medium">Aadhar ID:</span> {user.aadharId}
          </div>
        )}
        {user.ign && (
          <div className="flex items-center gap-2">
            <span className="font-medium">IGN:</span> {user.ign}
          </div>
        )}
        {user.position && (
          <div className="flex items-center gap-2">
            <span className="font-medium">Position:</span> {user.position}
          </div>
        )}
        {user.role && (
          <div className="flex items-center gap-2">
            <span className="font-medium">Role:</span> {user.role}
          </div>
        )}
        {user.skillLevel && (
          <div className="flex items-center gap-2">
            <span className="font-medium">Skill Level:</span> {user.skillLevel}
          </div>
        )}
      </div>
    </div>
  );

  const renderCollegeInfo = () => (
    <div className="bg-green-50 rounded-lg p-4 mb-4">
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <FaGraduationCap className="text-green-600" /> College Information
      </h4>
      <div className="text-sm space-y-2">
        <div><span className="font-medium">College:</span> {data.collegeName || "—"}</div>
        {data.collegeAddress && <div><span className="font-medium">Address:</span> {data.collegeAddress}</div>}
      </div>
    </div>
  );

  const renderTeamSport = () => {
    const members = [];
    if (data.captain) members.push({ user: data.captain, label: "Captain" });
    if (data.viceCaptain) members.push({ user: data.viceCaptain, label: "Vice Captain" });
    if (data.players?.length) members.push(...data.players.map(p => ({ user: p, label: "Player" })));
    if (data.substitutes?.length) members.push(...data.substitutes.map(p => ({ user: p, label: "Substitute" })));
    if (!members.length) return null;

    return (
      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <FaUsers className="text-blue-600" /> Team Information
        </h4>
        {members.map((m, idx) => renderUser(m.user, m.label))}
      </div>
    );
  };
const renderAthletics = () => {
  if (!data.players?.length && !data.coach) return null;

  // Lead Athlete
  const leadAthlete = data.players.find(p => p.role === "lead");

  // Relay Teams
  const relayMembers = data.players.filter(p => p.role?.startsWith("relayTeam_"));
  const relayTeamsMap = {};
  relayMembers.forEach(p => {
    const teamName = p.role.replace("relayTeam_", "");
    if (!relayTeamsMap[teamName]) relayTeamsMap[teamName] = [];
    relayTeamsMap[teamName].push(p);
  });

  // Other players (not lead, not relay)
  const otherPlayers = data.players.filter(p => !["lead"].includes(p.role) && !p.role?.startsWith("relayTeam_"));

  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-4">
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <FaTrophy className="text-blue-600" /> Athletics Information
      </h4>

      {/* Lead Athlete */}
      {leadAthlete && renderUser(leadAthlete, "Lead Athlete")}

      {/* Individual Events */}
      {data.individualEvents?.length > 0 && (
        <div className="text-sm mb-2">
          <span className="font-medium">Individual Events:</span> {data.individualEvents.join(", ")}
        </div>
      )}

      {/* Relay Teams */}
      {Object.keys(relayTeamsMap).length > 0 && (
        <div className="mb-2">
          <span className="font-medium text-sm">Relay Teams:</span>
          {Object.entries(relayTeamsMap).map(([teamName, members], idx) => (
            <div key={idx} className="ml-2 mt-2">
              <span className="font-semibold">{teamName}</span>
              <div className="mt-1 space-y-2">
                {members.map((member, mIdx) => renderUser(member, `Relay Team Member`))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Other Players
      {otherPlayers.length > 0 && (
        <div className="mb-2">
          <span className="font-medium text-sm">Other Players:</span>
          <div className="mt-1 space-y-2">
            {otherPlayers.map((p, idx) => renderUser(p, "Player"))}
          </div>
        </div>
      )} */}

      {/* Coach */}
      {/* {data.coach && renderUser(data.coach, "Coach")} */}
    </div>
  );
};



  const renderEsports = () => {
    if (!data.teamLeader) return null;
    return (
      <div className="bg-purple-50 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <FaTrophy className="text-purple-600" /> Esports Information
        </h4>
        {renderUser(data.teamLeader, "Team Leader")}
        {data.players?.length > 0 && data.players.map((p, idx) => renderUser(p, "Player"))}
        {data.queries && <div className="text-sm mt-2"><span className="font-medium">Queries:</span> {data.queries}</div>}
      </div>
    );
  };




  const downloadData = () => {
    if (!data) return;

    const formatField = (label, value) => `<div class="field"><span class="label">${label}:</span> ${value || "—"}</div>`;
    const formatDateString = date => date ? new Date(date).toLocaleString("en-GB", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

    // Build all user info fields
    const formatUser = (user, roleLabel) => `
    <div class="subsection">
      <h4 class="subheading">${roleLabel}</h4>
      ${formatField("Name", user.fullname || user.name)}
      ${formatField("Email", user.email)}
      ${formatField("Phone", user.phoneNumber || user.contactNumber)}
      ${user.aadharId ? formatField("Aadhar ID", user.aadharId) : ""}
      ${user.position ? formatField("Position", user.position) : ""}
      ${user.role ? formatField("Role", user.role) : ""}
      ${user.skillLevel ? formatField("Skill Level", user.skillLevel) : ""}
      ${user.ign ? formatField("IGN", user.ign) : ""}
    </div>
  `;

    // Assemble team members
    const teamMembersHTML = (() => {
      if (!["badminton", "basketball", "cricket", "football", "kabaddi", "lawn_tennis", "squash", "table_tennis", "volleyball", "weight_lifting", "power_lifting", "chess"].includes(eventType)) return "";
      const members = [
        ...(data.captain ? [{ user: data.captain, label: "Captain" }] : []),
        ...(data.viceCaptain ? [{ user: data.viceCaptain, label: "Vice Captain" }] : []),
        ...(data.players?.map(p => ({ user: p, label: "Player" })) || []),
        ...(data.substitutes?.map(p => ({ user: p, label: "Substitute" })) || [])
      ];
      return members.map(m => formatUser(m.user, m.label)).join('');
    })();

    // Athletics info
    const athleticsHTML = eventType === "athletics" ? `
    ${formatUser(data.lead, "Lead Athlete")}
    ${data.individualEvents?.length ? formatField("Individual Events", data.individualEvents.join(", ")) : ""}
    ${data.relayTeams?.length ? data.relayTeams.map(team => formatField(team.teamName, team.members.map(m => m.fullname).join(", "))).join('') : ""}
  ` : "";

    // Esports info
    const esportsHTML = ["bgmi", "freefire", "codm", "valorant", "clash_royale"].includes(eventType) ? `
    ${formatUser(data.teamLeader, "Team Leader")}
    ${data.players?.length ? formatField("Players", data.players.map(p => p.name).join(", ")) : ""}
    ${data.queries ? formatField("Queries", data.queries) : ""}
  ` : "";

    // Full HTML content
    const htmlContent = `
  <html>
    <head>
      <title>${eventType?.toUpperCase()} Registration</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
        h2 { color: #4B0082; }
        h3 { color: #1E90FF; margin-top: 20px; }
        h4.subheading { color: #555; margin-top: 10px; margin-bottom: 5px; }
        .section { border: 1px solid #ddd; padding: 15px; margin-bottom: 20px; border-radius: 8px; }
        .subsection { border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 6px; background: #f9f9f9; }
        .field { margin-bottom: 6px; }
        .label { font-weight: bold; color: #555; }
      </style>
    </head>
    <body>
      <h2>${eventType?.toUpperCase()} Registration</h2>
      <div class="section">
        <h3>General Info</h3>
        ${formatField("Registration ID", data._id)}
        ${formatField("Registration Date", formatDateString(data.registrationDate))}
      </div>

      <div class="section">
        <h3>College Information</h3>
        ${formatField("College", data.collegeName)}
        ${data.collegeAddress ? formatField("Address", data.collegeAddress) : ""}
      </div>

      ${data.coach ? `<div class="section"><h3>Coach Information</h3>${formatUser(data.coach, "Coach")}</div>` : ""}

      ${teamMembersHTML ? `<div class="section"><h3>Team Information</h3>${teamMembersHTML}</div>` : ""}
      ${athleticsHTML ? `<div class="section"><h3>Athletics Information</h3>${athleticsHTML}</div>` : ""}
      ${esportsHTML ? `<div class="section"><h3>Esports Information</h3>${esportsHTML}</div>` : ""}
    </body>
  </html>
  `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${eventType || "registration"}_${data._id || "data"}.html`;
    a.click();
  };

  console.log(data)


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl flex justify-between items-center">
          
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Registration Details</h2>
            <p className="text-sm text-gray-600 mt-1">{eventType?.toUpperCase()} • ID: {data._id?.slice(0, 8)}...</p>
            <div className='flex gap-2'>
            Payment Proof:
            <div
              // onClick={downloadData}
              className="max-w-12 px-2 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <a
              href={`${data?.payment?.proofString || data?.proofString}`}
            >
              <FaDownload />
            </a>
            </div>
            </div>
          </div>
          <div onClick={onClose} className="text-gray-500 max-w-10 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full">
            <FaTimes className="w-5 h-5" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {data.registrationDate && (
            <div className="bg-yellow-50 rounded-lg p-4 mb-4 flex items-center gap-2 text-sm">
              <FaCalendar className="text-yellow-600" />
              <span className="font-medium">Registration Date:</span>
              <span>{formatDate(data.registrationDate)}</span>
            </div>
          )}

          {renderCollegeInfo()}
          {data.coach && renderUser(data.coach, "Coach")}

          {/* Event-specific */}
          {["badminton", "basketball", "cricket", "football", "kabaddi", "lawn_tennis", "squash", "table_tennis", "volleyball", "weight_lifting", "power_lifting", "chess"].includes(eventType) && renderTeamSport()}
          {eventType === "athletics" && renderAthletics()}
          {["bgmi", "freefire", "codm", "valorant", "clash_royale"].includes(eventType) && renderEsports()}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">Close</button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetailsModal;
