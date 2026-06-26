import React, { useEffect, useState } from "react";
import { FaUserCircle, FaShoppingCart, FaSearch, FaHeart, FaGift, FaInfoCircle, FaPhone } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/navbar.css';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      getProfile();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page (to be implemented)
      console.log("Searching for:", searchQuery);
      // navigate(`/search?q=${searchQuery}`);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar nc-navbar px-0">
        <div className="container-fluid">
          <Link className="nc-brand" to="/">
            Niyas Creations
          </Link>

          {/* Navigation Links */}
          <div className="nc-nav-links">
            <Link className="nc-nav-link" to="/">
              <FaGift className="nc-nav-icon" />
              <span>Home</span>
            </Link>
            <Link className="nc-nav-link" to="/gift">
              <FaGift className="nc-nav-icon" />
              <span>Gifts</span>
            </Link>
            <Link className="nc-nav-link" to="/about">
              <FaInfoCircle className="nc-nav-icon" />
              <span>About</span>
            </Link>
            <Link className="nc-nav-link" to="/contact">
              <FaPhone className="nc-nav-icon" />
              <span>Contact</span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="nc-nav-actions">
            {/* Search Button */}
            <button className="nc-action-btn" onClick={toggleSearch}>
              <FaSearch size={20} />
            </button>

            {/* Wishlist */}
            <Link className="nc-action-btn" to="/wishlist">
              <FaHeart size={20} />
            </Link>

            {/* Cart */}
            <Link className="nc-action-btn nc-cart-btn" to="/cart">
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="nc-cart-badge">{cartCount}</span>
              )}
            </Link>

            {/* User Profile */}
            <button
              className="nc-user-btn border-0"
              data-bs-toggle="offcanvas"
              data-bs-target="#profileSidebar"
            >
              {user && user.profileImage ? (
                <img 
                  src={`http://localhost:5000/uploads/profiles/${user.profileImage}`} 
                  alt="Profile" 
                  className="nc-user-avatar"
                />
              ) : (
                <FaUserCircle size={22} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="nc-search-bar">
          <form onSubmit={handleSearch} className="nc-search-form">
            <input
              type="text"
              className="nc-search-input"
              placeholder="Search for gifts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="submit" className="nc-search-submit">
              <FaSearch />
            </button>
            <button type="button" className="nc-search-close" onClick={toggleSearch}>
              ×
            </button>
          </form>
        </div>
      )}

      {/* Sidebar */}
      <div
        className="offcanvas offcanvas-end nc-sidebar"
        tabIndex="-1"
        id="profileSidebar"
      >
        <div className="offcanvas-header nc-sidebar-header">
          <h5 className="nc-sidebar-title">My Account</h5>
          <button
            type="button"
            className="btn-close nc-sidebar-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body nc-sidebar-body">
          {token && user ? (
            <>
              <div className="nc-avatar-wrap">
                {user.profileImage ? (
                  <img 
                    src={`http://localhost:5000/uploads/profiles/${user.profileImage}`} 
                    alt="Profile" 
                    className="nc-avatar-image"
                  />
                ) : (
                  <FaUserCircle size={90} className="nc-avatar-icon" />
                )}
                <h4 className="nc-user-name">{user.name}</h4>
                <p className="nc-user-email">{user.email}</p>
                <span className="nc-role-badge">{user.role}</span>
              </div>

              <hr className="nc-divider" />

              <div>
                <Link className="nc-btn-edit" to="/profile">
                  Edit Profile
                </Link>
                <button className="nc-btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="nc-guest-wrap">
              <FaUserCircle size={90} className="nc-avatar-icon-guest" />
              <h5 className="nc-guest-title">Welcome, Guest</h5>
              <p className="nc-guest-sub">Login to access your account</p>

              <div>
                <Link to="/login" className="nc-btn-login">
                  Login
                </Link>
                <Link to="/register" className="nc-btn-register">
                  Create Account
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}