import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Inline CSS styles
const styles = {
  cartContainer: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  cartHeader: {
    fontSize: '1.5em',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  cartItemsList: {
    listStyle: 'none',
    padding: '0',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  },
  itemName: {
    fontWeight: 'bold',
  },
  itemPrice: {
    color: '#333',
  },
  removeBtn: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  cartSummary: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutBtn: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };

  const handleCheckout = () => {
    sessionStorage.setItem('cart', JSON.stringify(cartItems)); // Save cart items to sessionStorage
    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
    sessionStorage.setItem('totalAmount', totalAmount); // Save total amount to sessionStorage
    navigate('/checkout');
  };

  return (
    <div style={styles.cartContainer}>
      <div style={styles.cartHeader}>
        <FaShoppingCart />
        <h1>Shopping Cart</h1>
      </div>
      <ul style={styles.cartItemsList}>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <li key={index} style={styles.cartItem}>
              <span style={styles.itemName}>{item.name}</span>
              <span style={styles.itemPrice}>₹{item.price}</span>
              <button 
                style={styles.removeBtn}
                onClick={() => handleRemoveItem(index)}
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
      {cartItems.length > 0 && (
        <div style={styles.cartSummary}>
          <span>Total: ₹{cartItems.reduce((total, item) => total + item.price, 0)}</span>
          <button
            style={styles.checkoutBtn}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
