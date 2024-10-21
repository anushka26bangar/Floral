import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingBag } from 'react-icons/fa'; // Shopping bag icon
import { MdAddShoppingCart } from 'react-icons/md'; // Additional shopping cart icon

const ShopPage = () => {
    const [flowers, setFlowers] = useState([]);

    useEffect(() => {
        const fetchFlowers = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/flowers');
                setFlowers(response.data);
            } catch (error) {
                console.error('Error fetching flowers:', error);
            }
        };

        fetchFlowers();
    }, []);

    const handleAddToCart = (flower) => {
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = [...currentCart, flower];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        alert(`${flower.name} has been added to your cart!`);
    };

    return (
        <div style={styles.shopContainer}>
            <h1 style={styles.shopTitle}>
                <FaShoppingBag style={styles.icon} /> Shop
            </h1>
            <div style={styles.flowerGrid}>
                {flowers.map((flower) => (
                    <div
                        key={flower.id}
                        style={styles.flowerCard}
                        className="flower-card"
                        onMouseEnter={(e) => e.currentTarget.style.transform = styles.flowerCardHover.transform}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <img style={styles.flowerImage} src={flower.image_url} alt={flower.name} />
                        <h2 style={styles.flowerName}>{flower.name}</h2>
                        <p style={styles.flowerPrice}>Price: ₹{flower.price}</p>
                        <div style={styles.buttonContainer}>
                            <button
                                style={styles.addToCartButton}
                                onClick={() => handleAddToCart(flower)}
                            >
                                <MdAddShoppingCart style={styles.buttonIcon} /> Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// CSS-in-JS styles
const styles = {
    shopContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#1c1c1c',
        color: '#f8f9fa',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    },
    shopTitle: {
        textAlign: 'center',
        fontSize: '2.5rem',
        marginBottom: '20px',
        color: '#28a745',
        borderBottom: '2px solid #28a745',
        paddingBottom: '10px',
    },
    icon: {
        marginRight: '10px',
    },
    flowerGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
    },
    flowerCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        textAlign: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#d3d3d3',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition for scaling and shadow
    },
    flowerCardHover: {
        transform: 'scale(1.05)', // Scale the card by 5% on hover
    },
    flowerImage: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '8px',
    },
    flowerName: {
        fontSize: '1.5rem',
        margin: '10px 0',
        color: '#28a745',
    },
    flowerPrice: {
        fontSize: '1.2rem',
        marginBottom: '15px',
        color: '#28a745',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
    },
    addToCartButton: {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s',
    },
    buttonIcon: {
        marginRight: '5px',
    },
};

// Exporting the ShopPage component
export default ShopPage;
