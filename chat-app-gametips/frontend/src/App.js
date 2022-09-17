import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//components
import HomePage from "./components/HomePage";
import ThreadListingPage from "./components/ThreadsLanding";
import SignUp from "./components/SignUp";
import Comments from "./components/CommentsSection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chatRooms" element={<ThreadListingPage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/Comments" element={<Comments />} />
      </Routes>
    </Router>
  );
}

export default App;
