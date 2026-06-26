import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import '../styles/auth.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      alert("Login Successful");
      navigate("/Homepage");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="nc-auth-page">
      <div className="nc-auth-card">

        {/* Icon */}
        <div className="nc-auth-icon">🎁</div>

        {/* Heading */}
        <h3 className="nc-auth-title">Welcome Back</h3>
        <p className="nc-auth-subtitle">Sign in to your account</p>
        <div className="nc-auth-divider"></div>

        <form onSubmit={handleLogin}>

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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <button type="submit" className="nc-btn-primary">
            Login
          </button>

          {/* Footer links */}
          <div className="nc-auth-footer">
            <span>
              <Link to="/forgot-password" className="nc-auth-link-gold">
                Forgot Password?
              </Link>
            </span>
            <span>
              Don't have an account?{" "}
              <Link to="/register" className="nc-auth-link">
                Register
              </Link>
            </span>
          </div>

        </form>

        <div className="nc-auth-brand">🎁 Niyas Creations</div>
      </div>
    </div>
  );
}