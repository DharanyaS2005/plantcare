import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newBlog, setNewBlog] = useState('');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    }
  };

  const handleCreateBlog = async () => {
    try {
      const blogData = { username, content: newBlog };
      const res = await axios.post('http://localhost:5000/blogs', blogData);
      setBlogs([res.data, ...blogs]);
      setNewBlog('');
      setShowForm(false);
    } catch (err) {
      console.error('Failed to submit blog:', err);
    }
  };

  return (
    <div className="blog-page">
      <nav className="bnav-bar">
        <div className="bnav-content">
          <ol className="bnav-list">
            <li>
              <Link to="/home" className="link">Home</Link>
            </li>
            <li>
              <Link to="/blog" className="link">Blog</Link>
            </li>
            <li>
              <Link to="/about" className="link">About</Link>
            </li>
            <li>
              <Link to="/profile" className="link">Profile</Link>
            </li>
            <li>
              <Link to="/" className="link">Logout</Link>
            </li>
          </ol>
        </div>
      </nav>

      

      <div className="scrollable-content">
        <h1 className="blog-header">Plant Blog</h1>
        <button className="create-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create Blog'}
        </button>

        {showForm && (
          <div className="blog-form">
            <textarea
              placeholder="Write your thoughts..."
              value={newBlog}
              onChange={(e) => setNewBlog(e.target.value)}
            />
            <button className="submit-btn" onClick={handleCreateBlog}>Submit</button>
          </div>
        )}

        <div className="blog-list">
          {blogs.map((blog, index) => (
            <div className="blog-item" key={index}>
              <h4>@{blog.username}</h4>
              <p>{blog.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
