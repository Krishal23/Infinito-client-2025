import { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../pages/assets/infinito-logo.png";

const Navbar = () => {
  // const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  // const dropdownRef = useRef(null);
  let timeoutId = null;

  const handleMouseEnter = () => {
    // setShowDropdown(true);
    clearTimeout(timeoutId);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      // setShowDropdown(false);
    }, 5000);
  };

  // const handleDropdownContentMouseEnter = () => {
  //   clearTimeout(timeoutId);
  // };

  // const handleDropdownContentMouseLeave = () => {
  //   timeoutId = setTimeout(() => {
  //     setShowDropdown(false);
  //   }, 5000);
  // };

  const handleMenuClick = () => {
    setShowMobileMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 980) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  return (
    <div className="nav">
      <Link to="/" className="logo-link">
        <img
          src={logo}
          alt="Logo"
          className="logo"
          style={{ marginTop: "5px" }}
        />
      </Link>
      <div
        className="menu-icon"
        onClick={handleMenuClick}
        aria-label="Toggle Menu"
      >
        &#9776;
      </div>
      {showMobileMenu && (
        <div>
          <div
            className="menu-icon"
            onClick={handleMenuClick}
            aria-label="Toggle Menu"
          >
            &#9776;
          </div>
          {/* <Link to="/">Icon1</Link> */}
            <div className={`mobile-menu ${showMobileMenu ? "show" : ""}`}>
              <Link to="/">Home</Link>
              <Link to="/event/ins">Events</Link>
              <Link to="/ca">CA Portal</Link>
              <Link to="/aboutUs">Team</Link>
              <Link to="/sponsor">Sponsors</Link>
              <Link to="/merch">Merch</Link>
              <Link to="/auth" className="login-btn">Login</Link>
            </div>
        </div>
      )}
      <div >
        <div
          className="dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* <Link to="/aboutUs">About Us</Link> */}
        </div>
        <div className="desktop-menu">
          <Link to="/">Home</Link>
          <Link to="/event/ins">Events</Link>
          <Link to="/ca">CA Portal</Link>
          <Link to="/aboutUs">Team</Link>
          <Link to="/sponsor">Sponsors</Link>
          <Link to="/merch">Merch</Link>
          <Link to="/auth" className="login-btn">Login</Link>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
