// import React, { useState } from "react";
// import './forms.css';
// import Navbar from "../../../components/Navbar";
// import Footer from "../../../components/Footer";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useEventRegistration } from "../../../utils/useEventRegistration";

import { eventConfigs } from "../forms-centralized/components/eventConfig";
import EventForm from "../forms-centralized/components/EventForm";

// const Cricket = () => {
//   const navigate = useNavigate();
//   const initialPlayer = { fullname: "", email: "", phoneNumber: "", aadharId: "", collegeId: "", role: "batsman" };

//   const [form, setForm] = useState({
//     category: "Men",
//     collegeName: "",
//     collegeAddress: "",
//     captain: { ...initialPlayer },
//     viceCaptain: { ...initialPlayer },
//     players: Array(18).fill({ ...initialPlayer }),
//     coach: { fullname: "", email: "", phoneNumber: "", aadharId: "" }
//   });

//   const { registerEvent, submitting } = useEventRegistration({
//     endpoint: "/events/cricket",
//     redirectUrl: "/event/ins",
//     payment: true,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCaptainChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, captain: { ...prev.captain, [name]: value } }));
//   };

//   const handleViceCaptainChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, viceCaptain: { ...prev.viceCaptain, [name]: value } }));
//   };

//   const handlePlayerChange = (index, e) => {
//     const { name, value } = e.target;
//     setForm(prev => {
//       const updatedPlayers = [...prev.players];
//       updatedPlayers[index] = { ...updatedPlayers[index], [name]: value };
//       return { ...prev, players: updatedPlayers };
//     });
//   };

//   const handleCoachChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, coach: { ...prev.coach, [name]: value } }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const isValidPhone = (num) => /^\d{10}$/.test(num);
//     const isValidAadhaar = (num) => /^\d{12}$/.test(num);

//     if (!isValidPhone(form.captain.phoneNumber)) return toast.error("Captain's phone must be 10 digits");
//     if (!isValidAadhaar(form.captain.aadharId)) return toast.error("Captain's Aadhaar must be 12 digits");

//     if (!isValidPhone(form.viceCaptain.phoneNumber)) return toast.error("Vice-Captain's phone must be 10 digits");
//     if (!isValidAadhaar(form.viceCaptain.aadharId)) return toast.error("Vice-Captain's Aadhaar must be 12 digits");

//     for (let i = 0; i < form.players.length; i++) {
//       const p = form.players[i];
//       if (!p.fullname || !p.email || !p.phoneNumber || !p.aadharId) {
//         return toast.error(`Player ${i + 1} details are incomplete`);
//       }
//       if (!isValidPhone(p.phoneNumber)) return toast.error(`Player ${i + 1} phone must be 10 digits`);
//       if (!isValidAadhaar(p.aadharId)) return toast.error(`Player ${i + 1} Aadhaar must be 12 digits`);
//     }

//     const payload = {
//       collegeName: form.collegeName,
//       collegeAddress: form.collegeAddress,
//       captain: form.captain,
//       viceCaptain: form.viceCaptain,
//       players: form.players,
//       coach: form.coach
//     };

//     registerEvent(payload, navigate);
//   };

//   return (
//     <div className="div">
//       <Navbar />
//       <section className="event-forms">
//         <div className="form-heading">
//           <h2>Register for Cricket</h2>
//         </div>

//         <form className="form" onSubmit={handleSubmit}>
//           <h3>Captain Details</h3>
//           <input type="text" name="fullname" placeholder="Full Name" value={form.captain.fullname} onChange={handleCaptainChange} required />
//           <input type="email" name="email" placeholder="Email" value={form.captain.email} onChange={handleCaptainChange} required />
//           <input type="tel" name="phoneNumber" placeholder="Phone Number" value={form.captain.phoneNumber} onChange={handleCaptainChange} required />
//           <input type="text" name="aadharId" placeholder="Aadhaar ID" value={form.captain.aadharId} onChange={handleCaptainChange} required />
//           <input type="text" name="collegeId" placeholder="College ID (optional)" value={form.captain.collegeId} onChange={handleCaptainChange} />

//           <h3>Vice-Captain Details</h3>
//           <input type="text" name="fullname" placeholder="Full Name" value={form.viceCaptain.fullname} onChange={handleViceCaptainChange} required />
//           <input type="email" name="email" placeholder="Email" value={form.viceCaptain.email} onChange={handleViceCaptainChange} required />
//           <input type="tel" name="phoneNumber" placeholder="Phone Number" value={form.viceCaptain.phoneNumber} onChange={handleViceCaptainChange} required />
//           <input type="text" name="aadharId" placeholder="Aadhaar ID" value={form.viceCaptain.aadharId} onChange={handleViceCaptainChange} required />
//           <input type="text" name="collegeId" placeholder="College ID (optional)" value={form.viceCaptain.collegeId} onChange={handleViceCaptainChange} />

//           <input type="text" name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange} />
//           <input type="text" name="collegeAddress" placeholder="College Address" value={form.collegeAddress} onChange={handleChange} />

//           <h3>Players</h3>
//           {form.players.map((player, index) => (
//             <div key={index} className="player-form">
//               <h4>Player {index + 1}</h4>
//               <input type="text" name="fullname" placeholder="Full Name" value={player.fullname} onChange={e => handlePlayerChange(index, e)} required />
//               <input type="email" name="email" placeholder="Email" value={player.email} onChange={e => handlePlayerChange(index, e)} required />
//               <input type="tel" name="phoneNumber" placeholder="Phone Number" value={player.phoneNumber} onChange={e => handlePlayerChange(index, e)} required />
//               <input type="text" name="aadharId" placeholder="Aadhaar ID" value={player.aadharId} onChange={e => handlePlayerChange(index, e)} required />
//               <input type="text" name="collegeId" placeholder="College ID (optional)" value={player.collegeId} onChange={e => handlePlayerChange(index, e)} />
//               <select name="role" value={player.role} onChange={e => handlePlayerChange(index, e)}>
//                 <option value="batsman">Batsman</option>
//                 <option value="bowler">Bowler</option>
//                 <option value="all_rounder">All Rounder</option>
//                 <option value="wicket_keeper">Wicket Keeper</option>
//               </select>
//             </div>
//           ))}

//           <h3>Coach Details (optional)</h3>
//           <input type="text" name="fullname" placeholder="Full Name" value={form.coach.fullname} onChange={handleCoachChange} />
//           <input type="email" name="email" placeholder="Email" value={form.coach.email} onChange={handleCoachChange} />
//           <input type="tel" name="phoneNumber" placeholder="Phone Number" value={form.coach.phoneNumber} onChange={handleCoachChange} />
//           <input type="text" name="aadharId" placeholder="Aadhaar ID" value={form.coach.aadharId} onChange={handleCoachChange} />

//           <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Register & Pay'}</button>
//         </form>
//       </section>
//       <Footer />
//     </div>
//   );
// };

// export default Cricket;




const Cricket = () => {
  return <EventForm config={eventConfigs.cricket} />;
};

export default Cricket;



