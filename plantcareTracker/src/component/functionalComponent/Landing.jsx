import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Welcome To Plant Care Tracker</h1>
      <div className="landbutton-container">
        <button className="signup-btn" onClick={() => navigate('/signup')}>
          <b>Signup</b>
        </button>
        <button className="login-btn" onClick={() => navigate('/login')}>
          <b>Login</b>
        </button>
      </div>
    </div>
  );
};

export default Landing;
