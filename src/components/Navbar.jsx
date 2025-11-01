import { useState, useEffect, useRef, useContext } from "react";
import "./Navbar.css";
// 1. Import useLocation to read the current URL
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "/infinito-logo.png";
import axiosInstance from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import "./NoticeScroller.css";
import NoticeScroller from "./noticeScroller";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const [showNotice, setShowNotice] = useState(true); 
  const menuRef = useRef(null);

  // 2. Get the current location object
  const location = useLocation();

  const { user, logout } = useContext(AuthContext);
  const isAuth = !!user;

  // 3. Define on which paths the notice scroller should be hidden
  const hideScrollerOnPaths = ['/auth'];
  const shouldShowScroller = !hideScrollerOnPaths.includes(location.pathname);

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
    <>
      <div className="nav">
        <Link to="/" className="logo-link">
          <img
            src={logo}
            alt="Logo"
            className="logo"
            style={{ marginTop: "5px" }}
          />
        </Link>

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
            <Link to="/pronite">Pronite Passes</Link>
            <Link to="/sponsor" onClick={() => setShowMobileMenu(false)}>Sponsors</Link>
            <Link to="/ca">Campus Ambassador</Link>
            <Link to="/merch" onClick={() => setShowMobileMenu(false)}>Merch</Link>
            {(user?.role === "admin" || user?.role === "moderator") && (
              <Link to="/admin" onClick={() => setShowMobileMenu(false)}>Admin</Link>
            )}
            {/* {isAuth ? (
              <Link onClick={handleLogout}>Logout</Link>
            ) : (
              <Link to="/auth" className="login-btn" onClick={() => setShowMobileMenu(false)}>
                Login
              </Link>
            )} */}
          </div>
        )}

        <div className="desktop-menu">
          <Link to="/">Home</Link>
          <Link to="/event/ins">Events</Link>
          <Link to="/pronite">Pronite Passes</Link>
          <Link to="/sponsor">Sponsors</Link>
            <Link to="/ca">Campus Ambassador</Link>

          {/* <Link to="/accom">Accomodation</Link> */}
          <Link to="/merch">Merch</Link>
          {(user?.role === "admin" || user?.role === "moderator") && <Link to="/admin">Admin</Link>}
          {/* {isAuth ? (
            <Link onClick={handleLogout}>Logout</Link>
          ) : (
            <Link to="/auth" className="login-btn">
              Login
            </Link>
          )} */}
        </div>
      </div>

      {/* 4. Only render the scroller if shouldShowScroller is true */}
       {/* {shouldShowScroller && showNotice && (
        <div className="notice-container">
          <NoticeScroller  visible={showNotice}  setVisible={setShowNotice}/>
        </div>
      )} */}
    </>
  );
};

export default Navbar;
