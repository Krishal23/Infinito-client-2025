import MerchandiseCard from "./MerchandiseCard";
import styles from "./Merchandise.module.css";
import f4 from "./merchimg/f1.png";

import f5 from "./merchimg/f2.png";
import f3 from "./merchimg/f3.png";
import f1 from "./merchimg/f4.png";
import f2 from "./merchimg/f5.png";
import b4 from "./merchimg/b1.png";
import b5 from "./merchimg/b2.png";
import b3 from "./merchimg/b3.png";
import b1 from "./merchimg/b4.png";
import b2 from "./merchimg/b5.png";
import { Link } from "react-router-dom";
import mascot from "./mascot.png";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const merchandiseData = [
  {
    id: 1,
    name: "POSTER",
    price: "$10.00",
    image: f1,
    inStock: true,
  },
  {
    id: 2,
    name: "PHONE CASE",
    price: "$15.00",
    image: f2,
    inStock: true,
  },
  {
    id: 3,
    name: "SNAPBACK CAP",
    price: "$20.00",
    image: f3,
    inStock: true,
  },
  {
    id: 4,
    name: "VINYL - GOLD EDITION",
    price: "$30.00",
    image: f4,
    inStock: false,
  },
  {
    id: 5,
    name: "BEANIE",
    price: "$16.00",
    image: f5,
    inStock: true,
  },
  {
    id: 6,
    name: "THE CRYSTAL PROJECT CD EDITION",
    price: "$15.00",
    image: b1,
    inStock: true,
  },
  {
    id: 7,
    name: "SWEATSHIRT",
    price: "$50.00",
    image: b2,
    inStock: true,
  },
  {
    id: 8,
    name: "FANNY PACK",
    price: "$45.00",
    image: b3,
    inStock: true,
  },
  {
    id: 9,
    name: "BASEBALL CAP",
    price: "$25.00",
    image: b4,
    inStock: true,
  },
  {
    id: 10,
    name: "VINYL RECORD",
    price: "$35.00",
    image: b5,
    inStock: true,
  },
];

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
          {merchandiseData.map((item) => (
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
