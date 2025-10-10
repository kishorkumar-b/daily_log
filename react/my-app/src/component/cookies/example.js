import React, { useState, useEffect } from "react";

const Cookieexamp=()=> {
  const [name, setName] = useState("");

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const nameCookie = cookies.find(row => row.startsWith("name="));
    if (nameCookie) {
      setName(nameCookie.split("=")[1]);
    }
  },[]);

  const saveCookie = () => {
    document.cookie = `name=${name}; path=/; max-age=${60 * 60 * 24}`;
    alert("Cookie saved!");
  };
  const deleteCookie = () => {
    document.cookie="name=; path=/;max-age=0"
  }

  return (
    <div >
      <h1>Simple Cookie Example</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={saveCookie}>Save Cookie</button>
      <button onClick={deleteCookie}>Delete Cookie</button>
      <h2>Your Name from Cookie: {name}</h2>
    </div>
  );
}

export default Cookieexamp;