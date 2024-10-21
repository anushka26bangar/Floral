import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ManageProduct = () => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch flowers from the backend API
    fetch('/api/flowers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFlowers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching flowers:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Handle delete flower with confirmation
  const handleDelete = (flowerId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this flower?');
    
    if (confirmDelete) {
      // Remove from state (UI)
      const updatedFlowers = flowers.filter((flower) => flower.id !== flowerId);
      setFlowers(updatedFlowers);

      // Delete from database using backend API call
      fetch(`/api/delete-flower/${flowerId}`, { method: 'DELETE' })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log(`Flower with id ${flowerId} deleted successfully.`);
        })
        .catch(error => console.error('Error deleting flower:', error));
    } else {
      alert('Flower deletion canceled.');
    }
  };

  // CSS styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: '#E8F0FE', // Light blue background
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
      margin: '0',
    },
    loading: {
      fontSize: '1.5rem',
      color: '#007BFF',
    },
    error: {
      color: '#dc3545',
      fontSize: '1.2rem',
    },
    productList: {
      width: '100%',
      maxWidth: '800px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    productCard: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
      position: 'relative',
    },
    productCardHover: {
      transform: 'scale(1.02)',
    },
    productInfo: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    productName: {
      fontSize: '1.8rem',
      marginBottom: '0.5rem',
      fontWeight: 'bold',
    },
    productPrice: {
      fontSize: '1.5rem',
      color: '#666',
    },
    productImage: {
      width: '120px',
      height: '120px',
      objectFit: 'cover',
      borderRadius: '8px',
      marginRight: '1rem',
      border: '2px solid #007BFF',
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
    },
    button: {
      padding: '0.8rem 1.2rem',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
    },
    buttonHover: {
      transform: 'scale(1.05)',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Manage Flowers</h1>
      </div>

      {loading && <div style={styles.loading}>Loading flowers...</div>}
      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.productList}>
        {flowers.map((flower) => (
          <div
            key={flower.id}
            style={styles.productCard}
          >
            <img src={flower.image_url} alt={flower.name} style={styles.productImage} />
            <div style={styles.productInfo}>
              <span style={styles.productName}>{flower.name}</span>
              <span style={styles.productPrice}>Price: {flower.price}</span>
            </div>
            <div style={styles.buttonGroup}>
              <Link to={`/edit-flower/${flower.id}`}>
                <button style={styles.button}>
                  <FaEdit /> Edit
                </button>
              </Link>
              <button
                style={{ ...styles.button, ...styles.deleteButton }}
                onClick={() => handleDelete(flower.id)}
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProduct;
