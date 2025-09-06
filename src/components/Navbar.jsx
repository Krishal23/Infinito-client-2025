import { useState, useEffect, useRef, useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../pages/assets/infinito-logo.png";
import axiosInstance from "../utils/axios";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const { user, logout } = useContext(AuthContext);
  const isAuth = !!user;

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
    // Close menu on resize
    const handleResize = () => {
      if (window.innerWidth >= 980) {
        setShowMobileMenu(false);
      }
    };

    // Close menu on outside click
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

      {/* Show hamburger only when menu is closed */}
      {!showMobileMenu && (
        <div
          className="menu-icon"
          onClick={handleMenuClick}
          aria-label="Toggle Menu"
        >
          &#9776;
        </div>
      )}

      {showMobileMenu && (
        <div ref={menuRef} className="mobile-menu show">
          <Link to="/" onClick={() => setShowMobileMenu(false)}>Home</Link>
          <Link to="/event/ins" onClick={() => setShowMobileMenu(false)}>Events</Link>
          <Link to="/ca" onClick={() => setShowMobileMenu(false)}>CA Portal</Link>
          <Link to="/aboutUs" onClick={() => setShowMobileMenu(false)}>Team</Link>
          <Link to="/sponsor" onClick={() => setShowMobileMenu(false)}>Sponsors</Link>
          <Link to="/merch" onClick={() => setShowMobileMenu(false)}>Merch</Link>
          {(user?.role === "admin" || user?.role === "moderator" )  && (
            <Link to="/admin" onClick={() => setShowMobileMenu(false)}>Admin</Link>
          )}
          {isAuth ? (
            <Link onClick={handleLogout}>Logout</Link>
          ) : (
            <Link to="/auth" className="login-btn" onClick={() => setShowMobileMenu(false)}>
              Login
            </Link>
          )}
        </div>
      )}

      <div className="desktop-menu">
        <Link to="/">Home</Link>
        <Link to="/event/ins">Events</Link>
        <Link to="/ca">CA Portal</Link>
        <Link to="/aboutUs">Team</Link>
        <Link to="/sponsor">Sponsors</Link>
        <Link to="/merch">Merch</Link>
        {(user?.role === "admin" || user?.role === "moderator" )  && <Link to="/admin">Admin</Link>}
        {isAuth ? (
          <Link onClick={handleLogout}>Logout</Link>
        ) : (
          <Link to="/auth" className="login-btn">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
