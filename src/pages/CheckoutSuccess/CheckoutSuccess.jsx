import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from './CheckoutSuccess.module.css';

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  const handleBackToShopping = () => {
    navigate('/');
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      
      <div className={styles.successContainer}>
        <div className={styles.successContent}>
          {/* <div className={styles.successIcon}>✅</div> */}
          <h1 className={styles.successTitle}>Order Placed Successfully!</h1>
          <p className={styles.successMessage}>
            Thank you for your purchase! Your order has been confirmed and will be processed shortly.
          </p>
          {/* <p className={styles.orderInfo}>
            You will receive an email confirmation with your order details.
          </p> */}
          <button 
            onClick={handleBackToShopping}
            className={styles.continueButton}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
