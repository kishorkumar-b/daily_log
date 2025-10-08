import React, { useState } from 'react'

const Formreact = () => {
    const [name,setname]=useState("")
    const handelchange=(e)=>{
        setname(e.target.value)
    }
    const handlesubmit=(e)=>{
        e.preventDefault();
        alert(name)
    }
  return (

    <div>
        <form onSubmit={handlesubmit}>
            <lable>enter name:
                <input type="text"

                value={name}
                onChange={handelchange}/>
            </lable>
            <input type='submit'/>  {/* or <button type='submit'>submit</button> */}
        </form>
        <p>name:{name}</p>
    </div>
  )
}


export default Formreact