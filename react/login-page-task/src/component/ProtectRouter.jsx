import { Navigate } from "react-router-dom";

const ProtectRouter =({children})=>{

    const isLogin=sessionStorage.getItem("login")==='true';

    return isLogin ? children : <Navigate to="/login" replace/>
 
}
export default ProtectRouter