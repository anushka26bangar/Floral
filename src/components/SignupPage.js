import React, { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import lavender from '../Images/autumn.jpg';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const result = await response.json();
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      } else {
        setError(result.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.signupPage}>
      <div style={styles.signupContainer}>
        <h2 style={styles.title}>
          <FaUserPlus style={styles.icon} /> Sign Up
        </h2>
        {error && <p style={styles.error}>{error}</p>}
        {isSubmitted ? (
          <p style={styles.success}>
            Signup successful! You can now <Link to="/login" style={styles.link}>log in</Link>.
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>
                <FiUser style={{ ...styles.inputIcon, color: '#4CAF50' }} /> Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                <FiMail style={{ ...styles.inputIcon, color: '#2196F3' }} /> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                <FiLock style={{ ...styles.inputIcon, color: '#FF9800' }} /> Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="confirmPassword" style={styles.label}>
                <FiLock style={{ ...styles.inputIcon, color: '#FF5722' }} /> Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.submitButton}>Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  signupPage: {
    backgroundImage: `url(${lavender})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  signupContainer: {
    maxWidth: '400px',
    width: '100%',
    padding: '30px 20px',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
    fontSize: '1.8em',
    fontWeight: 'bold'
  },
  icon: {
    marginRight: '8px',
    color: '#4CAF50'
  },
  formGroup: {
    position: 'relative',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#555',
    marginBottom: '5px'
  },
  inputIcon: {
    marginRight: '8px',
    fontSize: '1.2em',
  },
  input: {
    padding: '10px 15px',
    width: '90%',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1em',
    outline: 'none',
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1em',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
    textAlign: 'center'
  },
  success: {
    color: 'green',
    textAlign: 'center'
  },
  link: {
    color: '#4CAF50',
    textDecoration: 'underline',
    cursor: 'pointer'
  }
};

export default SignupPage;
