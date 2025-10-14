import React, { useEffect, useState } from "react";

function FetchUsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error("Error:", error));
  }, []);

  console.log("Fetch user:",users)
  return (
    <div>
    <h1>Fetch example</h1>
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
    </div>
  );
}

export default FetchUsersList;
