import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function Navbar() {
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, []);

  const getProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            Niyas Creations
          </Link>

          <button
            className="btn text-white border-0"
            data-bs-toggle="offcanvas"
            data-bs-target="#profileSidebar"
          >
            <FaUserCircle size={35} />
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="profileSidebar"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title">My Account</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          {token && user ? (
            <>
              <div className="text-center mb-4">
                <FaUserCircle
                  size={90}
                  className="text-primary mb-3"
                />

                <h4 className="mb-1">{user.name}</h4>
                <p className="text-muted">{user.email}</p>

                <span className="badge bg-success">
                  {user.role}
                </span>
              </div>

              <hr />

              <div className="d-grid gap-2">
                <Link
                  className="btn btn-outline-primary"
                >
                  Edit Profile
                </Link>

                <button
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mt-5">
                <FaUserCircle
                  size={90}
                  className="text-secondary mb-3"
                />

                <h5>Welcome Guest</h5>
                <p className="text-muted">
                  Login to access your account
                </p>

                <div className="d-grid gap-2 mt-4">
                  <Link
                    to="/login"
                    className="btn btn-primary"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="btn btn-outline-success"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}