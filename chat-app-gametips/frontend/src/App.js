import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//components
import HomePage from "./components/HomePage";
import ThreadListingPage from "./components/ThreadsLanding";
import Comments from "./components/CommentsSection";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#EEE8AA",
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chatRooms" element={<ThreadListingPage />} />
          <Route path="/Comments/:id" element={<Comments />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
