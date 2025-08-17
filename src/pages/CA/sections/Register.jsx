import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import axiosInstance from "../../../utils/axios";
import { AuthContext } from "../../../context/AuthContext";

const CARegister = () => {
  const [formData, setFormData] = useState({
    applicationStatement: "",
    fullName: "",
    collegeName: "",
    rollno: "",
    collegeYear: "",
    por: "",
    collegeAddress: "",
    phoneNumber: "",
    alternativeEmail: "",
    howDidYouKnow: "Instagram",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    if (user.role === "ca") {
      navigate("/ca-dashboard");
      return;
    }

    // Set defaults from user
    setFormData((prev) => ({
      ...prev,
      fullName: user.fullname || "",
      collegeName: user.collegeName || "",
      por: user.por || "",
      collegeAddress: user.address || "",
    }));

    // Application status checks
    const status = user.caApplication?.status;
    if (!user.caApplication) {
      setLoading(false);
    } else if (status === "pending") {
      navigate("/ca-application");
      setMessage("Your application has been submitted. Please wait for approval.");
      setLoading(false);
    } else if (status === "rejected") {
      setMessage("Your previous application was rejected.");
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/ca/apply", {
        username: user.username,
        email: user.email,
        ...formData,
      });
      alert("Application submitted!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Error submitting");
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <section className="section register_">
        <div className="register">Register as Campus Ambassador</div>

        {message ? (
          <p>{message}</p>
        ) : (
          <form className="register-form" onSubmit={handleSubmit}>
            <h3>
               Hello {user.username.toUpperCase()}!!
            </h3>
            <p>
              <b>Email:</b> {user.email}
            </p>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="collegeName"
              placeholder="College Name"
              value={formData.collegeName}
              onChange={handleChange}
              required
            />
            <select
              name="collegeYear"
              value={formData.collegeYear}
              onChange={handleChange}
              required
            >
              <option value="">Select College Year</option>
              <option value="First Year">First Year</option>
              <option value="Second Year">Second Year</option>
              <option value="Third Year">Third Year</option>
              <option value="Fourth Year">Fourth Year</option>
              <option value="Fifth Year">Fifth Year</option>
            </select>
            <input
              type="text"
              name="rollno"
              placeholder="Roll Number"
              value={formData.rollno}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="por"
              placeholder="Position of Responsibility (POR if Any)"
              value={formData.por}
              onChange={handleChange}
            />
            <input
              type="text"
              name="collegeAddress"
              placeholder="College Address"
              value={formData.collegeAddress}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="alternativeEmail"
              placeholder="Alternative Email ID"
              value={formData.alternativeEmail}
              onChange={handleChange}
            />

            <label>How do you know about Infinito?</label>
            <select
              name="howDidYouKnow"
              value={formData.howDidYouKnow}
              onChange={handleChange}
              required
            >
              <option value="Instagram">Instagram</option>
              <option value="WhatsApp Channel">WhatsApp Channel</option>
              <option value="UNSTOP">UNSTOP</option>
              <option value="Friends">Friends</option>
              <option value="News">News</option>
              <option value="YouTube">YouTube</option>
              <option value="Facebook">Facebook</option>
              <option value="Others">Others</option>
            </select>

            <textarea
              name="applicationStatement"
              placeholder="Why do you want to become CA?"
              value={formData.applicationStatement}
              onChange={handleChange}
              required
            />
            <button type="submit">Register</button>
          </form>
        )}
      </section>
      <Footer />
    </>
  );
};

export default CARegister;
