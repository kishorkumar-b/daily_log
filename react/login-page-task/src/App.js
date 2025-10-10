
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import ProtectRouter from './component/ProtectRouter';
import {Routes, Route,Navigate,BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
{/*       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/aplication/login"/>} />
          <Route path='/aplication'>
          <Route path="login" element={<Login />} />
            <Route path="home" element={<ProtectRouter><Home/></ProtectRouter> }/>
          </Route>
        </Routes>
      </BrowserRouter> */}
    <div className="flex items-center justify-center h-screen bg-blue-500 text-white">
      <h1 className="text-4xl font-bold">Tailwind is working!</h1>
    </div>
    </div>
  );
}

export default App;
