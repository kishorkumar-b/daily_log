import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:8080/students");
    setStudents(res.data);
  };

  const addStudent = async () => {
    await axios.post("http://localhost:8080/students", { name, course });
    setName("");
    setCourse("");
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>🎓 Student Management</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />{" "}
      <input
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />{" "}
      <button onClick={addStudent}>Add</button>

      <ul>
        {students.map((s, index) => (
          <li key={index}>
            {s.name} - {s.course}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
