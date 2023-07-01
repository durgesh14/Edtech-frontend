// LoginForm.js
import React, { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import "./LoginForm.css";
import AuthService from "../../services/AuthService";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
