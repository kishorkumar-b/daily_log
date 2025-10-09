import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return  state + 1 ;
    case "decrement":
      return state- 1 ;
    default:
      return state;
  }
}

function Counter() {
    
  const [state, dispatch] = useReducer(reducer, 0);

  return (
    <div>
        <h1>UseReducer Hook Example</h1>
      <h2>Count: {state}</h2>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}

export default Counter;
