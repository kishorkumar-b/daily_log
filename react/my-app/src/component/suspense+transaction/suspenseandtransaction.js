import React, { useState, useTransition, Suspense, lazy } from "react";

const About = lazy(() => import("./about"));
const fruits = [
  "Apple",
  "Banana",
  "Orange",
  "Mango",
  "Pineapple",
  "Strawberry",
  "Grapes",
  "Blueberry",
  "Watermelon",
  "Peach",
  "Kiwi",
  "Papaya",
  "Cherry",
  "Lemon",
  "Pear"
];

function Sespensetrans() {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

const handleChange = (e) => {
  const value = e.target.value;
  setText(value);

  startTransition(() => {
    const filteredResults = fruits.filter(fruit =>
      fruit.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filteredResults);
  });
};


  return (
    <div>
      <hr />
      <h1>Suspense + Transition Example</h1>

      {/* Suspense example */}
      <Suspense fallback={<p>Loading About Component...</p>}>
        <About />
      </Suspense>



      {/* Transition example */}
      <input
        value={text}
        onChange={handleChange}
        placeholder="Type something..."
      />
      {isPending ? (
        <p>Loading results...</p>
      ) : (
        <ul>
         {results.map((fruit, i) => (
        <li key={i}>{fruit}</li>
            ))}
        </ul>

      )}
      <hr />
    </div>
  );
}

export default Sespensetrans;
