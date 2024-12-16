import React from 'react';
import { Link } from 'react-router-dom';
// import { FaSignInAlt, FaRegUser } from 'react-icons/fa';
// import { AiOutlineShoppingCart } from 'react-icons/ai';
import { GiFlowerPot, GiTruck, GiSunflower } from 'react-icons/gi';
import flower2 from '../Images/chafa.jpg';
import flower3 from '../Images/flower1.jpg';
import flower4 from '../Images/white-flower.jpg';
import backgroundImg from '../Images/bg1.jpg'; // Import the background image

const Main = () => {
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div> {/* Overlay for better readability */}
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome to Our Floral Shop</h1>
        <p style={styles.subtitle}>
          Browse our exquisite collection of flowers. To make a purchase, please
          <Link to="/signup" style={styles.highlight}> Sign Up </Link> or
          <Link to="/login" style={styles.highlight}> Log In </Link>.
        </p>
      </div>

      {/* Product Preview Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Collection</h2>
        <div style={styles.productGrid}>
          <div
            style={styles.productCard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={flower2} alt="Chafa" style={styles.productImage} />
            <p style={styles.productName}>Chafa</p>
          </div>
          <div
            style={styles.productCard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={flower3} alt="Sunflower" style={styles.productImage} />
            <p style={styles.productName}>Sunflower</p>
          </div>
          <div
            style={styles.productCard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={flower4} alt="White Flowers" style={styles.productImage} />
            <p style={styles.productName}>White Flowers</p>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
        <div style={styles.specialtiesContainer}>
          <div
            style={styles.specialtyCard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <GiFlowerPot style={styles.icon} />
            <h3 style={styles.specialtyTitle}>Freshness Guaranteed</h3>
            <p style={styles.specialtyText}>We handpick our flowers daily to ensure freshness and quality.</p>
          </div>
          <div
            style={styles.specialtyCard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <GiTruck style={styles.icon} />
            <h3 style={styles.specialtyTitle}>Fast Delivery</h3>
            <p style={styles.specialtyText}>We offer fast and reliable delivery, ensuring your flowers arrive on time.</p>
          </div>
          <div
            style={styles.specialtyCard}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <GiSunflower style={styles.icon} />
            <h3 style={styles.specialtyTitle}>Eco-Friendly</h3>
            <p style={styles.specialtyText}>We are committed to sustainable practices to protect the environment.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#343a40',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Subtle overlay for better readability
    zIndex: 1,
  },
  content: {
    textAlign: 'center',
    marginBottom: '30px',
    zIndex: 2, // Ensure content appears above the overlay
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    animation: 'fadeIn 2s',
    color: '#fff',
  },
  subtitle: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    color: '#f8f9fa',
  },
  highlight: {
    color: '#000', // Updated to black
    fontWeight: 'bold',
    marginLeft: '5px',
  },
  section: {
    padding: '20px',
    textAlign: 'center',
    zIndex: 2, // Ensure section content is above the overlay
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#fff',
  },
  productGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    overflow: 'hidden',
    width: '250px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    animation: 'bounceIn 1.5s',
  },
  productImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  productName: {
    padding: '10px',
    fontWeight: 'bold',
  },
  specialtiesContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  specialtyCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    width: '300px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  specialtyTitle: {
    fontSize: '1.5rem',
    margin: '10px 0',
  },
  specialtyText: {
    fontSize: '1rem',
    color: '#6c757d',
  },
  icon: {
    fontSize: '3rem',
    color: '#17a2b8',
    marginBottom: '10px',
  },
};

export default Main;
