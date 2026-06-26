import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import '../styles/auth.css';

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/users/verify-otp", { email, otp });
      alert("OTP verified successfully");
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nc-auth-page">
      <div className="nc-auth-card">

        {/* Icon */}
        <div className="nc-auth-icon">✉️</div>

        {/* Heading */}
        <h3 className="nc-auth-title">Verify OTP</h3>
        <p className="nc-auth-subtitle">
          Enter the 6-digit code sent to your email
        </p>
        <div className="nc-auth-divider"></div>

        {/* Step indicator */}
        <div className="nc-steps">
          <div className="nc-step done">
            <div className="nc-step-dot">✓</div>
            <span className="nc-step-label">Email</span>
          </div>
          <div className="nc-step-line done"></div>
          <div className="nc-step active">
            <div className="nc-step-dot">2</div>
            <span className="nc-step-label">OTP</span>
          </div>
          <div className="nc-step-line"></div>
          <div className="nc-step">
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
            <label className="nc-form-label">OTP Code</label>
            <input
              type="text"
              className="nc-input nc-otp-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="· · · · · ·"
              maxLength={6}
              required
            />
          </div>

          <button
            type="submit"
            className="nc-btn-primary"
            disabled={loading}
          >
            {loading ? "Verifying…" : "Verify OTP"}
          </button>
        </form>

        <div className="nc-auth-footer-row">
          <Link to="/forgot-password" className="nc-auth-link-gold">
            Resend OTP
          </Link>
          <Link to="/login" className="nc-auth-link">
            Back to Login
          </Link>
        </div>

        <div className="nc-auth-brand">🎁 Niyas Creations</div>
      </div>
    </div>
  );
}

export default VerifyOtp;