import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Homepage from "./pages/Homepage";


function App() {
  return (
    <div>

      <Navbar />

      <Routes>

        <Route path="/Homepage" element={<Homepage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<Profile />} />

      </Routes>

    </div>
  );
}

export default App;