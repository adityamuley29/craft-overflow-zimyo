import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { isAuthenticated } from "../utils/common";

const Navbar = () => {
  const [loggedUser, setLoggedUser] = useState(isAuthenticated());
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setLoggedUser(false);
    navigate("/login");
  };

  useEffect(() => {
    setLoggedUser(isAuthenticated());
  }, []);
  return (
    <nav className="navbar">
      <h1 className="brand-heading">
        <Link to="/">Craft Overflow</Link>
      </h1>
      <ul className="navbar-links">
        {loggedUser ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="/" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
