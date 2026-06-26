import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/verifyotp";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import GiftPage from "./pages/GiftPage";
import ContactPage from "./pages/ContactPage";
import AboutPage  from "./pages/AboutPage"

function App() {
  return (
    <div>

      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/gift" element={<GiftPage />} />

        <Route path="/contact" element={<ContactPage />} />

        <Route path="/about" element={<AboutPage />} />
      </Routes>

    </div>
  );
}

export default App;
