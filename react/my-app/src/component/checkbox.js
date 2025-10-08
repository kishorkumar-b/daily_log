import React, { useState } from "react";

const Checkbox = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setChecked(e.target.checked); // ✅ fixed typos
  };

  return (
    <div>
      <h1>Checkbox</h1>
      <label>
        <input type="checkbox" checked={checked} onChange={handleChange} /> Accept
      </label>
      <p>{checked ? "Checked ✅" : "Not checked ❌"}</p>
    </div>
  );
};

export default Checkbox;
