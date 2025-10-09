import React from 'react'

const Reactlist = () => {
  
    const cars=['bmw','audi']
    const keycar=[
      {id:1,name:'bmw'},
      {id:2,name:'audi'}
      ]
  return (
    <div>  <h1>list react</h1>
        <ul>
            {cars.map((car)=><li>{car}</li>)}
        </ul>
        <h1>key list</h1>
        <ul>
            {keycar.map((car)=><li>name:{car.name}</li>)}
        </ul>
    </div>

  )
}

export default Reactlist