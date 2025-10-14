/* import { useNavigate } from "react-router-dom"
import { clearCredentials } from "../component/Authstore"
const Home = ()=>{
    const navigate=useNavigate()
    const handleDelete =()=>{
        clearCredentials()
        navigate("/login", { replace: true });
    }
    return(
        <div style={{backgroundColor:"#eafaf1",display:'flex',justifyContent:"center",alignItems:"center",height:"100vh"}}>
            <div>
            <h1> Welcome to Home Page!! <br/></h1>
            
            <button 
            style={{background:"#27ae60", padding:"10px",border:"none", marginTop:"10px",marginLeft:"120px"}}
            onClick={handleDelete} 
            >Logout</button>
            </div>
        </div>
    )
}
export default Home; */

// src/App.js


import { useState } from "react";
import Sidebar from "../component/Home/Sidebar";


const Home = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);


  return (
     <div className="flex h-screen bg-blue-50">
      <Sidebar onSelect={setSelectedComponent} />

      <div className="flex-1 flex flex-col">
        {/*header*/}
        <main className="p-6 flex-1 overflow-y-auto">
          {selectedComponent || <div>Welcome! Select a menu option.</div>}
        </main>
      </div>
    </div>
  );
};

export default Home;





