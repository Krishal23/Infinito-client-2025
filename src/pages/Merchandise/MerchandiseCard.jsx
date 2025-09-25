// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './MerchandiseCard.module.css';

// const MerchandiseCard = ({ product }) => {
//   const navigate = useNavigate();

//   // Use first image from images array, fallback if none
//   const productImage = product.images?.[0]?.url || '/placeholder.png';
//   const productAlt = product.images?.[0]?.altText || product.name;

//   const handleBuyNow = () => {
//     if (product.inStock) {
//       navigate(`/product/${product._id}`);
//     }
//   };

//   return (
//     <div className={styles.productCard}>
//       <div className={styles.productImageContainer}>
//         <img className={styles.productImage} src={productImage} alt={productAlt} />
//         <button
//           className={`${styles.buyButton} ${!product.inStock ? styles.outOfStock : ''}`}
//           onClick={handleBuyNow}
//           disabled={!product.inStock}
//         >
//           {product.inStock ? 'Buy Now' : 'Out of Stock'}
//         </button>
//       </div>
//       <div className={styles.productInfo}>
//         <h3 className={styles.productName}>{product.name}</h3>
//         <p className={styles.productPrice}>₹{product.price}</p>
//         {product.additionalDetails?.edition && (
//           <p className={styles.productEdition}>{product.additionalDetails.edition}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MerchandiseCard;




import React from 'react';
import styles from './MerchandiseCard.module.css';

const MerchandiseCard = ({ frontContent, backContent }) => {
  

  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <img className={styles.cardimg} src={frontContent.image} alt={frontContent.title} />
        </div>
        <div className={styles.cardBack}>
          <img className={styles.cardimg} src={backContent.image} alt={backContent.title} />
        </div>
      </div>
    </div>
  );
};

export default MerchandiseCard;
