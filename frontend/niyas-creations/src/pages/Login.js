import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        
        <h3 className="text-center mb-4 fw-bold">Login</h3>

        <form onSubmit={handleLogin}>

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

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

          {/* Forgot Password */}
          <div className="text-center mt-3">
            <small>
              <Link
                to="/forgot-password"
                className="text-decoration-none fw-semibold"
              >
                Forgot Password?
              </Link>
            </small>
          </div>

          {/* Register link (optional but useful) */}
          <div className="text-center mt-2">
            <small>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-decoration-none fw-semibold"
              >
                Register
              </Link>
            </small>
          </div>

        </form>
      </div>
    </div>
  );
}