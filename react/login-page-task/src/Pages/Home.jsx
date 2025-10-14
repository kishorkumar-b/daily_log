import { useNavigate } from "react-router-dom"
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
export default Home;


