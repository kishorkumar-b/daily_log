import React from "react";
import Login from "./Pages/Login";
import { useState } from "react";
function App() {
  const [user, setUser] = useState(null);
  return (
      user ? <h1>dashbord</h1> : <Login setUser={setUser} />
  );
}

export default App;
