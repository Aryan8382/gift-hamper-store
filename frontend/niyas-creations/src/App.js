import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/verifyotp";
import ResetPassword from "./pages/ResetPassword";

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

    
      </Routes>

    </div>
  );
}

export default App;
