import { useState, useTransition } from 'react';

function SearchBar() {
  const [text, setText] = useState('');
  const [results, setResults] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setText(e.target.value);

    startTransition(() => {
      setResults(e.target.value);
    });
  };

  return (
    <div>
        <h1>Transition</h1>
      <input value={text} onChange={handleChange} />
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <p>Search results for: {results}</p>
      )}
    </div>
  );
}
export default SearchBar;