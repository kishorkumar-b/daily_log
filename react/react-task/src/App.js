import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import NewPassword from "./Pages/NewPassword";
import Home from "./Pages/Home";

function App() {
  const [user, setUser] = useState(null);
  const [pendingUser, setPendingUser] = useState(null);

  // 1️⃣ Pending user must set password first
  if (pendingUser) {
    return (
      <NewPassword
        pendingUser={pendingUser}
        setPendingUser={setPendingUser}
      />
    );
  }

  return (
    <Router>
      <Routes>
        {/* 2️⃣ Public routes */}
        <Route
          path="/"
          element={
            !user ? (
              <Login setUser={setUser} setPendingUser={setPendingUser} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route path="/register" element={<Register />} />

        {/* 3️⃣ Protected route: Home */}
        <Route
          path="/home"
          element={user ? <Home user={user} setUser={setUser} /> : <Navigate to="/" />}
        />

        {/* 4️⃣ Catch-all redirect to login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
