import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";
import axiosInstance from "../../utils/axios.js";
import RegistrationDetailsModal from "../../components/Admin/RegistrationDetailsModal.jsx";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";


const MyEventReceipts = () => {
  const [registrations, setRegistrations] = useState([]);
  const [selectedReg, setSelectedReg] = useState(null);

  useEffect(() => {
    async function fetchMyRegistrations() {
      try {
        const res = await axiosInstance.get("/events/my-event-players");
        if (res.data.success) {
          setRegistrations(res.data.data || []);
        }
        console.log("My Events:", res.data);
      } catch (error) {
        console.error("Error fetching my events:", error);
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

        {registrations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-6xl">📝</div>
            <h3 className="text-lg font-semibold text-gray-700 mt-4">
              You have not registered for any event yet.
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            {registrations.map((reg) => (
              <Card
                key={reg.eventId || Math.random()}
                className="shadow-lg hover:shadow-xl transition cursor-pointer bg-white/80"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-indigo-600">
                    {reg.eventName?.replace("_", " ").toUpperCase() || "Unnamed Event"}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    Registration ID: {reg.eventId ? reg.eventId.slice(0, 8) : "N/A"}...
                  </p>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-700">
                  <p>
                    <span className="font-medium">Number of Players:</span> {reg.players?.length || 0}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {reg.registrationDate
                      ? new Date(reg.registrationDate).toLocaleString()
                      : "N/A"}
                  </p>
                  <p>
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
                  </p>
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
