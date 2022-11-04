import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//components
import HomePage from "./components/HomePage";
import ThreadListingPage from "./components/ThreadsLanding";
import Comments from "./components/CommentsSection";
import SignUp from "./components/SignUp";
import TipsComponent from "./components/TipCardComponent";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div>
      <Helmet>
        <style>{"body { background-color: 	#ffb3b3; }"}</style>
      </Helmet>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chatRooms" element={<ThreadListingPage />} />
          <Route path="/Comments/:id" element={<Comments />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/Tips" element={<TipsComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
