import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/navbar.css';

export default function Navbar() {
  const [user, setUser] = useState(null);

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

  return (
    <>
      {/* Navbar */}
      <nav className="navbar nc-navbar px-0">
        <div className="container-fluid">
          <Link className="nc-brand" to="/">
            Niyas Creations
          </Link>

          <button
            className="nc-user-btn border-0"
            data-bs-toggle="offcanvas"
            data-bs-target="#profileSidebar"
          >
            <FaUserCircle size={22} />
          </button>
        </div>
      </nav>

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
                <FaUserCircle size={90} className="nc-avatar-icon" />
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