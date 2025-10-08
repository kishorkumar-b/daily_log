import React from "react";
import { useState, useEffect } from "react";
const UseEffectHook = () => {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);

/*   useEffect(()=>{
    setTimeout(()=>{
        setCount(count+1)
    },300)

  },[]) */
  useEffect(()=>{
    setCalculation(count*2)
  },[count])

  return(
    <div>
    {/* <h1>count: {count}</h1> */}
    <h2>calculation:{calculation}</h2>
    <button onClick={()=>{setCount(count+1)}}>+</button>
    </div>
  )
}
export default UseEffectHook;