import { useEffect, useState } from "react"


const Localstorage = () => {
    const [name,setName]=useState(localStorage.getItem("name") || "");

    const handleclear=()=>{
        setName("")
        localStorage.removeItem('name')
    }
    useEffect(()=>{
        localStorage.setItem("name",name)
    },[name])

  return (
    <div>
        <h1>Localstorage</h1>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        <h2>{name}</h2>
        <button onClick={handleclear}>Clear</button>
    </div>
  )
}
export default Localstorage
