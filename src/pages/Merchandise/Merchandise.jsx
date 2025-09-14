import MerchandiseCard from "./MerchandiseCard";
import styles from "./Merchandise.module.css";
import { products } from "../../data/products";
import { Link } from "react-router-dom";
import mascot from "./mascot.png";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";


const Merchandise = () => {
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>MERCH</h1>
        <p className={styles.heroDescription}>
          This page dedicated to all the merchandise of Infinito. You can find all the products here. It represents the spirit of our community and the creativity of our members. 
        </p>
      </div>
      
      {/* Main Products Section */}
      <div className={styles.productsSection}>
        <div className={styles.productsGrid}>
          {products.map((item) => (
            <MerchandiseCard
              key={item.id}
              product={item}
            />
          ))}
        </div>
      </div>

      {/* Booking Requirements Section */}
      <div className={styles.bookingSection}>
        <h2 className={styles.bookingTitle}>FOR BOOKING REQUIREMENTS</h2>
        <p className={styles.contactInfo}>INFO@INFINITO.COM | PHONE: 630-624-3407</p>
      </div>

      {/* Footer */}
      <div className={styles.footerSection}>
        <div className={styles.footerContent}>
          <p className={styles.copyright}>© 2024 BY INFINITO. CREATED ON REACT.</p>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>TERMS & CONDITIONS</a>
            <a href="#" className={styles.footerLink}>SHIPPING & RETURNS</a>
            <a href="#" className={styles.footerLink}>FAQ'S</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Merchandise;
