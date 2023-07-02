import React from "react";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <p>
          © {year} {`< EdTech /> All rights reserved.`}{" "}
        </p>

        <div className="social-icons">
          {/* eslint-disable-next-line */}
          <a href="#">
            <i className="fab fa-facebook-f"></i>
          </a>
          {/* eslint-disable-next-line */}
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          {/* eslint-disable-next-line */}
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          {/* eslint-disable-next-line */}
          <a href="#">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
