import {useState,useEffect} from "react";
import { useNavigate,useLocation} from "react-router-dom";
import { saveCredentials, getDecryptedCredentials,clearCredentials } from "../component/Authstore";

const Login = () => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate()
    const location = useLocation()


    useEffect(() => {

        if (location.pathname==="/login") {
            clearCredentials()
        }
    }, [location,navigate]);


    const handleSubmit =()=>{
        saveCredentials(Username, Password);
        const credentials=getDecryptedCredentials();
        if(credentials.username===Username && credentials.password===Password){
            navigate("/home");}
        else{
            alert("Invalid Username Password")
        }
    }
    return(
        <div className="Container">
            <div className="Login-Box">
                <form className="Login-Form" onSubmit={(e)=>{e.preventDefault();handleSubmit();}}>
                    <h1>Login</h1>
                    <label>Username:</label>
                    <input type="text" placeholder="Username" required onChange={(e)=>setUsername(e.target.value)}/><br/>
                    <label>Password:</label>
                    <input type="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)} /><br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}


export default Login;