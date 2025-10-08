import React  from "react";
import { createPortal } from "react-dom";


const Portal =()=>{
    return createPortal(
        <h1 style={{color:'red'}}>this is from Portal</h1>,
        document.body
        
    )
}
export default Portal;