// AdminHomepage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaProductHunt } from 'react-icons/fa';

const AdminHomepage = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
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
    dashboard: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '2rem',
      width: '100%',
      maxWidth: '800px',
    },
    card: {
      backgroundColor: '#fff',
      padding: '1.5rem',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
    },
    icon: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
      color: '#007BFF',
    },
    link: {
      textDecoration: 'none',
      color: '#007BFF',
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Welcome, Admin</h1>
        <p style={styles.p}>Manage your orders and products efficiently.</p>
      </div>

      <div style={styles.dashboard}>
        {/* Orders Section */}
        <Link to="/orders" style={styles.link}>
          <div style={styles.card}>
            <FaClipboardList style={styles.icon} />
            <h3>View Orders</h3>
          </div>
        </Link>

        {/* Products Section */}
        <div style={styles.card}>
          <FaProductHunt style={styles.icon} />
          <Link to="/add-flower" style={styles.link}>Add Product</Link>
          <br />
          <Link to="/manage-product" style={styles.link}>Manage Products</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;
