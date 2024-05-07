import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroPage from "./pages/Intro/IntroPage";
import Champ from "./pages/Champ/Champ";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/champ/:champId" element={<Champ />} />
      </Routes>
    </Router>
  );
}

export default App;
