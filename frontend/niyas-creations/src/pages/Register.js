import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css"

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
    <div className="nc-auth-page">
      <div className="nc-auth-card">

        {/* Icon */}
        <div className="nc-auth-icon">🎁</div>

        {/* Heading */}
        <h3 className="nc-auth-title">Create Account</h3>
        <p className="nc-auth-subtitle">Join Niyas Creations today</p>
        <div className="nc-auth-divider"></div>

        <form onSubmit={handleRegister}>

          {/* Name */}
          <div className="nc-form-group">
            <label className="nc-form-label">Name</label>
            <input
              type="text"
              className="nc-input"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="nc-form-group">
            <label className="nc-form-label">Email</label>
            <input
              type="email"
              className="nc-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="nc-form-group">
            <label className="nc-form-label">Password</label>
            <input
              type="password"
              className="nc-input"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <button type="submit" className="nc-btn-primary">
            Create Account
          </button>

          {/* Footer links */}
          <div className="nc-auth-footer">
            <span>
              Already have an account?{" "}
              <Link to="/login" className="nc-auth-link">
                Login
              </Link>
            </span>
            <span>
              Forgot password?{" "}
              <Link to="/forgot-password" className="nc-auth-link-gold">
                Reset here
              </Link>
            </span>
          </div>

        </form>

        <div className="nc-auth-brand">🎁 Niyas Creations</div>
      </div>
    </div>
  );
}