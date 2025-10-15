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
import Sidebar from "../component/Home/SideBar/Sidebar";
import Header from "../component/Home/Header/Header";
import DataExplorer from "../component/Home/Dataexplorer/DataExplorer";


const Home = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);


  return (
     <div className="flex h-screen bg-white">
      <Sidebar onSelect={setSelectedComponent} />

      <div className="flex-1 flex flex-col">
        <Header/>
      <main className=" flex-1 overflow-y-auto">
        {selectedComponent ? (
          <div className="w-full h-full">
            {selectedComponent}
          </div>
        ) : (
          <DataExplorer/>
        )}
      </main>

      </div>
    </div>
  );
};

export default Home;





