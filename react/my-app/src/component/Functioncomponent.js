import React,{useState} from "react";


const Functioncomponent=()=>{
    
const [count,setcount]=useState(0);
    const increment=()=>{
        setcount(count+1);
    };
    return(
        <div>
            <h1>function component</h1>
            <h2>count:{count}</h2>
            <button onClick={increment}>increment</button>
        </div>
    )
}

export default Functioncomponent;