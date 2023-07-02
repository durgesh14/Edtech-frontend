import React, { useState } from "react";

import { useNavigate, useLocation, Link } from "react-router-dom";
import "./LoginForm.css";
import AuthService from "../../services/AuthService";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const isAuthenticated = await AuthService.authenticate(username, password);
    if (isAuthenticated) {
      navigate(from);
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <div class="login-left"></div>
      <div class="login-right">
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="submit-btn" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Log in"}
          </button>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
          <div className="test-account-info">
            <p>For testing, you can use the following account:</p>
            <p>Username: zoro</p>
            <p>Password: 12345</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
