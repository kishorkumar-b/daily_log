import React, { useState } from 'react'

const Ratioreact = () => {
    const [select, setselect]=useState("")

    const handlechange=(e)=>{
        setselect(e.target.value)
    }
    const handlesubmit=(e)=>{
        e.preventDefault()
        alert(select)
    }
  return (
    <div>
        give the favorite fruit
        <form onSubmit={handlesubmit}>
            <label>
                <input type='radio' name='fruit' value='apple'
                onChange={handlechange} />apple
            </label>
            <label>
                <input type='radio' name='fruit' value='mango'
                onChange={handlechange} />mango
            </label>
            <label>
                <input type='radio' name='fruit' value='banana'
                onChange={handlechange} />banana
            </label>
            <button>submit</button>
        </form>
    </div>
  )
}
export default Ratioreact