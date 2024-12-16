import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import lavender from '../Images/purplepink.jpg';

// Inline CSS styles
const styles = {
  body: {
    backgroundImage: `url(${lavender})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  cartContainer: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
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
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  },
  itemName: {
    fontWeight: 'bold',
    flex: 1,
  },
  itemPrice: {
    color: '#333',
    marginRight: '15px',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  quantityButton: {
    backgroundColor: '#f2f2f2',
    border: '1px solid #ddd',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  quantity: {
    fontSize: '1.2em',
    fontWeight: 'bold',
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

  const handleIncreaseQuantity = (index) => {
    const updatedItems = [...cartItems];
    const existingItem = updatedItems[index];

    // Increase quantity if item already exists in cart
    existingItem.quantity = (existingItem.quantity || 1) + 1;
    updatedItems[index] = existingItem;

    localStorage.setItem('cart', JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
    } else {
      updatedItems.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };

  const handleCheckout = () => {
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
    const totalAmount = cartItems.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return total + price * quantity;
    }, 0);
    sessionStorage.setItem('totalAmount', totalAmount);
    navigate('/checkout');
  };

  return (
    <div style={styles.body}>
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
                <div style={styles.quantityControl}>
                  <button
                    style={styles.quantityButton}
                    onClick={() => handleDecreaseQuantity(index)}
                  >
                    -
                  </button>
                  <span style={styles.quantity}>{item.quantity || 1}</span>
                  <button
                    style={styles.quantityButton}
                    onClick={() => handleIncreaseQuantity(index)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
        {cartItems.length > 0 && (
          <div style={styles.cartSummary}>
            <span>
              Total: ₹
              {cartItems.reduce((total, item) => {
                const price = Number(item.price) || 0;
                const quantity = Number(item.quantity) || 1;
                return total + price * quantity;
              }, 0)}
            </span>
            <button
              style={styles.checkoutBtn}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
