import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSignOutAlt, FaHome, FaInfoCircle, FaShoppingBag } from 'react-icons/fa';
import backgroundImg from '../Images/bg1.jpg';
import Img1 from '../Images/bouquet.jpg';
import Img2 from '../Images/chafa.jpg';
import Img3 from '../Images/sunflower.jpg';

const HomePage = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      minHeight: '100vh',
      position: 'relative',
    },
    blurOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backdropFilter: 'blur(1.5px)',
      zIndex: 1,
    },
    content: {
      position: 'relative',
      zIndex: 2,
    },
    navbar: {
      backgroundColor: 'rgba(51, 51, 51, 0.8)',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-around',
    },
    navLink: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '18px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#ff6347',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      marginTop: '10px',
    },
    bestSellers: {
      textAlign: 'center',
      padding: '20px',
      color: 'black',
      fontSize: '20px',
    },
    flowersContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
    },
    flowerCard: {
      width: '200px',
      height: '200px',
      border: '2px solid #ddd',
      padding: '10px',
      borderRadius: '10px',
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
      color: '#333',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    flowerCardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    },
    flowerImage: {
      width: '100%',
      height: '70%',
      objectFit: 'cover',
      borderRadius: '5px',
    },
    blogSection: {
      padding: '20px',
      backgroundColor: 'rgba(240, 240, 240, 0.8)',
      textAlign: 'center',
      marginTop: '40px',
    },
    contactUs: {
      padding: '20px',
      backgroundColor: 'rgba(248, 249, 250, 0.8)',
      textAlign: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '400px',
      margin: '0 auto',
    },
    formInput: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
    },
    footer: {
      textAlign: 'center',
      padding: '10px',
      backgroundColor: 'rgba(51, 51, 51, 0.8)',
      color: '#fff',
    },
  };

  const bestSellers = [
    { id: 1, name: 'Rose Bouquet', price: 500, image: Img1 },
    { id: 2, name: 'Chapha', price: 700, image: Img2 },
    { id: 3, name: 'Sunflower', price: 350, image: Img3 },
  ];

  const handleAddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Assuming user info is stored in localStorage
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.blurOverlay}></div>
      <div style={styles.content}>
        <nav style={styles.navbar}>
          <Link to="/" style={styles.navLink}>
            <FaHome /> Home
          </Link>
          <Link to="/shop" style={styles.navLink}>
            <FaShoppingBag /> Shop
          </Link>
          <Link to="/about" style={styles.navLink}>
            <FaInfoCircle /> About Us
          </Link>
          <Link to="/cart" style={styles.navLink}>
            <FaShoppingCart /> Cart
          </Link>
          <button onClick={handleLogout} style={{ ...styles.navLink, background: 'none', border: 'none', cursor: 'pointer' }}>
            <FaSignOutAlt /> Logout
          </button>
        </nav>

        <section style={styles.bestSellers}>
          <h2>Best Sellers</h2>
          <div style={styles.flowersContainer}>
            {bestSellers.map((flower) => (
              <div
                key={flower.id}
                style={styles.flowerCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = styles.flowerCardHover.transform;
                  e.currentTarget.style.boxShadow = styles.flowerCardHover.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <img src={flower.image} alt={flower.name} style={styles.flowerImage} />
                <h3>{flower.name}</h3>
                <p>Price: ₹{flower.price}</p>
                <button
                  style={styles.addToCartBtn}
                  onClick={() => handleAddToCart(flower)}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Posts Section */}
        <section style={styles.blogSection}>
          <h2>From Our Blog</h2>
          <p>Learn how to take care of your flowers during the winter season.</p>
          <p>Top 10 flowers to gift your loved ones.</p>
          <p>Creative ideas for decorating with flowers.</p>
        </section>

        {/* Contact Us Form */}
        <section style={styles.contactUs}>
          <h2>Contact Us</h2>
          <form style={styles.form}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              required
              style={styles.formInput}
            />
            <input
              type="text"
              id="contact"
              name="contact"
              placeholder="Phone Number or Email"
              required
              style={styles.formInput}
            />
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              rows="4"
              style={styles.formInput}
            ></textarea>
            <button type="submit" style={styles.button}>Send Message</button>
          </form>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <p>All Rights Reserved &copy; 2024</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
