// import React, { useState } from "react";
// import './forms.css';
// import Navbar from "../../../components/Navbar";
// import Footer from "../../../components/Footer";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useEventRegistration } from "../../../utils/useEventRegistration";

// const Weightlifting_ = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     player: { name: "", email: "", phoneNumber: "", aadhaar: "" },
//     collegeName: "",
//     collegeAddress: "",
//     coachName: "",
//     coachEmail: "",
//     coachPhone: "",
//   });

//   const { registerEvent, submitting } = useEventRegistration({
//     endpoint: "/events/weight_lifting",
//     redirectUrl: "/event/ins",
//     payment: true,
//   });

//   const isValidAadhaar = (val) => /^\d{12}$/.test(val.trim());
//   const isValidPhone = (val) => /^\d{10}$/.test(val.trim());

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePlayerChange = (field, value) => {
//     setForm((prev) => ({
//       ...prev,
//       player: { ...prev.player, [field]: value }
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const p = form.player;
//     if (!p.name.trim() || !p.email.trim() || !isValidPhone(p.phoneNumber) || !isValidAadhaar(p.aadhaar)) {
//       toast.error("Please fill valid details for the player");
//       return;
//     }

//     if (form.coachPhone && !isValidPhone(form.coachPhone)) {
//       toast.error("Please enter a valid Coach phone number");
//       return;
//     }

//     const payload = {
//       players: {
//         fullname: p.name,
//         email: p.email,
//         phoneNumber: p.phoneNumber,
//         aadharId: p.aadhaar,
//       },
//       collegeName: form.collegeName || "",
//       collegeAddress: form.collegeAddress || "",
//       coach: form.coachName || form.coachEmail || form.coachPhone ? {
//         name: form.coachName,
//         email: form.coachEmail,
//         phoneNumber: form.coachPhone
//       } : undefined,
//     };

//     registerEvent(payload, navigate);
//   };

//   return (
//     <div className="div">
//       <Navbar />
//       <section className="event-forms">
//         <h2>Register for Weight Lifting</h2>
//         <form className="form" onSubmit={handleSubmit}>

//           <h3>Player Detail</h3>
//           <input
//             type="text"
//             placeholder="Name"
//             value={form.player.name}
//             onChange={(e) => handlePlayerChange("name", e.target.value)}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={form.player.email}
//             onChange={(e) => handlePlayerChange("email", e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Phone Number"
//             value={form.player.phoneNumber}
//             onChange={(e) => handlePlayerChange("phoneNumber", e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Aadhaar"
//             value={form.player.aadhaar}
//             onChange={(e) => handlePlayerChange("aadhaar", e.target.value)}
//             required
//           />

//           <h3>College Details (Optional)</h3>
//           <input type="text" name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange} />
//           <input type="text" name="collegeAddress" placeholder="College Address" value={form.collegeAddress} onChange={handleChange} />

//           <h3>Coach Details (Optional)</h3>
//           <input type="text" name="coachName" placeholder="Coach Name" value={form.coachName} onChange={handleChange} />
//           <input type="email" name="coachEmail" placeholder="Coach Email" value={form.coachEmail} onChange={handleChange} />
//           <input type="text" name="coachPhone" placeholder="Coach Phone Number" value={form.coachPhone} onChange={handleChange} />

//           <button type="submit" disabled={submitting}>
//             {submitting ? "Submitting..." : "Register & Pay"}
//           </button>
//         </form>
//       </section>
//       <Footer />
//     </div>
//   );
// };

// export default Weightlifting_;



import EventForm from "../forms-centralized/components/EventForm";
import { eventConfigs } from "../forms-centralized/components/eventConfig";

const Weightlifting_ = () => {
  return <EventForm config={eventConfigs.weightlifting} />;
};

export default Weightlifting_;

