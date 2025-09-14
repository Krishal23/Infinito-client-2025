import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios"; // your axios instance
import MerchandiseCard from "./MerchandiseCard";
import styles from "./Merchandise.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Merchandise = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/product");
      // console.log(res.data.products)
      setProducts(res.data.products);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (

    <div className={styles.pageContainer}>
      <Navbar />

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div>
          {/* <h1 className={styles.atmos2}>INFINITO 2025</h1> */}
            <h1 className={styles.atmos}>Official Merchandise 2025</h1>
        </div>
        {/* <p >
          Get ready to dive into the world of style as we introduce the exclusive T-shirt and Hoodie collection for Infinito24!

These designs blend elegance with innovation, perfectly capturing the essence of Infinito. Our T-shirts are crafted from top-quality 200 GSM, 100% cotton, ensuring ultimate comfort and durability. The hoodies are made from premium woven cotton with 350+ GSM fabric, offering unmatched warmth and style. Elevate your wardrobe with our limited-edition Infinito T-shirts and Hoodies!
          </p> */}
      </div>

      {/* Main Products Section */}
      <div className={styles.productsSection}>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>{error}</p>
        ) : products.length === 0 ? (
          <p>No products available at the moment.</p>
        ) : (
          <div className={styles.productsGrid}>
            {products.map((item) => (
              <MerchandiseCard key={item._id} product={item} />
            ))}
          </div>
        )}
      </div>

      {/* Booking Requirements Section */}
      <div className={styles.bookingSection}>
        <h2 className={styles.bookingTitle}>FOR BOOKING REQUIREMENTS</h2>
        {/* <p className={styles.contactInfo}>INFO@INFINITO.COM | PHONE: 630-624-3407</p> */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Merchandise;
