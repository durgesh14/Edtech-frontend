import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ setSearchTerm }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  const handleSearchChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(inputValue);
    navigate(`/search/${inputValue}`);
  };

  return (
    <header className="header">
      <nav className="navbar-container">
        <Link to="/" className="navbar-brand">
          {`< EdTech />`}
        </Link>
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search..."
              value={inputValue}
              onChange={handleSearchChange}
              className="search-input"
            />
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;
