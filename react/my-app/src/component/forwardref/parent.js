import React, { useRef } from "react";
import MyInput from "./child";

function Forref() {
  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus(); // directly focus the input
  };

  return (
    <div>
        <h1>Forref</h1>
      <MyInput ref={inputRef} placeholder="Type something..." />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

export default Forref;
