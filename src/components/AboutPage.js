import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import lavender from '../Images/purplepink.jpg';

const AboutPage = () => {
  return (
    <div className="page-background">
      <div className="about-container">
        <h2 className="about-header"><FaInfoCircle /> About Us</h2>
        <p className="about-text">Welcome to our Floral Shop! We specialize in delivering fresh, beautiful flowers for every occasion, from birthdays and anniversaries to weddings and corporate events.</p>
        <p className="about-text">Our mission is to bring joy and beauty into your life with our carefully curated bouquets and floral arrangements, designed to make every moment special. With a commitment to quality and customer satisfaction, we ensure that every order is handled with care and delivered with a personal touch.</p>
        <p className="about-text">At our floral shop, we believe that flowers have the power to convey emotions that words sometimes cannot. Whether you’re looking for something classic or unique, we have a variety of arrangements tailored just for you.</p>
        <div className="about-image-container">
          <img src={lavender} alt="Flowers" className="about-image" />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

// CSS Styling in the same file

const css = `
.page-background {
  background-color: #e0efff; /* Misty blue */
  padding: 40px 0;
}

.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: fadeIn 1s ease-in-out;
  color: #2e2e2e;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.about-header {
  font-size: 32px;
  color: #6b8e23;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-header svg {
  margin-right: 10px;
}

.about-text {
  font-size: 18px;
  color: #4f4f4f;
  margin-bottom: 20px;
  line-height: 1.8;
}

.about-image-container {
  margin-top: 30px;
}

.about-image {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease;
}

.about-image:hover {
  transform: scale(1.05);
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = css;
document.head.appendChild(styleSheet);
