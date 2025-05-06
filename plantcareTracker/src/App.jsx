import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/functionalComponent/Home';
import Landing from './component/functionalComponent/Landing';
import Login from './component/functionalComponent/Login';
import Signup from './component/functionalComponent/Signup';
import About from './component/functionalComponent/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        
      </Routes>
    </Router>
  );
}

export default App;
