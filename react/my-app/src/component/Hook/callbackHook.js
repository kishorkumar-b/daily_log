/* import React, { useState, useCallback } from "react"; */

/* const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click me</button>;
});

function CallbackHook() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    console.log("callback rendered")
    setCount(c=> c+1);
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <Child onClick={increment} />
    </div>
  );
}
export default CallbackHook; */

import React, { useState, useCallback } from "react";

const Child = ({ name, onClick }) => {
  console.log("Child "); 
  return (
    <div>
      <p>Child name: {name}</p>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
}

function Parent() {
  const [count, setCount] = useState(0);
  const [childName, setChildName] = useState("John");
console.log("parent")

  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <div>
      <h1>Parent Count: {count}</h1>
      <button onClick={() => setChildName(childName === "John" ? "Jane" : "John")}>
        Change Child Name
      </button>

      <Child name={childName} onClick={increment} />
    </div>
  );
}

export default Parent;
