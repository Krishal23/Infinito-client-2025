import { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../pages/assets/infinito-logo.png";
import axiosInstance from "../utils/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  let timeoutId = null;


  const { user, logout } = useContext(AuthContext);
  const isAuth = !!user;

  

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
    }, 5000);
  };

  const handleMenuClick = () => {
    setShowMobileMenu((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post(
        "auth/logout",
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      logout();
      navigate("/auth");
    } catch (err) {
      console.error("Logout failed:", err);
    }
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
              {
                user?.role ==="admin" && (
                  <Link to="/admin">Admin</Link>
                )
              }
              {/* <Link to="/auth" className="login-btn">Login</Link> */}
              {isAuth ? (
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              ) : (
                <Link to="/auth" className="login-btn">Login</Link>
              )}
            </div>
        </div>
      )}
      <div >
        <div
          className="dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
        </div>
        <div className="desktop-menu">
          <Link to="/">Home</Link>
          <Link to="/event/ins">Events</Link>
          <Link to="/ca">CA Portal</Link>
          <Link to="/aboutUs">Team</Link>
          <Link to="/sponsor">Sponsors</Link>
          <Link to="/merch">Merch</Link>
          {
            user?.role ==="admin" && (
              <Link to="/admin">Admin</Link>
            )
          }          
          {/* <Link to="/auth" className="login-btn">Login</Link> */}
          {isAuth ? (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          ) : (
            <Link to="/auth" className="login-btn">Login</Link>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
