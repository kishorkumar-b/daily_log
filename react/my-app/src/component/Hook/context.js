import React, { createContext,useContext,useState} from "react";

const userContext = createContext();

const Component1=()=>{
    const [user,setUser]=useState({name:"kishor",age:20})
    return(
        <div>
            <h1>useContext HOOK</h1>
            Component 1
            <userContext.Provider value={user}>
                <h1>hello {user.name} !!!</h1>
            <Component2/>
            </userContext.Provider>
        </div>
    )
}

const Component2=()=>{
    return(
        <div>component2
            <Component3/>
        </div>   
    )}
    
const Component3=()=>{
    const user = useContext(userContext)
    return(
        <div>component3
            {console.log(user)}
            <h1>USER INFO</h1>
            <h2>name:{user.name}</h2>
            <h2>age:{user.age}</h2>
        </div>
    )}

export default Component1;