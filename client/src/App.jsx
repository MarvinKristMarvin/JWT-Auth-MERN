import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
// toaster is a popup library to handle form input errors
import { Toaster } from "react-hot-toast";

// write once the back url for axios requests
axios.defaults.baseURL = "http://localhost:8000";
// include cookies in requests
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
