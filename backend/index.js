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

    res.status(200).send({ response: "Login successful", loginStatus: true });
  } catch (err) {
    res.status(500).send({ response: "Login error", loginStatus: false });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
