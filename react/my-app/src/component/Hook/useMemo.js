import React, { useState, useMemo } from "react";

function Usemamo() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  // Memoize the addition
  const sum = useMemo(() => {
    console.log("Calculating sum...");
    return a+b
  },[a,b])
  return (
    <div>
      <h1>Sum: {sum}</h1>

      <input
        type="number"
        value={a}
        onChange={(e) => setA(Number(e.target.value))}
        placeholder="Enter first number"
      />

      <input
        type="number"
        value={b}
        onChange={(e) => setB(Number(e.target.value))}
        placeholder="Enter second number"
      />
    </div>
  );
}

export default Usemamo;

