import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Navbar from '../../components/Navbar';
import styles from './Checkout.module.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { getCartItems, getTotalPrice, clearCart } = useCart();
  const items = getCartItems();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    zipCode: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      // Here you would typically process the order
      console.log('Order data:', { formData, items, total: getTotalPrice() });
      
      // Clear cart and redirect to success page
      clearCart();
      navigate('/checkout-success');
    }
  };

  const handleBackToShopping = () => {
    navigate('/merchandise');
  };

  if (items.length === 0) {
    return (
      <div className={styles.pageContainer}>
        <Navbar />
        <div className={styles.emptyCart}>
          <h1>Your cart is empty</h1>
          <p>Add some items to your cart before checking out.</p>
          <button onClick={handleBackToShopping} className={styles.backButton}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutHeader}>
          <h1 className={styles.checkoutTitle}>INFINITO CHECKOUT</h1>
          <button onClick={handleBackToShopping} className={styles.continueBrowsing}>
            Continue Browsing
          </button>
        </div>

        <div className={styles.checkoutContent}>
          {/* Left Section - Delivery Details */}
          <div className={styles.deliverySection}>
            <h2 className={styles.sectionTitle}>Delivery details</h2>
            
            <form className={styles.deliveryForm}>
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
                    className={`${styles.formInput} ${errors.firstName ? styles.error : ''}`}
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
                    className={`${styles.formInput} ${errors.lastName ? styles.error : ''}`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Phone <span className={styles.required}>*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`${styles.formInput} ${errors.phone ? styles.error : ''}`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
              </div>


              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Address <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`${styles.formInput} ${errors.address ? styles.error : ''}`}
                  placeholder="Enter your address"
                />
                {errors.address && <span className={styles.errorText}>{errors.address}</span>}
              </div>


              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Zip / Postal code <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={`${styles.formInput} ${errors.zipCode ? styles.error : ''}`}
                  placeholder="Enter your zip code"
                />
                {errors.zipCode && <span className={styles.errorText}>{errors.zipCode}</span>}
              </div>

              <button 
                type="button" 
                onClick={handleContinue}
                className={styles.continueButton}
              >
                Continue
              </button>
            </form>

            {/* Collapsed sections for future steps */}
            <div className={styles.collapsedSections}>
              <div className={styles.collapsedSection}>
                <h3 className={styles.collapsedTitle}>Delivery method</h3>
              </div>
              <div className={styles.collapsedSection}>
                <h3 className={styles.collapsedTitle}>Payment</h3>
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className={styles.orderSummary}>
            <h2 className={styles.sectionTitle}>Order summary ({items.length})</h2>
            
            <div className={styles.orderItems}>
              {items.map((item) => (
                <div key={item.id} className={styles.orderItem}>
                  <div className={styles.itemImage}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className={styles.itemDetails}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <p className={styles.itemPrice}>{item.price}</p>
                    <p className={styles.itemQuantity}>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>


            <div className={styles.priceBreakdown}>
              <div className={styles.priceRow}>
                <span>Subtotal</span>
                <span>₹{getTotalPrice().toFixed(2)}</span>
              </div>
              <div className={styles.priceRow}>
                <span>Delivery</span>
                <span>--</span>
              </div>
              <div className={styles.priceRow}>
                <span>Sales Tax</span>
                <span>₹0.00</span>
              </div>
              <div className={`${styles.priceRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>₹{getTotalPrice().toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.secureCheckout}>
              <span className={styles.lockIcon}>🔒</span>
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
