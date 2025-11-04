import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // ✅ Import the CSS file

function App() {
  const [vehicleNo, setVehicleNo] = useState("");
  const [litres, setLitres] = useState("");
  const [cost, setCost] = useState("");
  const [fuelLogs, setFuelLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const res = await axios.get("http://localhost:8081/fuel/all");
    setFuelLogs(res.data);
  };

  const handleAdd = async () => {
    await axios.post("http://localhost:8081/fuel/add", null, {
      params: { vehicleNo, litres, cost },
    });
    fetchLogs();
    setVehicleNo("");
    setLitres("");
    setCost("");
  };

  return (
    <div className="app-container">
      <h2 className="title">🚗 Vehicle Fuel Tracker</h2>

      <div className="form-section">
        <input
          placeholder="Vehicle No"
          value={vehicleNo}
          onChange={(e) => setVehicleNo(e.target.value)}
        />
        <input
          placeholder="Litres"
          type="number"
          value={litres}
          onChange={(e) => setLitres(e.target.value)}
        />
        <input
          placeholder="Cost"
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <button onClick={handleAdd}>Add Log</button>
      </div>

      <h3 className="subtitle">⛽ Fuel Logs</h3>

      <table className="fuel-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vehicle</th>
            <th>Litres</th>
            <th>Cost</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {fuelLogs.map((log) => (
            <tr key={log.id} className="table-row">
              <td>{log.id}</td>
              <td>{log.vehicle_no}</td>
              <td>{log.litres}</td>
              <td>₹{log.cost}</td>
              <td>{new Date(log.log_date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
