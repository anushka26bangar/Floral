import React from 'react';
import { Link } from 'react-router-dom';

const AdminHomepage = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: '#f5f5f5',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    h1: {
      fontSize: '2.5rem',
      color: '#333',
    },
    p: {
      fontSize: '1.2rem',
      color: '#666',
    },
    actions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      alignItems: 'center',
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    sectionTitle: {
      fontSize: '1.8rem',
      marginBottom: '1rem',
      color: '#007BFF',
    },
    buttonGroup: {
      display: 'flex',
      gap: '1.5rem',
    },
    button: {
      padding: '1rem 2rem',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1.1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    buttonActive: {
      backgroundColor: '#003f7f',
    },
    mobileButton: {
      width: '100%',
      maxWidth: '300px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Welcome, Admin</h1>
        <p style={styles.p}>This is the admin dashboard where you can manage users, products, and more.</p>
      </div>

      <div style={styles.actions}>
        {/* Manage Users Section */}
        <Link to="/manage-users">
          <button style={styles.button}>Manage Users</button>
        </Link>

        {/* Orders Section */}
        <Link to="/orders">
          <button style={styles.button}>Orders</button>
        </Link>

        {/* Products Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Products</h2>
          <div style={styles.buttonGroup}>
            <Link to="/add-flower">
              <button style={styles.button}>Add Product</button>
            </Link>
            <Link to="/manage-product">
              <button style={styles.button}>Manage Products</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;
