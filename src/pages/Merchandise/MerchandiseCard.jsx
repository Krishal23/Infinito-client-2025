import React from 'react';
import styles from './MerchandiseCard.module.css';

const MerchandiseCard = ({ product }) => {
  const handleBuyNow = () => {
    if (product.inStock) {
      // Handle buy now action
      console.log(`Buying ${product.name}`);
    }
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productImageContainer}>
        <img className={styles.productImage} src={product.image} alt={product.name} />
        <button 
          className={`${styles.buyButton} ${!product.inStock ? styles.outOfStock : ''}`}
          onClick={handleBuyNow}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Buy Now' : 'Out of Stock'}
        </button>
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productPrice}>{product.price}</p>
      </div>
    </div>
  );
};

export default MerchandiseCard;
