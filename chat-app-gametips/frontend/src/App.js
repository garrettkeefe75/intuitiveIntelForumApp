import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//components
import SignIn from "./components/LoginForm";
import ThreadListingPage from "./components/ThreadsLanding";
import Comments from "./components/CommentsSection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/chatRooms" element={<ThreadListingPage />} />
        <Route path="/Comments" element={<Comments />} />
      </Routes>
    </Router>
  );
}

export default App;
