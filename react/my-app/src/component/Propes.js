import React from "react";
import styled from "styled-components";


const Headerd=styled.h1`
color:blue;
font-size:50px;`
const Props =(props)=>{
    return(
        <div>
            <Headerd>kishor</Headerd>
            <h1>props in react</h1>
            <h2>hello i am {props.name} my age is {props.age}</h2>
        </div>
    )
}

export default Props;