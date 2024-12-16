import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaImage } from 'react-icons/fa'; // Importing an icon from react-icons

const EditFlower = () => {
  const { id } = useParams();  // Get the flower ID from the URL
  const [flower, setFlower] = useState({
    name: '',
    price: '',
    image_url: '', 
    imageFile: null // State for the selected file
  });
  const [error, setError] = useState(null);

  // Fetch flower details when component mounts
  useEffect(() => {
    fetch(`/api/flower/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch flower details.');
        }
        return response.json();
      })
      .then((data) => setFlower(data))
      .catch((error) => setError(error.message));
  }, [id]);

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlower({
      ...flower,
      [name]: value,
    });
  };

  // Handle image file change
  const handleFileChange = (e) => {
    setFlower({
      ...flower,
      imageFile: e.target.files[0], // Save the selected file
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('name', flower.name);
    formData.append('price', flower.price);
    if (flower.imageFile) {
      formData.append('image', flower.imageFile); // Append the image file if changed
    }

    try {
      const response = await fetch(`/api/flower/${id}`, {
        method: 'PUT',
        body: formData, // Use FormData for file upload
      });

      if (!response.ok) {
        throw new Error('Failed to update flower.');
      }
      alert('Flower updated successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  // Display error or the form to edit the flower
  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!flower) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-flower-container">
      <h1>Edit {flower.name}</h1>
      <form onSubmit={handleSubmit} className="edit-flower-form">
        <div className="form-group">
          <label htmlFor="flowerName">Name:</label>
          <input
            type="text"
            name="name"
            id="flowerName"
            value={flower.name}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="flowerPrice">Price:</label>
          <input
            type="number"
            name="price"
            id="flowerPrice"
            value={flower.price}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUpload">Change Image:</label>
          <div className="image-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="imageUpload"
            />
            <label htmlFor="imageUpload" className="upload-label">
              <FaImage /> Choose an image
            </label>
            {flower.image_url && (
              <div className="current-image">
                <img src={flower.image_url} alt="Current flower" width="100" />
                <p>Current Image</p>
              </div>
            )}
          </div>
        </div>
        <button type="submit" className="update-button">Update Flower</button>
      </form>

      {/* CSS Styles */}
      <style>{`
        .edit-flower-container {
          max-width: 600px;
          margin: auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          background-color: #fff;
        }

        .edit-flower-form {
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          font-weight: bold;
        }

        input[type="text"],
        input[type="number"],
        input[type="file"] {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .image-upload {
          position: relative;
        }

        .upload-label {
          display: inline-block;
          padding: 10px 15px;
          border: 1px solid #007bff;
          border-radius: 4px;
          background-color: #007bff;
          color: white;
          cursor: pointer;
        }

        .upload-label:hover {
          background-color: #0056b3;
        }

        .update-button {
          padding: 10px;
          border: none;
          border-radius: 4px;
          background-color: #28a745;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }

        .update-button:hover {
          background-color: #218838;
        }

        .current-image img {
          margin-bottom: 10px;
        }

        .error {
          color: red;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default EditFlower;
