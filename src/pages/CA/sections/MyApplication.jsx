import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";
import { motion } from "framer-motion";
import "../../../styles/ca/MyApplication.css";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { toast } from "react-toastify";

export default function MyApplication() {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axiosInstance.get("/ca/application");
        setApplication(res.data.application);
      } catch (err) {
        console.error("Error fetching application:", err);
        setError(err.response?.data?.message || "Failed to fetch application");
        toast.error("Failed to load your application");
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="myapp-container">
          <div className="loading-text">Loading your application...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="myapp-container">
          <div className="error-text">Error: {error}</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!application) {
    return (
      <>
        <Navbar />
        <div className="myapp-container">
          <div className="no-application-text">No application found</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="myapp-container">
        <motion.div
          className="myapp-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="myapp-title">My CA Application</h2>

          <div className="myapp-info">
            <p><span>Full Name:</span> {application.fullName}</p>
            <p><span>Username:</span> {application.username}</p>
            <p><span>Email:</span> {application.email}</p>
            <p><span>Alt Email:</span> {application.alternativeEmail}</p>
            <p><span>College Name:</span> {application.collegeName}</p>
            <p><span>College Year:</span> {application.collegeYear}</p>
            <p><span>POR:</span> {application.por}</p>
            <p><span>Address:</span> {application.collegeAddress}</p>
            <p><span>Phone:</span> {application.phoneNumber}</p>
            <p><span>How Did You Know:</span> {application.howDidYouKnow}</p>
            <p><span>Statement:</span> {application.applicationStatement}</p>
            <p>
              <span>Status:</span>
              <span
                className={`status-badge ${application.status.toLowerCase()}`}
              >
                {application.status}
              </span>
            </p>
            <p><span>Applied On:</span> {new Date(application.applicationDate).toLocaleString()}</p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
