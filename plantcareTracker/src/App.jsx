import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/functionalComponent/Home';
import Landing from './component/functionalComponent/Landing';
import Login from './component/functionalComponent/Login';
import Signup from './component/functionalComponent/Signup';
import About from './component/functionalComponent/About';
import Blog from './component/functionalComponent/Blog';
import Profile from './component/functionalComponent/Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ Add this

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> {/* ✅ Pass prop */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
