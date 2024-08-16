import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Pocetna
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/calendar" className="navbar-link">
            Kalendar
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/contact" className="navbar-link">
            Kontakt
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
