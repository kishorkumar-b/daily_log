import React, { useEffect, useState } from "react";
import api from "../Backendcall";
//import
function ViewFuel() {
  const [fuelLogs, setFuelLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    //const res = await api.get("/fuel/logs");
    const res = await api.get("/fuel/logs");
    console.log(res.data);
    setFuelLogs(res.data);
  };

  return (
    <div className="page-container">
      <h2>Fuel Logs</h2>
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
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.vehicle_no}</td>
              <td>{log.liters}</td>
              <td>₹{log.price}</td>
              <td>
                {log.log_date && !isNaN(new Date(log.log_date))
                  ? new Date(log.log_date).toLocaleDateString()
                  : log.log_date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewFuel;
