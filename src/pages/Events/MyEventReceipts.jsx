import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";
import axiosInstance from "../../utils/axios.js";
import RegistrationDetailsModal from "../../components/Admin/RegistrationDetailsModal.jsx";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import Loader from "../../components/Loader.jsx";


const MyEventReceipts = () => {
  const [registrations, setRegistrations] = useState([]);
  const [selectedReg, setSelectedReg] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Normalizer function ---
// --- Normalizer function ---
const normalizeReceipt = (reg) => {
  const receipt = reg.fullReceipt || {};

  // Merge players, deduplicate ONLY by Aadhaar ID
  const players = [];
  const aadhaarSet = new Set();

  [
    ...(Array.isArray(receipt?.players) ? receipt.players : receipt?.players ? [receipt.players] : []),
    ...(Array.isArray(reg?.players) ? reg.players : reg?.players ? [reg.players] : [])
  ].forEach((p) => {
    const aadhaar = p?.aadharId?.trim();
    if (!aadhaar || !aadhaarSet.has(aadhaar)) {
      players.push(p);
      if (aadhaar) aadhaarSet.add(aadhaar);
    }
  });

  return {
    eventId: reg.eventId,
    eventName: reg.eventName,
    category: reg.category || receipt?.category || null,
    collegeName: reg.collegeName || receipt?.collegeName,
    collegeAddress: reg.collegeAddress || receipt?.collegeAddress,
    registrationDate: reg.registrationDate || receipt?.registrationDate,
    payment: {
      status: reg.payment?.status || receipt?.paymentStatus,
      orderId: reg.payment?.orderId || receipt?.paymentOrderId,
      paymentId: reg.payment?.paymentId || receipt?.paymentId,
      signature: reg.payment?.signature || receipt?.paymentSignature,
      transaction: reg.payment?.transaction || receipt?.transaction,
      method: reg.payment?.method || receipt?.paymentMethod,
      amount: reg.payment?.amount || receipt?.paymentAmount,
      currency: reg.payment?.currency || receipt?.paymentCurrency,
      createdAt: reg.payment?.createdAt || receipt?.paymentDate,
      proofString: receipt?.proofString,
    },
    captain: receipt?.captain || null,
    viceCaptain: receipt?.viceCaptain || null,
    coach: receipt?.coach || null,
    substitutes: receipt?.substitutes || [],
    players, // deduplicated ONLY by Aadhaar ID
  };
};



 useEffect(() => {
    async function fetchMyRegistrations() {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/events/my-event-players");
        if (res.data.success) {
        const normalized = (res.data.data || []).map(normalizeReceipt);
        setRegistrations(normalized);  
      }
        console.log("My Events:", res.data);
      } catch (error) {
        console.error("Error fetching my events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMyRegistrations();
  }, []);

  return (
    <>
    <div
  className="min-h-screen bg-cover bg-center bg-no-repeat relative"
  style={{ backgroundImage: `url(/eveBG.jpg)` }}
>
  {/* Overlay */}
  {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
      {/* Navbar */}
<Navbar/>
      {/* Main Content */}

      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="mt-20 text-2xl font-bold text-left text-white mb-8">
          🎟 My Events
        </h2>

        {loading ? (
           <Loader message="Loading...!!"/>
          ) : registrations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-6xl">📝</div>
              <h3 className="text-lg font-semibold text-gray-200 mt-4">
                You have not registered for any event yet.
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {registrations.map((reg) => (
                <Card
                  key={reg.eventId || Math.random()}
                  className="shadow-lg hover:shadow-xl transition cursor-pointer bg-white/80"
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-indigo-600">
                      {reg.eventName?.replace("_", " ").toUpperCase() ||
                        "Unnamed Event"}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      Registration ID:{" "}
                      {reg.eventId ? reg.eventId.slice(0, 8) : "N/A"}...
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-gray-700">
                    <p>
                      <span className="font-medium">Number of Players:</span>{" "}
                      {reg.players?.length || 0}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {reg.registrationDate
                        ? new Date(reg.registrationDate).toLocaleString()
                        : "N/A"}
                    </p>
                    {/* <p>
                      <span className="font-medium">Status:</span>{" "}
                      <span
                        className={`px-2 py-1 rounded-md text-xs ${
                          reg.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : reg.paymentStatus === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {reg.paymentStatus || "N/A"}
                      </span>
                    </p> */}
                    <Button
                      className="mt-3 w-full"
                      onClick={() => setSelectedReg(reg)}
                    >
                      View Receipt
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

        <RegistrationDetailsModal
          isOpen={!!selectedReg}
          onClose={() => setSelectedReg(null)}
          data={selectedReg}

          eventType={selectedReg?.eventName}
        />
      </main>

      {/* Footer */}
    </div>
      <Footer />
    </>
  );
};

export default MyEventReceipts;
