import React, { useState } from "react";
import axios from "axios";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com",
})
  const handleSubmit = async(e) => {
    e.preventDefault();


  try {
    const response = await api.post("/users", { name, email });
    const getname= await api.get("/users",{})
    console.log("get data from async: ", getname)
    console.log("User added:", response.data);
    setMessage("User added successfully!");

    setTimeout(() => {
      setMessage("");
      setEmail("");
      setName("");
    }, 3000);

axios.post(
  "https://jsonplaceholder.typicode.com/users",  // URL
  { name: "John", email: "john@mail.com" },      // Data to send
  { headers: { "Content-Type": "application/json" } } // Config (headers)
)
.then(response => console.log("POST retrieval:", response.data))
.catch(error => console.error(error));
 // returns the created user


  } catch (error) {
    console.error("Error adding user:", error);
    setMessage("Failed to add user.");
  }


  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddUser;
