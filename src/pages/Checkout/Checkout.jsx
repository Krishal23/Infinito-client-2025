import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import axiosInstance from "../../utils/axios";
import styles from "./Checkout.module.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { getCartItems, getTotalPrice, clearCart, updateCartItemSize } = useCart();
  const items = getCartItems();
  const [needDelivery, setNeedDelivery] = useState(false);


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    zipCode: "",
    adhaarId: "",
    email: "",
    gender: "",
    couponCode: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Helper: parse price (handles number or formatted string)
  const parsePrice = (p) => {
    if (p == null) return 0;
    if (typeof p === "number") return p;
    const num = parseFloat(String(p).replace(/[^\d.-]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const subtotal = items.reduce(
    (acc, i) => acc + parsePrice(i.price) * (i.quantity || 1),
    0
  );
  const total = Math.max(0, subtotal - (discount || 0)) + (needDelivery ? 20 : 0);

  // Live input sanitizer
  const sanitizeDigits = (value, maxLen) => {
    const digits = value.replace(/\D/g, "");
    return maxLen ? digits.slice(0, maxLen) : digits;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "adhaarId") {
      setFormData((prev) => ({ ...prev, [name]: sanitizeDigits(value, 12) }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }
    if (name === "phone") {
      setFormData((prev) => ({ ...prev, [name]: sanitizeDigits(value, 10) }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validators
  const validators = {
    adhaarId: (val) => /^\d{12}$/.test(val),
    phone: (val) => /^[6-9]\d{9}$/.test(val),
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    firstName: (v) => !!v && v.trim().length > 0,
    lastName: (v) => !!v && v.trim().length > 0,
    address: (v) => !!v && v.trim().length > 0,
    zipCode: (v) => !!v && v.trim().length > 0,
    gender: (v) => ["male", "female"].includes(v),
  };

  const validateField = (name, value) => {
    let valid = true;
    let msg = "";

    if (
      [
        "firstName",
        "lastName",
        "address",
        "zipCode",
        "phone",
        "adhaarId",
        "email",
        "gender",
      ].includes(name)
    ) {
      if (!value || String(value).trim() === "") {
        valid = false;
        msg = "This field is required";
      } else {
        if (name === "adhaarId" && !validators.adhaarId(value)) {
          valid = false;
          msg = "Aadhaar must be a 12-digit number";
        } else if (name === "phone" && !validators.phone(value)) {
          valid = false;
          msg = "Phone must be a 10-digit Indian number";
        } else if (name === "email" && !validators.email(value)) {
          valid = false;
          msg = "Enter a valid email address";
        } else if (name === "gender" && !validators.gender(value)) {
          valid = false;
          msg = "Select gender";
        }
      }
    }

    setErrors((prev) => ({ ...prev, [name]: msg }));
    return valid;
  };

  // Full form validation
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "phone",
      "address",
      "zipCode",
      "adhaarId",
      "email",
      "gender",
    ];

    for (const f of requiredFields) {
      const val = formData[f];
      if (!val || String(val).trim() === "") {
        newErrors[f] = "This field is required";
        continue;
      }

      if (f === "adhaarId" && !validators.adhaarId(val)) {
        newErrors.adhaarId = "Aadhaar must be a 12-digit number";
      } else if (f === "phone" && !validators.phone(val)) {
        newErrors.phone = "Phone must be a 10-digit Indian number";
      } else if (f === "email" && !validators.email(val)) {
        newErrors.email = "Enter a valid email address";
      }
    }

    // 🔹 Ensure size is selected for all items
    items.forEach((item) => {
      if (!item.size) {
        newErrors[`size_${item._id}`] = `Please select a size for ${item.name}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const applyCoupon = async () => {
    try {
      if (!formData.couponCode) {
        alert("Enter a coupon code first");
        return;
      }

      const res = await axiosInstance.get(
        `/coupons/validate/${encodeURIComponent(formData.couponCode)}`,
        {
          params: { amount: subtotal, category: "MERCH" },
        }
      );

      const coupon = res?.data?.appliedCoupon || res?.data?.coupon;
      if (!coupon) {
        setDiscount(0);
        alert(res?.data?.message || "Invalid or expired coupon");
        return;
      }

      let couponDiscount = 0;
      if (coupon.couponType === "flat") {
        couponDiscount = coupon.discount;
      } else if (coupon.couponType === "percentage") {
        couponDiscount = Math.floor((coupon.discount / 100) * subtotal);
        if (coupon.maxDiscountAmount && couponDiscount > coupon.maxDiscountAmount) {
          couponDiscount = coupon.maxDiscountAmount;
        }
      }

      setDiscount(couponDiscount);
      alert(`Coupon applied — discount ₹${couponDiscount}`);
    } catch (err) {
      console.error("Coupon error:", err);
      setDiscount(0);
      alert(err?.response?.data?.message || "Invalid or expired coupon");
    }
  };

  // Razorpay loader
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  // Pay now
  const handlePayNow = async () => {
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);
    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) {
      alert("Failed to load Razorpay SDK. Check network.");
      setLoading(false);
      return;
    }

    try {
      const orderPayload = {
        products: items.map((i) => ({
          productId: i.id || i._id,
          quantity: i.quantity || 1,
          size: i.size,
        })),
        name: { first: formData.firstName, last: formData.lastName },
        adhaarId: formData.adhaarId,
        email: formData.email,
        address: formData.address,
        pincode: formData.zipCode,
        phoneNumber: formData.phone,
        delivery: needDelivery,
        gender: formData.gender,
        couponCode: formData.couponCode || null,
      };

      const res = await axiosInstance.post("/merch/create-order", orderPayload);
      const { orderId, amount, key, merchOrderData } = res.data;

      const options = {
        key: key || process.env.REACT_APP_RAZORPAY_KEY,
        amount: Math.round((amount || total) * 100),
        currency: "INR",
        name: "INFINITO MERCH",
        description: "Order Payment",
        order_id: orderId,
        handler: async (response) => {
          try {
            await axiosInstance.post("/merch/verify-order", {
              ...response,
              merchOrderData,
              delivery: needDelivery,
            });
            clearCart();
            navigate("/checkout-success");
          } catch (verifyErr) {
            console.error("Verify error:", verifyErr);
            alert("Payment succeeded but verification failed. Contact support.");
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#000" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert(err?.response?.data?.message || "Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.checkoutContainer}>
        <div className={styles.heroSection}>
          <h1 className={styles.atmos}>Infinito Merchandise 2025</h1>
        </div>

        <div className={styles.checkoutContent}>
          {/* Left - Delivery details */}
          <div className={styles.deliverySection}>
            <h2 className={styles.sectionTitle}>Delivery details</h2>

            <form
              className={styles.deliveryForm}
              onSubmit={(e) => {
                e.preventDefault();
                handlePayNow();
              }}
            >
              {/* Names */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    First name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`${styles.formInput} ${errors.firstName ? styles.error : ""}`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Last name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`${styles.formInput} ${errors.lastName ? styles.error : ""}`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
                </div>
              </div>

              {/* 🔹 Size Summary */}
              {items.length > 0 && (
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Selected Sizes *</label>
                  {items.map((item) => (
                    <p key={item._id}>
                      {item.name} — <strong>{item.size || "Not selected"}</strong>
                      {errors[`size_${item._id}`] && (
                        <span className={styles.errorText}>{errors[`size_${item._id}`]}</span>
                      )}
                    </p>
                  ))}
                </div>
              )}

              {/* Phone */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Phone <span className={styles.required}>*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`${styles.formInput} ${errors.phone ? styles.error : ""}`}
                  placeholder="10-digit phone number"
                />
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
              </div>

              <div className={`flex-row items-center justify-center gap-2 `}>
                <label >
                  <input
                    type="checkbox"
                    checked={needDelivery}
                    onChange={(e) => setNeedDelivery(e.target.checked)}
                    className="h-4 w-4 mx-2"
                  />
                  Need Delivery (₹20 extra)
                </label>
              </div>


              {/* Address */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Address <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`${styles.formInput} ${errors.address ? styles.error : ""}`}
                  placeholder="Delivery address"
                />
                {errors.address && <span className={styles.errorText}>{errors.address}</span>}
              </div>

              {/* Zip */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Zip / Postal code <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`${styles.formInput} ${errors.zipCode ? styles.error : ""}`}
                  placeholder="Enter your zip code"
                />
                {errors.zipCode && <span className={styles.errorText}>{errors.zipCode}</span>}
              </div>

              {/* Aadhaar */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Aadhaar ID <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="adhaarId"
                  value={formData.adhaarId}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`${styles.formInput} ${errors.adhaarId ? styles.error : ""}`}
                  placeholder="12-digit Aadhaar"
                  inputMode="numeric"
                />
                {errors.adhaarId && <span className={styles.errorText}>{errors.adhaarId}</span>}
              </div>

              {/* Email */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Email <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`${styles.formInput} ${errors.email ? styles.error : ""}`}
                  placeholder="Enter your email"
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              {/* Gender */}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Gender <span className={styles.required}>*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`${styles.formInput} ${errors.gender ? styles.error : ""}`}
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && <span className={styles.errorText}>{errors.gender}</span>}
              </div>

              {/* Coupon */}
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}>
                <div style={{ flex: 1 }} className={styles.formGroup}>
                  <label className={styles.formLabel}>Coupon Code</label>
                  <input
                    type="text"
                    name="couponCode"
                    value={formData.couponCode}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Enter coupon code"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className={styles.continueButton}
                    style={{ marginBottom: 0 }}
                  >
                    Apply Coupon
                  </button>
                </div>
              </div>

              {discount > 0 && (
                <p style={{ color: "#15803d" }}>Discount Applied: ₹{discount}</p>
              )}

              <div style={{ marginTop: 12 }}>
                <button
                  type="button"
                  onClick={handlePayNow}
                  className={styles.continueButton}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Pay Now"}
                </button>
              </div>
            </form>
          </div>

          {/* Right - Order Summary */}
          <div className={styles.orderSummary}>
            <h2 className={styles.sectionTitle}>Order summary ({items.length})</h2>

            {items.length === 0 ? (
              <p>No items in your cart</p>
            ) : (
              <div className={styles.orderItems}>
                {items.map((item) => (
                  <div key={item.id || item._id} className={styles.orderItem}>
                    <div className={styles.itemImage}>
                      <img
                        src={item?.images?.[0]?.url || item.image || "/placeholder.png"}
                        alt={item.name || "Product"}
                      />
                    </div>
                    <div className={styles.itemDetails}>
                      <h4 className={styles.itemName}>{item.name || "Unnamed Item"}</h4>
                      <p className={styles.itemPrice}>₹{parsePrice(item.price).toFixed(2)}</p>
                      <p className={styles.itemQuantity}>Qty: {item.quantity || 1}</p>

                      <select
                        value={item.size || ""}
                        onChange={(e) => updateCartItemSize(item._id, e.target.value)}  
                        className="bg-transparent mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "

                      >
                        <option value="">Select size</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                      </select>

                      {errors[`size_${item._id}`] && (
                        <span className={styles.errorText}>{errors[`size_${item._id}`]}</span>
                      )}

                      <p className={styles.itemTotal}>
                        Total: ₹{(parsePrice(item.price) * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.priceBreakdown}>
              <div className={styles.priceRow}>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className={styles.priceRow}>
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}

              <div className={styles.priceRow}>
                <span>Delivery</span>
                <span>{needDelivery ? `₹20.00` : `--`}</span>
              </div>

              <div className={`${styles.priceRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={handlePayNow}
                className={styles.continueButton}
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
              <span>🔒 Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
