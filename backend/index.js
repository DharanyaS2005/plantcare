const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Signup = require("./models/signupSchema");
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Signup Route
app.post('/signup', async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Signup({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).send("Signup successful");
  } catch (err) {
    res.status(400).send("Signup failed");
  }
});

// Login Route (no token)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(404).send({ response: "User not found", loginStatus: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ response: "Incorrect password", loginStatus: false });
    }

    res.status(200).send({ 
  response: "Login successful", 
  loginStatus: true,
  username: user.username,
  email: user.email  
   });
  } catch (err) {
    res.status(500).send({ response: "Login error", loginStatus: false });
  }
});
const Blog = require("./models/Blog");

// Get all blogs
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

// Post a new blog
app.post('/blogs', async (req, res) => {
  const { username, content } = req.body;
  try {
    const newBlog = new Blog({ username, content });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: "Failed to post blog" });
  }
});

app.get('/user', async (req, res) => {
  try {
    const email = req.query.email;
    const user = await Signup.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only send required user info
    res.json({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
});


// Get blogs by username
app.get('/blogs/user/:username', async (req, res) => {
  const username = req.params.username;
  const blogs = await Blog.find({ username });
  res.json(blogs);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
