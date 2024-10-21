import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import qrcodeImage from '../Images/qrcode.jpeg'; // Adjust the path based on your structure

const Payment = () => {
  const [paymentMode, setPaymentMode] = useState(''); // Capture payment mode
  const [orderConfirmed, setOrderConfirmed] = useState(false); // State to track order confirmation
  const navigate = useNavigate();

  const handlePayment = () => {
    setOrderConfirmed(true); // Set order confirmation state
    setTimeout(() => {
      navigate('/'); // Redirect to home after payment
    }, 2000); // Adjust delay as necessary
  };

  return (
    <div style={styles.paymentContainer}>
      <h2>Select Payment Mode</h2>
      <div style={styles.paymentOptions}>
        <label>
          <input 
            type="radio" 
            value="online" 
            checked={paymentMode === 'online'} 
            onChange={() => setPaymentMode('online')}
          /> Pay Online
        </label>
        <label>
          <input 
            type="radio" 
            value="cod" 
            checked={paymentMode === 'cod'} 
            onChange={() => setPaymentMode('cod')}
          /> Cash on Delivery
        </label>
      </div>
      {paymentMode === 'online' && (
        <div style={styles.qrCodeContainer}>
          <h3>Scan the QR Code to pay:</h3>
          <img src={qrcodeImage} alt="QR Code" style={styles.qrCodeImage} />
        </div>
      )}
      <button onClick={handlePayment} style={styles.paymentButton}>
        Confirm Order
      </button>
      {orderConfirmed && (
        <div style={styles.confirmationMessage}>
          Thank you for choosing us, your order has been successfully placed!
        </div>
      )}
    </div>
  );
};

const styles = {
  paymentContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    textAlign: 'center'
  },
  paymentOptions: {
    marginBottom: '20px'
  },
  paymentButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  qrCodeContainer: {
    margin: '20px 0',
  },
  qrCodeImage: {
    width: '200px', // Adjust size as needed
    height: 'auto',
  },
  confirmationMessage: {
    marginTop: '20px',
    color: 'green',
    fontWeight: 'bold',
  }
};

export default Payment;
