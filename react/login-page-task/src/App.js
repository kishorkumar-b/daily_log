
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import ProtectRouter from './component/ProtectRouter';
import {Routes, Route,Navigate,BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
<BrowserRouter basename="/reactapp">
  <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="login" element={<Login />} />
    <Route path="home" element={<ProtectRouter><Home /></ProtectRouter>} />
  </Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
