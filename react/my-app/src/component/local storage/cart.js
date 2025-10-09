import React, { use, useEffect } from "react";
import { useState } from "react";



const Cart =()=>{
    const [Cart,setCart]=useState(JSON.parse(localStorage.getItem("cart")))
    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(Cart))
    },[Cart])
    const addItem=()=>{
        const newItem={id:Date.now(),name:"product",price:Math.floor(Math.random()*100)}
        setCart([...Cart,newItem])
    }
    const clear=()=>{
        setCart([])
        localStorage.removeItem("cart")
    }
    return(
        <div>
            <h1>This is Cart Page</h1>
            <button onClick={addItem}>Add Cart</button>
            <button onClick={clear}>clear</button>
            <h2>cart:</h2>
            {Cart.lemgth===0 && <div>cart is empty</div>}
            <ul>
                {Cart.map((item,index)=>(
                    <li key={index}>
                        {item.name} - ${item.price}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Cart;