import { Navigate } from "react-router-dom";

const ProtectRouter =({children})=>{

    const isLogin=sessionStorage.getItem("login")==='true';

    return isLogin ? children : <Navigate to="/aplication/login" replace/>
 
}
export default ProtectRouter