import React, { useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddFlower = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
    stock_quantity: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); 
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await axios.post('http://localhost:5001/api/add-flower', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.message === 'Flower added successfully') {
        setSuccess('Flower added successfully!');
        setError('');
        setFormData({ name: '', price: '', description: '', image: null, stock_quantity: '' });
        
        setTimeout(() => {
          navigate('/shop');
        }, 1500);
      } else {
        setError('Failed to add flower. Please try again.');
      }
    } catch (error) {
      console.error('Error adding flower:', error.response ? error.response.data : error.message);
      setError('Failed to add flower. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add a New Flower</h2>
      {error && <p style={styles.errorMessage}>{error}</p>}
      {success && <p style={styles.successMessage}>{success}</p>}
      <form style={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="flower-name">
          Name:
          <input 
            id="flower-name"
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            required 
            autoComplete="off" 
            style={styles.input}
          />
        </label>
        <label htmlFor="flower-price">
          Price:
          <input
            id="flower-price" 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleInputChange} 
            required 
            autoComplete="off" 
            min="0"
            style={styles.input}
          />
        </label>
        <label htmlFor="flower-description">
          Description:
          <textarea 
            id="flower-description"
            name="description" 
            value={formData.description} 
            onChange={handleInputChange} 
            autoComplete="off" 
            style={styles.textarea}
          />
        </label>
        <label htmlFor="flower-image" style={styles.fileInputLabel}>
          Image:
          <input 
            id="flower-image"
            type="file" 
            name="image" 
            onChange={handleImageChange} 
            accept="image/*" 
            required 
            style={styles.input}
          />
        </label>
        <label htmlFor="flower-stock">
          Stock Quantity:
          <input 
            id="flower-stock"
            type="number" 
            name="stock_quantity" 
            value={formData.stock_quantity} 
            onChange={handleInputChange} 
            autoComplete="off" 
            min="0"
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.button}>Add Flower</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: "'Arial', sans-serif",
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    width: '300px',
    border: '1px solid #ced4da',
    borderRadius: '5px',
  },
  textarea: {
    marginBottom: '15px',
    padding: '10px',
    width: '300px',
    border: '1px solid #ced4da',
    borderRadius: '5px',
    height: '100px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  fileInputLabel: {
    marginBottom: '15px',
  },
  errorMessage: {
    color: 'red',
  },
  successMessage: {
    color: 'green',
  },
};

export default AddFlower;
