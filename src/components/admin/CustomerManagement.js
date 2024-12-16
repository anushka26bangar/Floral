// CustomerManagementPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Assuming you're using Axios for API calls
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const CustomerManagementPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Fetch customer data from your API (replace with your actual API endpoint)
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('/api/customers'); // Update with your actual endpoint
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading customers...</div>; // Loading state
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Customer Management</h1>
      <div style={styles.customerList}>
        {customers.length === 0 ? (
          <p>No customers found.</p> // Message if no customers are found
        ) : (
          customers.map((customer) => (
            <div key={customer.id} style={styles.customerCard}>
              <h2 style={styles.customerName}>{customer.name}</h2>
              <p>Email: {customer.email}</p>
              <p>Phone: {customer.phone}</p>
              <p>Order History: {customer.orderHistory.length} orders</p>
              <div style={styles.contactButtons}>
                <Link to={`/customer/${customer.id}`}>
                  <button style={styles.button}>View Profile</button>
                </Link>
                <a href={`mailto:${customer.email}`} style={styles.contactIcon}>
                  <FaEnvelope /> Contact
                </a>
                <a href={`tel:${customer.phone}`} style={styles.contactIcon}>
                  <FaPhone /> Call
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2.5rem',
    color: '#333',
  },
  customerList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  customerCard: {
    padding: '1.5rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
  },
  customerName: {
    fontSize: '1.8rem',
    margin: '0 0 1rem 0',
    color: '#007BFF',
  },
  contactButtons: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  contactIcon: {
    display: 'flex',
    alignItems: 'center',
    color: '#007BFF',
    textDecoration: 'none',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#666',
  },
};

export default CustomerManagementPage;
