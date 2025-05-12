import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password
      });

      alert(res.data.response);
      if (res.data.loginStatus) {
        setIsLoggedIn(true);
        navigate("/home");
      } else {
        alert("Login failed. Check credentials.");
      }
    } catch (err) {
      alert("Server error or incorrect credentials.");
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <div>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
