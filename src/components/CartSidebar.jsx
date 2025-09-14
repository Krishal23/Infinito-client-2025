import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './CartSidebar.module.css';

const CartSidebar = () => {
  const navigate = useNavigate();
  const { 
    isOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    getCartItems,
    getTotalPrice 
  } = useCart();

  const items = getCartItems();

  const handleProceedToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={closeCart} />
      
      {/* Cart Sidebar */}
      <div className={styles.cartSidebar}>
        {/* Header */}
        <div className={styles.cartHeader}>
          <button className={styles.backButton} onClick={closeCart}>
            ←
          </button>
          <h2 className={styles.cartTitle}>Cart</h2>
          <button className={styles.closeButton} onClick={closeCart}>
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div className={styles.cartContent}>
          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <div className={styles.emptyCartIcon}>🛒</div>
              <h3 className={styles.emptyCartTitle}>Your cart is empty</h3>
              <p className={styles.emptyCartText}>Add products to your cart in here</p>
            </div>
          ) : (
            <>
              <div className={styles.cartItems}>
                {items.map(item => (
                  <div key={item._id || item.id} className={styles.cartItem}>
                    <div className={styles.itemImage}>
                      <img
                        src={item.images?.[0]?.url || '/fallback-image.png'}
                        alt={item.name || 'Product'}
                      />
                    </div>
                    <div className={styles.itemDetails}>
                      <h4 className={styles.itemName}>{item.name || 'Unnamed Product'}</h4>
                      <p className={styles.itemPrice}>₹{item.price || 0}</p>
                      <div className={styles.quantityControls}>
                        <button 
                          onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                          className={styles.quantityButton}
                        >
                          -
                        </button>
                        <span className={styles.quantity}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                          className={styles.quantityButton}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id || item.id)}
                      className={styles.removeButton}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className={styles.cartSummary}>
                <div className={styles.subtotal}>
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
                <button 
                  className={styles.checkoutButton}
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
