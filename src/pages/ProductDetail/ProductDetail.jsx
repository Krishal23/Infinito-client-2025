import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Navbar from '../../components/Navbar';
import CartSidebar from '../../components/CartSidebar';
import styles from './ProductDetail.module.css';
import axiosInstance from '../../utils/axios';
import Footer from '../../components/Footer';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState('product-info');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/product/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className={styles.notFound}>
          <h1>Product not found</h1>
          <button onClick={() => navigate('/merch')}>Back to Merchandise</button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    openCart();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    openCart();
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <CartSidebar />

      <div className={styles.productContainer}>
        {/* Product Image Section */}
        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            {/* Main Active Image */}
            <img
              src={product.images[activeImage].url}
              alt={product.images[activeImage].altText}
              className={styles.productImage}
            />
            {/* Thumbnails */}
            <div className={styles.thumbnailContainer}>
              {product.images.map((img, index) => (
                <img
                  key={img._id}
                  src={img.url}
                  alt={img.altText}
                  className={`${styles.thumbnail} ${activeImage === index ? styles.activeThumbnail : ''}`}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className={styles.detailsSection}>
          <div className={styles.productInfo}>
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.productPrice}>₹{product.price}</p>

            <div className={styles.quantitySection}>
              <label className={styles.quantityLabel}>Quantity</label>
              <div className={styles.quantityControls}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className={styles.quantityButton}>-</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className={styles.quantityInput}
                  min="1"
                />
                <button onClick={() => setQuantity(quantity + 1)} className={styles.quantityButton}>+</button>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button
                onClick={handleAddToCart}
                className={`${styles.actionButton} ${styles.addToCartButton}`}
                disabled={!product.inStock}
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className={`${styles.actionButton} ${styles.buyNowButton}`}
                disabled={!product.inStock}
              >
                Buy Now
              </button>
            </div>

            <p className={styles.productDescription}>{product.description}</p>

            {/* Collapsible Sections */}
            <div className={styles.collapsibleSections}>
              <div className={styles.section}>
                <div onClick={() => toggleSection('product-info')} className={styles.sectionHeader}>
                  <span>PRODUCT INFO</span>
                  <span className={styles.arrow}>{activeSection === 'product-info' ? '↑' : '↓'}</span>
                </div>
                {activeSection === 'product-info' && (
                  <div className={styles.sectionContent}>
                    <p>More information about this product including sizing, material, and care instructions.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Requirements Section */}
      <div className={styles.bookingSection}>
        <h2 className={styles.bookingTitle}>FOR BOOKING REQUIREMENTS</h2>
        {/* <p className={styles.contactInfo}>INFO@INFINITO.COM | PHONE: 123-456-7890</p> */}
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default ProductDetail;
