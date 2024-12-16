import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ManageProduct = () => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  const handleDelete = (flowerId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this flower?');
    
    if (confirmDelete) {
      setFlowers(prevFlowers => prevFlowers.filter((flower) => flower.id !== flowerId));

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

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem',
      backgroundColor: 'lightblue',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem',
      color: '#2C3E50',
    },
    h1: {
      fontSize: '3rem',
      fontWeight: 'bold',
      margin: 0,
      textTransform: 'uppercase',
    },
    loading: {
      fontSize: '2rem',
      color: '#3498DB',
    },
    error: {
      color: '#E74C3C',
      fontSize: '1.5rem',
    },
    flowerGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)', // 3 products per row
      gap: '30px',
      padding: '0 10px',
    },
    flowerCard: {
      border: '1px solid #ddd',
      borderRadius: '12px',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#fff',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
    },
    flowerCardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
    },
    flowerImage: {
      width: '100%',
      height: '250px',
      objectFit: 'cover',
      borderRadius: '10px',
      marginBottom: '15px',
      transition: 'transform 0.3s ease',
    },
    flowerImageHover: {
      transform: 'scale(1.1)', // Slight zoom effect
    },
    productName: {
      fontSize: '1.6rem',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#2C3E50',
      transition: 'color 0.3s ease',
    },
    productPrice: {
      fontSize: '1.3rem',
      color: '#95A5A6',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginTop: '20px',
    },
    button: {
      padding: '12px 20px',
      backgroundColor: '#3498DB',
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
      backgroundColor: '#E74C3C',
    },
    buttonHover: {
      backgroundColor: '#2980B9',
    },
    flowerCardWrapper: {
      transition: 'transform 0.3s ease-in-out',
    },
  };

  const LoadingSpinner = () => (
    <div className="spinner" style={styles.loading}>
      Loading...
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Manage Flowers</h1>
      </div>

      {loading && <LoadingSpinner />}
      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.flowerGrid}>
        {flowers.map((flower) => (
          <div
            key={flower.id}
            style={styles.flowerCardWrapper}
            onMouseEnter={(e) => {
              e.currentTarget.querySelector('img').style.transform = 'scale(0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector('img').style.transform = 'scale(1)';
            }}
          >
            <div
              style={{ ...styles.flowerCard, '&:hover': styles.flowerCardHover }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
              }}
            >
              <img src={flower.image_url} alt={flower.name} style={styles.flowerImage} />
              <div>
                <div style={styles.productName}>{flower.name}</div>
                <div style={styles.productPrice}>Price: {flower.price}</div>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProduct;
