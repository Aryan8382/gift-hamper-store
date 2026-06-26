import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCamera, FaArrowLeft, FaEdit } from "react-icons/fa";
import "../styles/auth.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    preferences: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
        setFormData({
          name: res.data.name || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
          city: res.data.city || "",
          postalCode: res.data.postalCode || "",
          preferences: res.data.preferences || "",
        });
        if (res.data.profileImage) {
          setPreviewImage(`http://localhost:5000/uploads/profiles/${res.data.profileImage}`);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setMessage("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileImage(null);
    if (user.profileImage) {
      setPreviewImage(`http://localhost:5000/uploads/profiles/${user.profileImage}`);
    } else {
      setPreviewImage(null);
    }
    setFormData({
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
      postalCode: user.postalCode || "",
      preferences: user.preferences || "",
    });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("postalCode", formData.postalCode);
      formDataToSend.append("preferences", formData.preferences);
      
      if (profileImage) {
        formDataToSend.append("profileImage", profileImage);
      }

      const res = await axios.put(
        "http://localhost:5000/api/users/update-profile",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Profile updated successfully!");
      setMessageType("success");
      setUser(res.data.user);
      setProfileImage(null);
      setIsEditing(false);
      
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      console.error("Error response:", error.response);
      setMessage(error.response?.data?.message || "Error updating profile. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="nc-auth-page"><div className="nc-auth-card"><p>Loading...</p></div></div>;
  }

  return (
    <div className="nc-auth-page">
      <div className="nc-auth-card" style={{ maxWidth: "700px", padding: "0" }}>
        {/* Header Section */}
        <div style={{
          background: "linear-gradient(120deg, var(--nc-muted), var(--nc-cream))",
          padding: "2.5rem 2rem",
          textAlign: "center",
          position: "relative",
          borderBottom: "3px solid var(--nc-rose)"
         }}>
          <div style={{ 
            position: "relative", 
            width: "120px", 
            height: "120px", 
            margin: "0 auto 1rem",
            borderRadius: "50%",
            overflow: "hidden",
            border: "4px solid var(--nc-rose)",
            boxShadow: "0 8px 24px rgba(201, 85, 106, 0.4)"
          }}>
            {previewImage ? (
              <img 
                src={previewImage} 
                alt="Profile" 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            ) : (
              <FaUserCircle size={120} style={{ color: "#ccc", width: "100%", height: "100%" }} />
            )}
            {isEditing && (
              <label 
                htmlFor="profileImage" 
                style={{ 
                  position: "absolute", 
                  bottom: "0", 
                  right: "0", 
                  background: "var(--nc-rose)", 
                  color: "white", 
                  width: "36px", 
                  height: "36px", 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  cursor: "pointer",
                  border: "2px solid white"
                }}
              >
                <FaCamera size={16} />
              </label>
            )}
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
          
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.8rem",
            fontWeight: "700",
            color: "white",
            marginBottom: "0.5rem",
            letterSpacing: "-0.02em"
          }}>
            {user.name}
          </h2>
          <p style={{
            fontSize: "0.95rem",
            color: "var(--nc-gold-light)",
            marginBottom: "0.25rem"
          }}>
            {user.email}
          </p>
          <span style={{
            display: "inline-block",
            padding: "0.3rem 1rem",
            background: "linear-gradient(135deg, var(--nc-rose), var(--nc-rose-dark))",
            color: "white",
            borderRadius: "20px",
            fontSize: "0.8rem",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
            {user.role}
          </span>
        </div>

        {/* Content Section */}
        <div style={{ padding: "2rem 2rem" }}>
          {message && (
            <div style={{ 
              padding: "12px 16px", 
              borderRadius: "8px", 
              marginBottom: "1.5rem", 
              fontSize: "0.9rem",
              textAlign: "center",
              background: messageType === "success" ? "#d4edda" : "#f8d7da",
              color: messageType === "success" ? "#155724" : "#721c24",
              border: messageType === "success" ? "1px solid #c3e6cb" : "1px solid #f5c6cb"
            }}>
              {message}
            </div>
          )}

          {!isEditing && (
            <button 
              className="nc-btn-primary" 
              onClick={handleEdit}
              style={{ 
                width: "auto",
                padding: "0.6rem 1.5rem",
                marginBottom: "1.5rem",
                display: "inline-flex",
                alignItems: "center"
              }}
            >
              <FaEdit style={{ marginRight: "8px" }} />
              Edit Profile
            </button>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "1fr 1fr", 
                gap: "1.25rem",
                marginBottom: "1.25rem"
              }}>
                <div className="nc-form-group" style={{ marginBottom: 0 }}>
                  <label className="nc-form-label">Full Name</label>
                  <input
                    type="text"
                    className="nc-input"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="nc-form-group" style={{ marginBottom: 0 }}>
                  <label className="nc-form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="nc-input"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="nc-form-group">
                <label className="nc-form-label">Email</label>
                <input
                  type="email"
                  className="nc-input"
                  value={user.email}
                  readOnly
                />
              </div>

              <div className="nc-form-group">
                <label className="nc-form-label">Address</label>
                <input
                  type="text"
                  className="nc-input"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                />
              </div>

              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "1fr 1fr", 
                gap: "1.25rem",
                marginBottom: "1.25rem"
              }}>
                <div className="nc-form-group" style={{ marginBottom: 0 }}>
                  <label className="nc-form-label">City</label>
                  <input
                    type="text"
                    className="nc-input"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>

                <div className="nc-form-group" style={{ marginBottom: 0 }}>
                  <label className="nc-form-label">Postal Code</label>
                  <input
                    type="text"
                    className="nc-input"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Postal Code"
                  />
                </div>
              </div>

              <div className="nc-form-group">
                <label className="nc-form-label">Gift Preferences</label>
                <textarea
                  className="nc-input"
                  name="preferences"
                  value={formData.preferences}
                  onChange={handleChange}
                  placeholder="Tell us about your gift preferences (e.g., favorite colors, occasions, types of gifts you like)"
                  rows="3"
                  style={{ resize: "vertical" }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "1rem" }}>
                <button 
                  type="button" 
                  className="nc-btn-primary" 
                  onClick={handleCancel}
                  style={{ 
                    background: "#6c757d",
                    flex: 1
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="nc-btn-primary" 
                  disabled={loading}
                  style={{ flex: 1 }}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            <div>
              {/* Info Cards */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
                gap: "1rem",
                marginBottom: "1.5rem"
              }}>
                <div style={{
                  background: "var(--nc-cream)",
                  padding: "1.25rem",
                  borderRadius: "12px",
                  border: "1px solid var(--nc-border)"
                }}>
                  <div style={{ 
                    fontSize: "0.75rem", 
                    fontWeight: "600", 
                    color: "var(--nc-muted)", 
                    textTransform: "uppercase", 
                    letterSpacing: "0.05em",
                    marginBottom: "0.5rem"
                  }}>
                    Phone
                  </div>
                  <div style={{ 
                    fontSize: "1rem", 
                    color: "var(--nc-ink)",
                    fontWeight: "500"
                  }}>
                    {user.phone || "Not provided"}
                  </div>
                </div>

                <div style={{
                  background: "var(--nc-cream)",
                  padding: "1.25rem",
                  borderRadius: "12px",
                  border: "1px solid var(--nc-border)"
                }}>
                  <div style={{ 
                    fontSize: "0.75rem", 
                    fontWeight: "600", 
                    color: "var(--nc-muted)", 
                    textTransform: "uppercase", 
                    letterSpacing: "0.05em",
                    marginBottom: "0.5rem"
                  }}>
                    City
                  </div>
                  <div style={{ 
                    fontSize: "1rem", 
                    color: "var(--nc-ink)",
                    fontWeight: "500"
                  }}>
                    {user.city || "Not provided"}
                  </div>
                </div>

                <div style={{
                  background: "var(--nc-cream)",
                  padding: "1.25rem",
                  borderRadius: "12px",
                  border: "1px solid var(--nc-border)"
                }}>
                  <div style={{ 
                    fontSize: "0.75rem", 
                    fontWeight: "600", 
                    color: "var(--nc-muted)", 
                    textTransform: "uppercase", 
                    letterSpacing: "0.05em",
                    marginBottom: "0.5rem"
                  }}>
                    Postal Code
                  </div>
                  <div style={{ 
                    fontSize: "1rem", 
                    color: "var(--nc-ink)",
                    fontWeight: "500"
                  }}>
                    {user.postalCode || "Not provided"}
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div style={{
                background: "var(--nc-cream)",
                padding: "1.25rem",
                borderRadius: "12px",
                border: "1px solid var(--nc-border)",
                marginBottom: "1.5rem"
              }}>
                <div style={{ 
                  fontSize: "0.75rem", 
                  fontWeight: "600", 
                  color: "var(--nc-muted)", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.05em",
                  marginBottom: "0.5rem"
                }}>
                  Address
                </div>
                <div style={{ 
                  fontSize: "1rem", 
                  color: "var(--nc-ink)",
                  fontWeight: "500"
                }}>
                  {user.address || "Not provided"}
                </div>
              </div>

              {/* Preferences Section */}
              <div style={{
                background: "linear-gradient(135deg, rgba(201, 85, 106, 0.08), rgba(212, 168, 67, 0.08))",
                padding: "1.25rem",
                borderRadius: "12px",
                border: "1px solid var(--nc-border-gold)"
              }}>
                <div style={{ 
                  fontSize: "0.75rem", 
                  fontWeight: "600", 
                  color: "var(--nc-muted)", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.05em",
                  marginBottom: "0.5rem"
                }}>
                  🎁 Gift Preferences
                </div>
                <div style={{ 
                  fontSize: "1rem", 
                  color: "var(--nc-ink)",
                  fontWeight: "500",
                  lineHeight: "1.6"
                }}>
                  {user.preferences || "No preferences set yet. Tell us about your favorite gift types, colors, and occasions!"}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: "1.25rem 2rem",
          borderTop: "1px solid var(--nc-border)",
          textAlign: "center",
          background: "var(--nc-cream)"
        }}>
          <div className="nc-auth-brand" style={{ margin: 0, padding: 0, border: "none" }}>
            🎁 Niyas Creations
          </div>
        </div>
      </div>
    </div>
  );
}
