import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getProductById } from '../../data/products';
import Navbar from '../../components/Navbar';
import CartSidebar from '../../components/CartSidebar';
import styles from './ProductDetail.module.css';



const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState('product-info');

  const product = getProductById(id);

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className={styles.notFound}>
          <h1>Product not found</h1>
          <button onClick={() => navigate('/merchandise')}>Back to Merchandise</button>
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
            <img src={product.image} alt={product.name} className={styles.productImage} />
          </div>
        </div>

        {/* Product Details Section */}
        <div className={styles.detailsSection}>
          <div className={styles.productInfo}>
            <p className={styles.sku}>SKU: {product.sku}</p>
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.productPrice}>{product.price}</p>
            
            <div className={styles.quantitySection}>
              <label className={styles.quantityLabel}>Quantity</label>
              <div className={styles.quantityControls}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={styles.quantityButton}
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className={styles.quantityInput}
                  min="1"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className={styles.quantityButton}
                >
                  +
                </button>
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

            <p className={styles.productDescription}>
              {product.description}
            </p>

            {/* Collapsible Sections */}
            <div className={styles.collapsibleSections}>
              <div className={styles.section}>
                <button 
                  onClick={() => toggleSection('product-info')}
                  className={styles.sectionHeader}
                >
                  <span>PRODUCT INFO</span>
                  <span className={styles.arrow}>
                    {activeSection === 'product-info' ? '↑' : '↓'}
                  </span>
                </button>
                {activeSection === 'product-info' && (
                  <div className={styles.sectionContent}>
                    <p>I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.</p>
                  </div>
                )}
              </div>

              <div className={styles.section}>
                <button 
                  onClick={() => toggleSection('return-policy')}
                  className={styles.sectionHeader}
                >
                  <span>RETURN & REFUND POLICY</span>
                  <span className={styles.arrow}>
                    {activeSection === 'return-policy' ? '↑' : '↓'}
                  </span>
                </button>
                {activeSection === 'return-policy' && (
                  <div className={styles.sectionContent}>
                    <p>We offer a 30-day return policy for all merchandise. Items must be in original condition with tags attached. Refunds will be processed within 5-7 business days.</p>
                  </div>
                )}
              </div>

              <div className={styles.section}>
                <button 
                  onClick={() => toggleSection('shipping-info')}
                  className={styles.sectionHeader}
                >
                  <span>SHIPPING INFO</span>
                  <span className={styles.arrow}>
                    {activeSection === 'shipping-info' ? '↑' : '↓'}
                  </span>
                </button>
                {activeSection === 'shipping-info' && (
                  <div className={styles.sectionContent}>
                    <p>Free shipping on orders over $50. Standard shipping takes 3-5 business days. Express shipping available for an additional fee.</p>
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
        <p className={styles.contactInfo}>INFO@INFINITO.COM | PHONE: 123-456-7890</p>
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

export default ProductDetail;
