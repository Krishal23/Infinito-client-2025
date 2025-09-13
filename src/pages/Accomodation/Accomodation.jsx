import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const LAST_DAY = new Date("2025-10-13T00:00:00.000Z");

const formatISODate = (d) => {
  if (!d) return "";
  const iso = new Date(d).toISOString();
  return iso.split("T")[0];
};

export default function AccommodationWizard() {
  const [step, setStep] = useState(1);

  // Form fields
  const [events, setEvents] = useState([]); // all registered events
  const [eventId, setEventId] = useState("");
  const [playersOptions, setPlayersOptions] = useState([]); // players of selected event
  const [selectedPlayers, setSelectedPlayers] = useState([]); // selected players for accommodation
  const [genderCategory, setGenderCategory] = useState("male");
  const [checkInDate, setCheckInDate] = useState("");
  const [stayDays, setStayDays] = useState(1);
  const [checkoutDate, setCheckoutDate] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  // UI state
  const [maxStayDays, setMaxStayDays] = useState(5);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);




  const handleApplyCoupon = async () => {
    setCouponError("");
    setAppliedCoupon(null);
    if (!couponCode) {
      setCouponError("Enter a coupon code");
      return;
    }
    try {
      const res = await axiosInstance.get(`/coupons/validate/${couponCode}`);
      if (res.data.success) {
        setAppliedCoupon(res.data.coupon);
      } else {
        setCouponError("Invalid coupon");
      }
    } catch (err) {
      setCouponError(err.response?.data?.message || "Invalid coupon");
    }
  };

  // Fetch user events on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosInstance("/events/my-event-players");
        const data = res?.data;
        console.log("Fetched events:", data);


        if (data.success) {
          setEvents(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  // Update players dropdown when event changes
  useEffect(() => {
    if (!eventId) {
      setPlayersOptions([]);
      setSelectedPlayers([]);
      return;
    }
    const event = events.find((e) => e.eventId === eventId);
    if (event) {
      setPlayersOptions(event.players);
      setSelectedPlayers([]); // reset selected players
    }
  }, [eventId, events]);

  // Recalculate checkout date & max days
  useEffect(() => {
    if (!checkInDate) {
      setCheckoutDate("");
      setMaxStayDays(5);
      return;
    }
    const inDate = new Date(checkInDate + "T00:00:00.000Z");
    let calcLastDay = new Date(inDate);
    calcLastDay.setDate(calcLastDay.getDate() + (Number(stayDays) - 1));
    if (calcLastDay > LAST_DAY) calcLastDay = new Date(LAST_DAY);
    setCheckoutDate(formatISODate(calcLastDay));

    const diffDaysInclusive = Math.floor((LAST_DAY.getTime() - inDate.getTime()) / MS_PER_DAY) + 1;
    const allowed = Math.max(1, Math.min(5, diffDaysInclusive));
    setMaxStayDays(allowed);

    if (Number(stayDays) > allowed) setStayDays(allowed);
  }, [checkInDate, stayDays]);

  // Validation
  const validateStep1 = () => {
    const e = {};
    if (!eventId) e.eventId = "Select an event";
    if (!checkInDate) e.checkInDate = "Check-in date required";
    if (!stayDays || stayDays < 1) e.stayDays = "Stay days must be >= 1";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!selectedPlayers || selectedPlayers.length === 0) e.players = "Select at least one player";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Step navigation
  const next = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep(step + 1);
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  // Handle player selection
  const togglePlayer = (player) => {
    const exists = selectedPlayers.find((p) => p.aadharId === player.aadharId);
    if (exists) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.aadharId !== player.aadharId));
    } else {
      setSelectedPlayers([...selectedPlayers, player]);
    }
    console.log("Selected players:", selectedPlayers);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep1() || !validateStep2()) return;
    setSubmitting(true);
    setMessage(null);

    const payloadPlayers = selectedPlayers.map((p) => ({
      name: p.name,
      email: p.email,
      phoneNumber: p.phoneNumber,
      aadharId: p.aadharId,
    }));

    const payload = {
      eventId,
      genderCategory,
      checkInDate,
      stayDays,
      players: payloadPlayers,
      couponCode: couponCode || null,
    };

    try {
      console.log("Sending payload:", payload);
      const res = await axiosInstance.post("/accommodation", payload); // Correct endpoint
      console.log("Response:", res.data);
      setMessage({ type: "success", text: "Accommodation booked successfully" });
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || err.message || "Booking failed",
      });
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Accommodation Booking</h1>
      {message && (
        <div className={`mb-4 p-3 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* STEP 1: Event & Booking */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Event</label>
              <select
                className="w-full mt-1 p-2 border rounded"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
              >
                <option value="">-- Select Event --</option>
                {events.map((ev) => (
                  <option key={ev.eventId} value={ev.eventId}>{ev.eventName}</option>
                ))}
              </select>
              {errors.eventId && <p className="text-red-600 text-sm">{errors.eventId}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Gender Category</label>
              <select className="w-full mt-1 p-2 border rounded" value={genderCategory} onChange={(e) => setGenderCategory(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm">Check-in Date</label>
                <input type="date" min="2025-10-09" max="2025-10-13" className="w-full mt-1 p-2 border rounded" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm">Stay Days (max {maxStayDays})</label>
                <input type="number" min={1} max={maxStayDays} className="w-full mt-1 p-2 border rounded" value={stayDays} onChange={(e) => setStayDays(Number(e.target.value))} />
              </div>
            </div>

            {checkoutDate && (
              <div className="p-3 bg-gray-50 rounded border">
                <p>Checkout: <span className="font-medium">{checkoutDate}</span></p>
              </div>
            )}


          </div>
        )}

        {/* STEP 2: Players */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-semibold">Select Players</h2>
            {errors.players && <p className="text-red-600">{errors.players}</p>}
            {playersOptions.map((p) => {
              const selected = selectedPlayers.find((sp) => sp.aadharId === p.aadharId);
              return (
                <div key={p.aadharId} className="flex items-center space-x-2">
                  <input type="checkbox" checked={!!selected} onChange={() => togglePlayer(p)} />
                  <span>{p.name} · {p.email}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 3: Review */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-semibold">Review & Submit</h2>

            {/* Booking Info */}
            <table className="w-full border-collapse border mb-4">
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">Event</td>
                  <td className="p-2">{eventId}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Check-in</td>
                  <td className="p-2">{checkInDate}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Stay Days</td>
                  <td className="p-2">{stayDays}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Checkout</td>
                  <td className="p-2">{checkoutDate}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Gender</td>
                  <td className="p-2">{genderCategory}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Coupon</td>
                  <td className="p-2">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button
                        type="button"
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                        onClick={handleApplyCoupon}
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-red-600 text-sm">{couponError}</p>}
                    {appliedCoupon && (
                      <p className="text-green-600 text-sm">
                        Applied: {appliedCoupon.coupontag} ({appliedCoupon.discount}
                        {appliedCoupon.couponType === "percentage" ? "%" : "₹"} off)
                      </p>
                    )}
                  </td>
                </tr>

              </tbody>
            </table>

            {/* Players Table */}
            <div>
              <h3 className="font-medium mb-2">Players ({selectedPlayers.length})</h3>
              <table className="w-full border border-gray-300 rounded mb-4">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border-b">Name</th>
                    <th className="p-2 border-b">Email</th>
                    <th className="p-2 border-b">Phone</th>
                    <th className="p-2 border-b">Aadhaar</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPlayers.map((p) => (
                    <tr key={p.aadharId} className="text-sm">
                      <td className="p-2 border-b">{p.name}</td>
                      <td className="p-2 border-b">{p.email}</td>
                      <td className="p-2 border-b">{p.phoneNumber}</td>
                      <td className="p-2 border-b">{p.aadharId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bill / Summary */}
            {/* Bill / Summary */}
            <div>
              <h3 className="font-medium mb-2">Bill Summary</h3>
              <table className="w-full border border-gray-300 rounded">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border-b">Description</th>
                    <th className="p-2 border-b">Quantity</th>
                    <th className="p-2 border-b">Rate</th>
                    <th className="p-2 border-b">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-sm">
                    <td className="p-2 border-b">Players</td>
                    <td className="p-2 border-b">{selectedPlayers.length}</td>
                    <td className="p-2 border-b">₹500 / day</td>
                    <td className="p-2 border-b">₹{selectedPlayers.length * stayDays * 500}</td>
                  </tr>

                  {/* Coupon Discount Row */}
                  {appliedCoupon && (
                    <tr className="text-sm text-green-700">
                      <td className="p-2 border-b" colSpan={3}>
                        Coupon ({appliedCoupon.coupontag})
                      </td>
                      <td className="p-2 border-b">
                        - ₹
                        {appliedCoupon.couponType === "percentage"
                          ? Math.floor(
                            (selectedPlayers.length * stayDays * 500 * appliedCoupon.discount) / 100
                          )
                          : appliedCoupon.discount}
                      </td>
                    </tr>
                  )}

                  {/* Final Total */}
                  <tr className="text-sm font-medium bg-gray-50">
                    <td className="p-2 border-b" colSpan={3}>
                      Final Total
                    </td>
                    <td className="p-2 border-b">
                      ₹
                      {(() => {
                        const base = selectedPlayers.length * stayDays * 500;
                        if (!appliedCoupon) return base;
                        if (appliedCoupon.couponType === "percentage") {
                          return base - Math.floor((base * appliedCoupon.discount) / 100);
                        }
                        return Math.max(0, base - appliedCoupon.discount);
                      })()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        )}



        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          {step > 1 && <button type="button" onClick={prev} className="px-4 py-2 border rounded">&larr; Back</button>}
          {step < 3 && <button type="button" onClick={next} className="px-4 py-2 bg-blue-600 text-white rounded">Next &rarr;</button>}
          {step === 3 && <button type="submit" disabled={submitting} className="px-4 py-2 bg-green-600 text-white rounded">{submitting ? "Submitting..." : "Confirm & Submit"}</button>}
        </div>
      </form>
    </div>
  );
}
