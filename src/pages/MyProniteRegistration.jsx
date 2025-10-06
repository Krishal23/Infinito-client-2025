import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./Events/ui/card.jsx";
import Navbar from "../components/Navbar.jsx";
import Loader from "../components/Loader.jsx";
import Footer from "../components/Footer.jsx";
import { Button } from "./Events/ui/button.jsx";
import axiosInstance from "../utils/axios.js";
import ProniteRegistrationModal from "../components/Admin/ProniteRegistrationModal.jsx";

const MyProniteRegistration = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedReg, setSelectedReg] = useState(null);
    const [userEmail, setUserEmail] = useState(""); // User email
    const [username, setUsername] = useState("");   // Username

    useEffect(() => {
        async function fetchMyRegistrations() {
            try {
                setLoading(true);
                const res = await axiosInstance.get("/pronite/my-pronite");
                if (res.data.registrations) {
                    setRegistrations(res.data.registrations);
                }
                if (res.data.user) {
                    setUserEmail(res.data.user.email);
                    setUsername(res.data.user.username);
                }
                console.log("My Pronite Registrations:", res.data);
            } catch (error) {
                console.error("Error fetching my Pronite registrations:", error);
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
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <h2 className="mt-20 text-2xl font-bold text-left text-white mb-8">
                        🎟 My Pronite Registrations
                    </h2>


                    {loading ? (
                        <Loader message="Loading...!!" />
                    ) : registrations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="text-6xl">📝</div>
                            <h3 className="text-lg font-semibold text-gray-200 mt-4">
                                You have not registered for Pronite yet.
                            </h3>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {registrations.map((reg) => (
                                <Card
                                    key={reg._id}
                                    className="shadow-lg hover:shadow-xl transition cursor-pointer bg-white/80"
                                >
                                    <CardHeader>
                                        <CardTitle className="text-lg font-semibold text-indigo-600">
                                            {reg.name}
                                        </CardTitle>
                                        <p className="text-sm text-gray-500">
                                            Registration ID: {reg._id.slice(0, 8)}...
                                        </p>
                                    </CardHeader>
                                    <CardContent className="space-y-2 text-sm text-gray-700">
                                        {username && userEmail && (
                                            <p className="text-zinc-700 text-sm mb-6">
                                                Registered by <span className="font-semibold">{username}</span> • {userEmail}
                                            </p>
                                        )}
                                        <p>
                                            <span className="font-medium">Phone:</span> {reg.phone}
                                        </p>
                                        <p>
                                            <span className="font-medium">College:</span>{" "}
                                            {reg.collegeName || "N/A"}
                                        </p>
                                        <p>
                                            <span className="font-medium">Address:</span> {reg.address}
                                        </p>
                                        <p>
                                            <span className="font-medium">Transaction ID:</span>{" "}
                                            {reg.transactionId}
                                        </p>
                                        <p>
                                            <span className="font-medium">Amount Paid:</span> ₹
                                            {reg.amountPaid}
                                        </p>
                                        <p>
                                            <span className="font-medium">Registered On:</span>{" "}
                                            {new Date(reg.registrationDate).toLocaleString()}
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

                    <ProniteRegistrationModal
                        isOpen={!!selectedReg}
                        onClose={() => setSelectedReg(null)}
                        data={selectedReg}
                        email={userEmail}
                        eventType="Pronite"
                    />
                </main>
            </div>
            <Footer />
        </>
    );
};

export default MyProniteRegistration;
