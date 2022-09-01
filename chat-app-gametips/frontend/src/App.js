import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//components
import SignIn from "./components/LoginForm";
import ThreadListingPage from "./components/ThreadsLanding";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/chatRooms" element={<ThreadListingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
