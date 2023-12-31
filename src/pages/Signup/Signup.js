import React, { useState } from "react";
import axios from "axios";
import qs from "qs";

import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };
  console.log(process.env.REACT_APP_SERVER_URL);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_URL}/api/auth/register`,
        data: qs.stringify(formState),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(formState);

  return (
    <div className="login-page">
      <div class="login-left"></div>
      <div class="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formState.username}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              className="input-field"
              type="password"
              name="password"
              value={formState.password}
              onChange={handleInputChange}
              required
            />
          </label>
          <button className="submit-btn" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
