import React from "react";
import Child from "./chilld";

const Parentclass = () => {
    const [state1,setState1]=React.useState('black')
    const handlemessage=(e)=>{
        debugger
        alert("message from parent")
        setState1(e)
    }

    return(
        <div>
            <h1>eventemitor</h1>
            <Child onMessage={handlemessage}/>
            <div style={{width:"100px",height:"100px",backgroundColor:state1}}>
            </div>
        </div>      
    )
}
export default Parentclass