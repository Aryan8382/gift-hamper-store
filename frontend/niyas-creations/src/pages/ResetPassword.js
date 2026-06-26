import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import '../styles/auth.css';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/users/reset-password", {
        email,
        newPassword,
      });
      alert("Password reset successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nc-auth-page">
      <div className="nc-auth-card">

        {/* Icon */}
        <div className="nc-auth-icon">🔑</div>

        {/* Heading */}
        <h3 className="nc-auth-title">Reset Password</h3>
        <p className="nc-auth-subtitle">Choose a strong new password</p>
        <div className="nc-auth-divider"></div>

        {/* Step indicator */}
        <div className="nc-steps">
          <div className="nc-step done">
            <div className="nc-step-dot">✓</div>
            <span className="nc-step-label">Email</span>
          </div>
          <div className="nc-step-line done"></div>
          <div className="nc-step done">
            <div className="nc-step-dot">✓</div>
            <span className="nc-step-label">OTP</span>
          </div>
          <div className="nc-step-line done"></div>
          <div className="nc-step active">
            <div className="nc-step-dot">3</div>
            <span className="nc-step-label">Reset</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="nc-form-group">
            <label className="nc-form-label">Email Address</label>
            <input
              type="email"
              className="nc-input"
              value={email}
              readOnly
            />
          </div>

          <div className="nc-form-group">
            <label className="nc-form-label">New Password</label>
            <input
              type="password"
              className="nc-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>

          <div className="nc-form-group">
            <label className="nc-form-label">Confirm Password</label>
            <input
              type="password"
              className="nc-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            className="nc-btn-primary"
            disabled={loading}
          >
            {loading ? "Resetting…" : "Reset Password"}
          </button>
        </form>

        <div className="nc-auth-footer">
          <span>
            <Link to="/login" className="nc-auth-link-gold">
              ← Back to Login
            </Link>
          </span>
        </div>

        <div className="nc-auth-brand">🎁 Niyas Creations</div>
      </div>
    </div>
  );
}

export default ResetPassword;