import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);

  const email = localStorage.getItem('email');
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchUser();
    fetchUserBlogs();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/user?email=${email}`);
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  const fetchUserBlogs = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/blogs/user/${username}`);
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch user blogs:", err);
    }
  };

  return (
    <div className="scrollable-profile">
    <div className="profile-container">
      <nav className="bnav-bar">
        <div className="bnav-content">
          <ol className="bnav-list">
            <li><Link to="/home" className="link">Home</Link></li>
            <li><Link to="/blog" className="link">Blog</Link></li>
            <li><Link to="/about" className="link">About</Link></li>
            <li><Link to="/profile" className="link">Profile</Link></li>
            <li><Link to="/" className="link">Logout</Link></li>
          </ol>
        </div>
      </nav>

     <div className="profile-card">
        <p><strong><u>PROFILE</u></strong></p>
  <p><strong>Firstname:</strong> {user.firstname}</p>
  <p><strong>Lastname:</strong> {user.lastname}</p>
  <p><strong>Username:</strong> {user.username}</p>
  <p><strong>Email:</strong> {user.email}</p>
</div>
      <h3 className="blog-header">My Blogs</h3>
      <div className="blog-list">
        {blogs.length === 0 ? (
          <p className="no-blogs">You haven't posted any blogs yet.</p>
        ) : (
          blogs.map((blog, index) => (
            <div key={index} className="blog-card">
              <p>{blog.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default Profile;
