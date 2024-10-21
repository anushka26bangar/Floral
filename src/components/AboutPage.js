import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="about-container">
      <h2 className="about-header"><FaInfoCircle /> About Us</h2>
      <p className="about-text">Welcome to our Floral Shop! We specialize in delivering fresh, beautiful flowers for every occasion.</p>
      <p className="about-text">Our mission is to bring joy and beauty into your life with our carefully curated bouquets and floral arrangements.</p>
      <div className="about-image-container">
        <img src="https://via.placeholder.com/400x200" alt="Flowers" className="about-image" />
      </div>
    </div>
  );
};

export default AboutPage;

// CSS Styling in the same file

const css = `
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.about-header {
  font-size: 28px;
  color: #4CAF50;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-header svg {
  margin-right: 10px;
}

.about-text {
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
  line-height: 1.6;
}

.about-image-container {
  margin-top: 20px;
}

.about-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = css;
document.head.appendChild(styleSheet);
