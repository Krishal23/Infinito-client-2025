import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useAccommodationBooking } from "../../utils/useAccommodationBooking";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";

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
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [couponError, setCouponError] = useState("");
  // UI state
  const [maxStayDays, setMaxStayDays] = useState(5);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const accomPricePerDay = 250;


  const navigate = useNavigate();
  const { bookAccommodation, submitting: accomSubmiting } = useAccommodationBooking({
    endpoint: "/accommodation",
    redirectUrl: "/accommodation/success",
  });

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      setCouponError("Please enter a coupon code.");
      setAppliedCoupon(null);
      setDiscount(0);
      setFinalAmount(selectedPlayers.length * stayDays * accomPricePerDay);
      return;
    }

    const baseAmount = selectedPlayers.length * stayDays * accomPricePerDay;

    try {
      
      const res = await axiosInstance.get(
        `/coupons/validate/${couponCode}?amount=${baseAmount}&category=ACCOM`
      );

      const data = res.data;
      console.log(data)

      if (data.success) {
        // Coupon is valid
        const coupon = data.coupon;
        let discountAmount = 0;

        if (coupon.couponType === "percentage") {
          discountAmount = Math.floor((baseAmount * coupon.discount) / 100);
          if (coupon.maxDiscountAmount) {
            discountAmount = Math.min(discountAmount, coupon.maxDiscountAmount);
          }
        } else {
          discountAmount = coupon.discount;
        }

        setAppliedCoupon(coupon);
        setDiscount(discountAmount);
        setFinalAmount(Math.max(0, baseAmount - discountAmount));
        setCouponError("");
      } else {
        // Coupon invalid / already used / expired / min purchase not met
        setAppliedCoupon(null);
        setDiscount(0);
        setFinalAmount(baseAmount);
        setCouponError(data.message || "Coupon is not valid");
      }
    } catch (err) {
      setAppliedCoupon(null);
      setDiscount(0);
      setFinalAmount(baseAmount);
      setCouponError(
        err.response?.data?.message || "Something went wrong while validating coupon"
      );
    }
  };



  useEffect(() => {
    const base = selectedPlayers.length * stayDays * accomPricePerDay;
    setFinalAmount(appliedCoupon
      ? appliedCoupon.couponType === "percentage"
        ? base - Math.floor((base * appliedCoupon.discount) / 100)
        : Math.max(0, base - appliedCoupon.discount)
      : base
    );
  }, [selectedPlayers, stayDays, appliedCoupon]);

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
      // const res = await axiosInstance.post("/accommodation", payload); // Correct endpoint
      bookAccommodation(payload, navigate);
      // console.log("Response:", res.data);
      // setMessage({ type: "success", text: "Accommodation booked successfully" });
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
// client\Infinito\public\accomBG.jpg

  return (
    <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
     style={{ backgroundImage: "url('./accomBG.jpg')" }}
     >
      <div className="absolute inset-0 bg-black/50"></div>
    {(submitting || accomSubmiting) && (
      <Loader message="Processing your payment, please wait..." />
    )}
      <Navbar />
    <div className="relative mb-4 z-10 max-w-3xl mx-auto p-6 bg-white/60 backdrop-blur-md rounded shadow-md min-h-[95vh] pt-20">
        <h1 className=" text-2xl font-bold mb-4">Accommodation Booking</h1>
        <span className="text-sm text-zinc-900">NOTE: For accomodation you need to be registered in atleast one event.</span>
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
                  {/* <option value="mixed">Mixed</option> */}
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
            <div className="space-y-4 overflow-x-auto ">
  <h2 className="text-xl font-semibold text-gray-800">Select Players</h2>
  {errors.players && (
    <p className="text-red-600 text-sm">{errors.players}</p>
  )}

  <div className="shadow-md rounded-lg overflow-hidden  border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200 ">
      <thead className="bg-zinc-600">
        <tr>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">
            Select
          </th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">
            Name
          </th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-200">
            Email
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {Array.from(
          new Map(playersOptions.map((p) => [p.aadharId, p])).values()
        ).map((p) => {
          const selected = selectedPlayers.find(
            (sp) => sp.aadharId === p.aadharId
          );
          return (
            <tr
              key={p.aadharId}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-4 py-3 text-center">
                <input
                  type="checkbox"
                  checked={!!selected}
                  onChange={() => togglePlayer(p)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </td>
              <td className="px-4 py-3 text-gray-800">{p.name}</td>
              <td className="px-4 py-3 text-gray-600">{p.email}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>

          )}

          {/* STEP 3: Review */}
          {step === 3 && (
            <div className="space-y-6 overflow-x-scroll">
  <h2 className="text-2xl font-semibold text-gray-800">Review & Submit</h2>

  {/* Booking Info */}
  <div className="shadow-md rounded-lg overflow-scroll border border-gray-500">
    <table className="min-w-full overflow-x:scroll divide-y divide-gray-800">
      <tbody className="bg-white/60">
        {[
          ["Event", eventId],
          ["Check-in", checkInDate],
          ["Stay Days", stayDays],
          ["Checkout", checkoutDate],
          ["Gender", genderCategory],
        ].map(([label, value]) => (
          <tr key={label} className="hover:bg-gray-50 transition-colors duration-150">
            <td className="px-4 py-3 font-medium text-gray-700">{label}</td>
            <td className="px-4 py-3 text-gray-800">{value}</td>
          </tr>
        ))}
        <tr className="hover:bg-gray-50 transition-colors duration-150">
          <td className="px-4 py-3 font-medium text-gray-700">Coupon</td>
          <td className="px-4 py-3">
            <div className="flex space-x-2">
              <input
                type="text"
                className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                type="button"
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={handleApplyCoupon}
              >
                Apply
              </button>
            </div>
            {couponError && <p className="text-red-600 text-sm mt-1">{couponError}</p>}
            {appliedCoupon && (
              <p className="text-green-600 text-sm mt-1">
                Applied: {appliedCoupon.coupontag} ({appliedCoupon.discount}
                {appliedCoupon.couponType === "percentage" ? "%" : "₹"} off)
              </p>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  {/* Players Table */}
  <div className="shadow-md rounded-lg overflow-scroll border border-gray-200">
    <h3 className="px-4 py-2 font-medium text-gray-800 bg-gray-50">
      Players ({selectedPlayers.length})
    </h3>
    <table className="min-w-full overflow-x:scroll divide-y divide-gray-200 bg-white">
      <thead className="bg-gray-100">
        <tr>
          {["Name", "Email", "Phone", "Aadhaar"].map((h) => (
            <th key={h} className="px-4 py-2 text-left text-sm font-medium text-gray-700">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white/60">
        {selectedPlayers.map((p) => (
          <tr key={p.aadharId} className="hover:bg-gray-50 transition-colors duration-150">
            <td className="px-4 py-2 text-gray-800">{p.name}</td>
            <td className="px-4 py-2 text-gray-700">{p.email}</td>
            <td className="px-4 py-2 text-gray-700">{p.phoneNumber}</td>
            <td className="px-4 py-2 text-gray-700">{p.aadharId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Bill / Summary */}
  <div className="shadow-md rounded-lg overflow-x-scroll border border-gray-200">
    <h3 className=" px-4 py-2 font-medium text-gray-800  bg-gray-50 ">Bill Summary</h3>
    <table className="min-w-full overflow-x:scroll divide-y divide-gray-200 bg-white">
      <thead className="bg-gray-100">
        <tr>
          {["Description", "Players", "Days", "Rate", "Amount"].map((h) => (
            <th key={h} className="px-4 py-2 text-left text-sm font-medium text-gray-700">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-gray-50 transition-colors duration-150">
          <td className="px-4 py-2 text-gray-800 ">Players</td>
          <td className="px-4 py-2">{selectedPlayers.length}</td>
          <td className="px-4 py-2">{stayDays}</td>
          <td className="px-4 py-2">₹250 / day</td>
          <td className="px-4 py-2">₹{selectedPlayers.length * stayDays * accomPricePerDay}</td>
        </tr>
        {appliedCoupon && (
          <tr className="text-green-700 hover:bg-gray-50 transition-colors duration-150">
            <td className="px-4 py-2" colSpan={3}>Coupon ({appliedCoupon.coupontag})</td>
            <td className="px-4 py-2">
              - ₹
              {appliedCoupon.couponType === "percentage"
                ? Math.floor((selectedPlayers.length * stayDays * accomPricePerDay * appliedCoupon.discount) / 100)
                : appliedCoupon.discount}
            </td>
          </tr>
        )}
        <tr className="font-medium bg-gray-50">
          <td className="px-4 py-2" colSpan={3}>Final Total</td>
          <td className="px-4 py-2">
            ₹
            {(() => {
              const base = selectedPlayers.length * stayDays * accomPricePerDay;
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
      <Footer />
    </div>
  );
}
