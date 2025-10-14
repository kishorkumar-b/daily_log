import {useState,useEffect} from "react";
import { useNavigate,useLocation} from "react-router-dom";
import { saveCredentials, getDecryptedCredentials,clearCredentials } from "../component/Login/Authstore";

const Login = () => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate()
    const location = useLocation()


    useEffect(() => {

        if (location.pathname==="/aplication/login") {
            clearCredentials()
        }
    }, [location,navigate]);


    const handleSubmit =()=>{
        if(Username==="admin" && Password==="123"){
        saveCredentials(Username, Password);
        const credentials=getDecryptedCredentials();
        if(credentials.username===Username && credentials.password===Password){
            navigate("/home");}}
        else{
            alert("Invalid Username Password")
        }
    }
    return(
       <div className="flex justify-center items-center h-screen bg-green-50">
  <div className="bg-white p-9 rounded-lg shadow-lg flex justify-center items-center">
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <h1 className="text-center text-2xl font-semibold mb-6">Login</h1>

      <label className="block text-green-800 font-medium mb-1">Username:</label>
      <input
        type="text"
        placeholder="Username"
        required
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-3 py-2 mb-4 bg-green-50 border-b-2 border-green-500 focus:border-green-700 focus:bg-green-100 outline-none transition-colors duration-300 text-sm"
      />

      <label className="block text-green-800 font-medium mb-1">Password:</label>
      <input
        type="password"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 mb-4 bg-green-50 border-b-2 border-green-500 focus:border-green-700 focus:bg-green-100 outline-none transition-colors duration-300 text-sm"
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 mt-4 rounded hover:bg-green-700 transition-colors duration-300"
      >
        Submit
      </button>
    </form>
  </div>
</div>

    )
}


export default Login;