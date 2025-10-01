import React from 'react';
import {
  FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard,
  FaGraduationCap, FaUsers, FaTrophy, FaCalendar,
  FaDownload
} from 'react-icons/fa';
// import jsPDF from "jspdf";
// import "jspdf-autotable";

export const downloadReceipt = (data, eventType = "registration", logoUrl) => {
  if (!data) return;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let currentY = 20;

  // --- Logo ---
  if (logoUrl) {
    const imgWidth = 40;
    const imgHeight = 40;
    doc.addImage(logoUrl, "PNG", (pageWidth - imgWidth) / 2, 5, imgWidth, imgHeight);
    currentY += 40;
  }

  // --- Header ---
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("INFINITO IIT Patna 2025", pageWidth / 2, currentY, { align: "center" });
  currentY += 10;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Event: ${(data.eventName || "").toUpperCase() || "—"}`, 14, currentY);
  currentY += 6;
  doc.text(`Registration ID: ${data._id || "—"}`, 14, currentY);
  currentY += 6;
  doc.text(`Registration Date: ${data.registrationDate ? new Date(data.registrationDate).toLocaleString() : "—"}`, 14, currentY);
  currentY += 8;

  // --- Payment Status ---
  let paymentColor = [255, 165, 0]; // orange
  if (data.payment?.status === "paid") paymentColor = [46, 204, 113]; // green
  else if (data.payment?.status === "failed") paymentColor = [231, 76, 60]; // red

  doc.setFillColor(...paymentColor);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.rect(14, currentY - 4, 40, 6, "F");
  doc.text(`Payment: ${data.payment?.status || "—"}`, 16, currentY);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  currentY += 10;

  // --- College Info ---
  doc.setFont("helvetica", "bold");
  doc.setFillColor(52, 152, 219);
  doc.setTextColor(255, 255, 255);
  doc.rect(14, currentY - 4, pageWidth - 28, 7, "F");
  doc.text("College Information", 16, currentY);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  currentY += 6;
  doc.text(`College: ${data.collegeName || "—"}`, 14, currentY);
  if (data.collegeAddress) {
    currentY += 6;
    doc.text(`Address: ${data.collegeAddress}`, 14, currentY);
  }
  currentY += 10;

  // --- Coach Info ---
  if (data.coach) {
    doc.setFont("helvetica", "bold");
    doc.setFillColor(155, 89, 182);
    doc.setTextColor(255, 255, 255);
    doc.rect(14, currentY - 4, pageWidth - 28, 7, "F");
    doc.text("Coach Information", 16, currentY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    currentY += 6;
    doc.text(`Name: ${data.coach.fullname || "—"}`, 14, currentY);
    currentY += 6;
    doc.text(`Email: ${data.coach.email || "—"}`, 14, currentY);
    currentY += 6;
    doc.text(`Phone: ${data.coach.phoneNumber || "—"}`, 14, currentY);
    if (data.coach.aadharId) {
      currentY += 6;
      doc.text(`Aadhar ID: ${data.coach.aadharId}`, 14, currentY);
    }
    currentY += 10;
  }

  // --- Team Members ---
  const isTeamSport = ["football", "cricket", "basketball", "volleyball", "kabaddi", "badminton", "table_tennis", "chess"].includes(eventType);
  if (isTeamSport) {
    const rows = [];
    if (data.captain) rows.push(["Captain", data.captain.fullname || "—", data.captain.email || "—", data.captain.phoneNumber || "—", data.captain.aadharId || "—"]);
    if (data.viceCaptain) rows.push(["Vice Captain", data.viceCaptain.fullname || "—", data.viceCaptain.email || "—", data.viceCaptain.phoneNumber || "—", data.viceCaptain.aadharId || "—"]);
    if (data.players?.length) data.players.forEach((p, i) => rows.push([`Player ${i + 1}`, p.fullname || "—", p.email || "—", p.phoneNumber || "—", p.aadharId || "—"]));
    if (data.substitutes?.length) data.substitutes.forEach((s, i) => rows.push([`Substitute ${i + 1}`, s.fullname || "—", s.email || "—", s.phoneNumber || "—", s.aadharId || "—"]));

    doc.autoTable({
      startY: currentY + 6,
      head: [["Role", "Name", "Email", "Phone", "Aadhar"]],
      body: rows,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { left: 14, right: 14 },
    });

    currentY = doc.lastAutoTable.finalY + 10;
  }

  doc.save(`${eventType}_${data._id || "data"}.pdf`);
};



const RegistrationDetailsModal = ({ isOpen, onClose, data, eventType }) => {
  if (!isOpen || !data) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleString("en-GB", {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  };

  const renderTransactionDetails = () => {
    const tx = data.payment;
    if (!tx) return null;
    return (
      <div className="bg-gray-100 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <FaTrophy className="text-gray-600" /> Transaction Details
        </h4>
        <div className="text-sm space-y-1">
          <div><span className="font-medium">Payment ID:</span> {tx.paymentId || "—"}</div>
          <div><span className="font-medium">Order ID:</span> {tx.orderId || "—"}</div>
          <div><span className="font-medium">Transaction ID:</span> {tx.transaction || "—"}</div>
          <div><span className="font-medium">Amount:</span> {tx.amount ? `${tx.amount} ${tx.currency || ""}` : "—"}</div>
          <div><span className="font-medium">Method:</span> {tx.method || "—"}</div>
          <div><span className="font-medium">Status:</span> {tx.status || "—"}</div>
          <div><span className="font-medium">Date:</span> {tx.createdAt ? new Date(tx.createdAt).toLocaleString() : "—"}</div>
          <div><span className="font-medium">Signature:</span> {tx.signature || "—"}</div>
        </div>
      </div>
    );
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
           {/* <div
              onClick={() => downloadReceipt(data, eventType)}
              className="flex items-center gap-2 bg-blue-600 text-white w-full mt-4"
            >
              <FaDownload /> Download Receipt
            </div>*/}
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
