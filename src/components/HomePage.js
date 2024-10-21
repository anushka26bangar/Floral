import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSignInAlt, FaUserPlus, FaHome, FaInfoCircle, FaShoppingBag } from 'react-icons/fa';
import Bouquet from '../Images/bouquet.jpg';
import flower2 from '../Images/chafa.jpg';
import flower3 from '../Images/flower1.jpg';
import lavender from '../Images/nature.jpg';

const HomePage = () => {
  const navigate = useNavigate();

  const styles = {
    container: { 
      fontFamily: 'Arial, sans-serif', 
      padding: '20px',
      backgroundImage: `url(${lavender})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
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
    navbar: { backgroundColor: 'rgba(51, 51, 51, 0.8)', padding: '10px', display: 'flex', justifyContent: 'space-around' },
    navLink: { color: '#fff', textDecoration: 'none', fontSize: '18px' },
    heroSection: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: 'rgba(248, 249, 250, 0.8)' },
    heroText: { maxWidth: '50%', color: '#000' }, 
    heroImage: { width: '40%', borderRadius: '10px' },
    button: { padding: '10px 20px', backgroundColor: '#ff6347', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '10px' },
    bestSellers: { textAlign: 'center', padding: '20px', color: 'white', fontSize: '20px' }, 
    flowersContainer: { display: 'flex', justifyContent: 'space-around' },
    flowerCard: { border: '1px solid #ddd', padding: '10px', borderRadius: '10px', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#000' },
    flowerImage: { width: '150px', height: '150px', marginBottom: '10px' }, 
    addToCartBtn: { backgroundColor: '#28a745', color: '#fff', padding: '8px 15px', border: 'none', cursor: 'pointer' },
    contactUs: { backgroundColor: 'rgba(241, 241, 241, 0.8)', padding: '20px', textAlign: 'center', color: '#000' },
    form: { maxWidth: '600px', margin: '0 auto' },
    formInput: { width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' },
    footer: { backgroundColor: 'rgba(51, 51, 51, 0.8)', color: '#fff', padding: '10px', textAlign: 'center' },
    aboutSection: { textAlign: 'center', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#000' },
    flowerName: { color: 'green' }, 
    reviewSection: { textAlign: 'center', padding: '20px', color: '#fff' }, // Removed background color
    blogSection: { textAlign: 'center', padding: '20px', color: '#fff' }, // Removed background color
  };

  const bestSellers = [
    { id: 1, name: 'Rose Bouquet', price: 500, image: Bouquet },
    { id: 2, name: 'Chapha', price: 700, image: flower2 },
    { id: 3, name: 'Sunflower', price: 350, image: flower3 }
  ];

  const handleAddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  return (
    <div style={styles.container}>
      <div style={styles.blurOverlay}></div>
      <div style={styles.content}>
        {/* Navbar */}
        <nav style={styles.navbar}>
          <Link to="/" style={styles.navLink}><FaHome /> Home</Link>
          <Link to="/shop" style={styles.navLink}><FaShoppingBag /> Shop</Link>
          <Link to="/about" style={styles.navLink}><FaInfoCircle /> About Us</Link>
          <Link to="/cart" style={styles.navLink}><FaShoppingCart /> Cart</Link>
          <Link to="/signup" style={styles.navLink}><FaUserPlus /> Sign Up</Link>
          <Link to="/login" style={styles.navLink}><FaSignInAlt /> Login</Link>
        </nav>

        {/* Hero Section */}
        <section style={styles.heroSection}>
          <div style={styles.heroText}>
            <h1>Welcome to Floral Shop</h1>
            <p>Explore our collection of beautiful flowers, flower pots and bouquets.</p>
            <Link to="/shop">
              <button style={styles.button}>Shop Now</button>
            </Link>
          </div>
        </section>

        {/* Best Sellers Section */}
        <section style={styles.bestSellers}>
          <h2>Best Sellers</h2>
          <div style={styles.flowersContainer}>
            {bestSellers.map(flower => (
              <div key={flower.id} style={styles.flowerCard}>
                <img src={flower.image} alt={flower.name} style={styles.flowerImage} />
                <h3 style={styles.flowerName}>{flower.name}</h3>
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

        {/* Customer Reviews Section */}
        <section style={styles.reviewSection}>
          <h2>Customer Reviews</h2>
          <p>"The best flower shop in town!" - Sarah</p>
          <p>"Beautiful bouquets at affordable prices." - John</p>
          <p>"Highly recommend for any occasion." - Emma</p>
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
              autoComplete="name" 
            />
            <input 
              type="text" 
              id="contact" 
              name="contact" 
              placeholder="Phone Number or Email" 
              required 
              style={styles.formInput} 
              autoComplete="tel" 
            />
            <textarea 
              id="message" 
              name="message" 
              placeholder="Message" 
              rows="4" 
              required 
              style={styles.formInput} 
              autoComplete="off" 
            ></textarea>
            <button type="submit" style={styles.button}>Submit</button>
          </form>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <p>Privacy Policy | Terms of Service | © 2024 Floral Shop</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
