import React from "react";
import "./Sidebar.css";

const Sidebar = ({ items, isOpen, setIsOpen }) => {
  if (!isOpen) {
    return null;
  }

  const handleTitleClick = (sectionId) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 60,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h3>Section Titles:</h3>
        {items.map((item, index) => (
          <p
            key={`${item.sectionId}-${index}`}
            onClick={() => handleTitleClick(item.sectionId)}
          >
            {item.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
