import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ width: "420px" }}>

        <h3 className="text-center mb-4 fw-bold">Create Account</h3>

        <form onSubmit={handleRegister}>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Register Button */}
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>

          {/* Links */}
          <div className="text-center mt-3">

            <small>
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none fw-semibold">
                Login
              </Link>
            </small>

          </div>

          <div className="text-center mt-2">
            <small>
              Forgot password?{" "}
              <Link
                to="/forgot-password"
                className="text-decoration-none text-danger fw-semibold"
              >
                Reset here
              </Link>
            </small>
          </div>

        </form>
      </div>
    </div>
  );
}