import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddFuel from "./pages/AddFuel";
import ViewFuel from "./pages/ViewFuel";
import "./App.css";

function App() {
  return (
   <BrowserRouter basename="/fuel-ui">
      <div className="nav-container">
        <h1>🚗 Fuel Tracker</h1>
        <nav>
          <Link to="/" className="nav-link">Add Fuel</Link>
          <Link to="/logs" className="nav-link">View Logs</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<AddFuel />} />
        <Route path="/logs" element={<ViewFuel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
