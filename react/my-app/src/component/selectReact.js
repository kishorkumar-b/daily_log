import React, { useState } from 'react'

const SelectReact = () => {
    const [car,setcar]=useState()
  return (
    <div><h1>selectReact</h1>
    <select value={car} onChange={(e)=>setcar(e.target.value)}>
        <option value="ford">ford</option>
        <option value="bmw" selected>bmw</option>
        <option value="audi">audi</option>
    </select>
    </div>
  )
}

export default SelectReact
