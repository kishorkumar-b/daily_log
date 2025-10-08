import React from 'react'

const Son =(props) =>{
    return(
        <div>{props.children}</div>
    )
}

const Parent = () => {
  return (
    <div><h1>propeschildren</h1>
        <Son>
            <h2>son</h2>
        </Son>
    </div>
    
  )
}

export default Parent
