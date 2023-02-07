import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-box">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2 className="header-text">SWAPI - Star wars api builder</h2>
      </Link>
    </div>
  );
};

export default Header;
