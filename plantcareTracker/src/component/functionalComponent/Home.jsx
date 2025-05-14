import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const plantIssues = [
  { issue: "Yellow Leaves", solution: "Use nitrogen-rich fertilizer and ensure proper watering." },
  { issue: "Wilting", solution: "Check soil moisture and avoid overwatering." },
  { issue: "Pest Infestation", solution: "Use neem oil or mild insecticidal soap." },
  { issue: "Brown Spots", solution: "Reduce direct sunlight exposure and ensure proper hydration." },
  { issue: "Root Rot", solution: "Improve drainage, avoid overwatering, and trim affected roots." },
  { issue: "Leaf Curling", solution: "Check for pests and ensure consistent watering." },
  { issue: "Mold Growth", solution: "Increase airflow around the plant and avoid excessive humidity." },
  { issue: "Drooping Leaves", solution: "Ensure proper light exposure and check for underwatering." },
  { issue: "Black Spots on Leaves", solution: "Use a fungicide and avoid overhead watering." },
  { issue: "Slow Growth", solution: "Ensure adequate sunlight and use a balanced fertilizer." },
  { issue: "Leggy Growth", solution: "Prune the plant and provide more direct sunlight." },
  { issue: "Brown Leaf Tips", solution: "Increase humidity and avoid salt buildup in soil." },
  { issue: "White Powder on Leaves", solution: "Wipe leaves with a mix of water and baking soda." },
  { issue: "Fungal Infection", solution: "Use a copper-based fungicide and remove affected leaves." }
];


const Home = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    const foundIssue = plantIssues.find((item) =>
      item.issue.toLowerCase().includes(search.toLowerCase())
    );
    setResult(foundIssue ? foundIssue.solution : "No solution found. Try another search.");
  };
  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/json", {
          headers: {
            Authorization: token,
          },
        });
        console.log("Protected data:", res.data);
        setUser(res.data.user?.username || "User");
      } catch (err) {
        console.error("Protected route error", err);
      }
    };

    fetchProtectedData();
  }, []);
  return (
    <div className="container">
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
      <h1>Plant Care Tracker</h1>
      <input
        type="text"
        placeholder="Search plant issue..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {result && (
        <div className="result-box">
          <h2>Solution:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
