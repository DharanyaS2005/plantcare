import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import { Link } from 'react-router-dom';

import "./About.css";
import plantImage from "../../assets/about.jpg"; 

const About = () => {
  useEffect(() => {
    const sr = ScrollReveal({
      distance: '40px',
      duration: 2500,
      reset: true,
    });

    sr.reveal('.about-content ', { delay: 100, origin: 'right' });
    sr.reveal('.about-image img', { delay: 100, origin: 'right' });

  }, []);
  return (
    <div className="about-page">
        <nav className="nav-bar">
        <div className="nav-content">
          <ol className="nav-list">
            <li>
              <Link to="/home" className="link">
                Home
              </Link>
            </li>
             <li>
              <Link to="/blog" className="link">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/about" className="link">
                About
              </Link>
            </li>
            <li>
              <Link to="/profile" className="link">Profile</Link>
            </li>
            <li>
              <Link to="/" className="link">
                Logout
              </Link>
            </li>
          </ol>
        </div>
      </nav>
      <div className="about-content">
        <h1>Plant Care Tracker</h1>
        <p>
          Plant Care Tracker is your personal assistant for keeping your plants happy and healthy.
          Simply type in any problem you're noticing — like yellow leaves, brown spots, or wilting etc,
          and our smart assistant will guide you with actionable remedies.
        </p>
        <p>
          The app suggests tips, fertilizers, pest control solutions, and environmental adjustments based on your issue.
          Whether you're a beginner or a gardening pro, this tool simplifies plant care for all.
        </p>
      </div>
      <div className="about-image">
        <img src={plantImage} alt="Plant Care" />
      </div>
      <footer className="footer">
        <p>&copy; 2025 Plant Care Tracker-By Dharanya.</p>
      </footer>
    </div>
  );
};

export default About;
