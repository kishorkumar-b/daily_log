import React, { useEffect, useState } from "react";
import axios from "axios";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users", {
      timeout: 100 
    })
    .then(response => {
      setUsers(response.data);
      setMessage("Users loaded successfully!");

      setTimeout(()=>{
        setMessage("")
      },3000)
    })
    .catch(error => {
      if (error.code === "ECONNABORTED") {
        setMessage("Request timed out! Please try again.");
      } else {
        setMessage("Failed to load users.");
      }
      console.error("Error fetching users:", error);
    });
  }, []);

  return (
    <div>
      <h2>User List</h2>
       {message && <p>{message}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
