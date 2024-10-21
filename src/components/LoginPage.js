import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/login', {
        email: formData.email,
        password: formData.password,
      });

      console.log('Response:', response.data);

      if (response.data.message === 'Admin login successful') {
        setIsSubmitted(true);
        alert('Admin login successful');  // Alert message for admin
        navigate('/admin-homepage');
      } else if (response.data.message === 'User login successful') {
        setIsSubmitted(true);
        alert('User login successful');  // Alert message for user
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error.message);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header"><FaSignInAlt /> Login</h2>
      {error && <p className="error-message">{error}</p>}
      {isSubmitted ? (
        <div className="welcome-message">
          <h3>Welcome back!</h3>
          <p>You have successfully logged in.</p>
        </div>
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              required
              autoComplete="email"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Your Password"
              required
              autoComplete="current-password"
            />
          </label>
          <button type="submit" className="submit-btn">Login</button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;

// CSS Styling in the same file
const loginCss = `
         .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .login-header {
    font-size: 24px;
    color: #4CAF50;
    margin-bottom: 20px;
  }

  .login-form label {
    display: block;
    margin-bottom: 10px;
    font-size: 16px;
    color: #555;
  }

  .login-form input {
    width: 90%;
    padding: 10px;
    margin: 5px 0 20px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .submit-btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }

  .submit-btn:hover {
    background-color: #0056b3;
  }

  .welcome-message {
    text-align: center;
    color: #28a745;
  }

  .error-message {
    color: red;
    text-align: center;
    margin-bottom: 15px;
  }
`; // Keep your existing CSS styling here

// Inject CSS to the document's head
const styleSheetLogin = document.createElement("style");
styleSheetLogin.type = "text/css";
styleSheetLogin.innerText = loginCss;
document.head.appendChild(styleSheetLogin);
