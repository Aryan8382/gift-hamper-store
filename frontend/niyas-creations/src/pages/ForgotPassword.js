import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import '../styles/auth.css';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/users/forget-password", { email });
      alert("OTP sent to your email");
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nc-auth-page">
      <div className="nc-auth-card">

        {/* Icon */}
        <div className="nc-auth-icon">🔐</div>

        {/* Heading */}
        <h3 className="nc-auth-title">Forgot Password</h3>
        <p className="nc-auth-subtitle">
          Enter your email and we'll send you a reset OTP
        </p>
        <div className="nc-auth-divider"></div>

        {/* Step indicator */}
        <div className="nc-steps">
          <div className="nc-step active">
            <div className="nc-step-dot">1</div>
            <span className="nc-step-label">Email</span>
          </div>
          <div className="nc-step-line"></div>
          <div className="nc-step">
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="nc-btn-primary"
            disabled={loading}
          >
            {loading ? "Sending OTP…" : "Send OTP"}
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

export default ForgotPassword;