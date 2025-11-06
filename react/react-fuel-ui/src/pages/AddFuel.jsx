import React, { useState } from "react";
import api from "../Backendcall";
//import axios from "axios";

function AddFuel() {
  const [vehicleNo, setVehicleNo] = useState("");
  const [liters, setLiters] = useState("");
  const [price, setPrice] = useState("");


  const handleAdd = async () => {
    //await api.post("/fuel/add", null, {
    await api.post("/fuel/add", null, {
      params: {
        vehicleNo,
        liters,
        price,
        date: new Date().toISOString().split("T")[0],

      },
    });
    alert("Fuel log added successfully!");
    setVehicleNo("");
    setLiters("");
    setPrice("");
  };

  return (
    <div className="page-container">
      <h2>Add Fuel Log</h2>
      <input
        placeholder="Vehicle No"
        value={vehicleNo}
        onChange={(e) => setVehicleNo(e.target.value)}
      />
      <input
        placeholder="Litres"
        type="number"
        value={liters}
        onChange={(e) => setLiters(e.target.value)}
      />
      <input
        placeholder="Cost"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleAdd}>Add Log</button>
    </div>
  );
}

export default AddFuel;
