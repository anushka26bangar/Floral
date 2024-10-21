import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate(); // Replaces useHistory

  useEffect(() => {
    const items = JSON.parse(sessionStorage.getItem('cart')) || [];
    const total = sessionStorage.getItem('totalAmount') || 0;
    setCartItems(items);
    setTotalPrice(total);
  }, []);

  const handleCheckout = () => {
    // Instead of redirecting to QR code, redirect to the payment page
    navigate('/payment');
  };

  return (
    <div style={styles.checkoutContainer}>
      <h2>Checkout</h2>
      <div style={styles.cartItems}>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map(item => (
            <div key={item.name} style={styles.cartItem}>
              <p>{item.name}</p>
              <p>Price: ₹{item.price}</p>
            </div>
          ))
        )}
      </div>
      <div style={styles.totalPrice}>
        <h3>Total Price: ₹{totalPrice}</h3>
      </div>
      <button 
        onClick={handleCheckout} 
        style={styles.checkoutButton}
      >
        Complete Checkout
      </button>
    </div>
  );
};

const styles = {
  checkoutContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  cartItems: {
    marginBottom: '20px'
  },
  cartItem: {
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
    marginBottom: '10px'
  },
  totalPrice: {
    margin: '20px 0'
  },
  checkoutButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  }
};

export default Checkout;
