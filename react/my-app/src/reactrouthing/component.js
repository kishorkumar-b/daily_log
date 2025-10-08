import React from "react";
import { Link,Outlet} from "react-router-dom";

export const Home=()=>{
    return(
        <h1>this is home page</h1>
    )
}

export const About=()=>{
    return(
        <div>
        <h1>this is about page</h1>
        <nav>
            <Link to="team">Team</Link>
            <Link to="company">Company</Link>

        </nav>
        <Outlet />
        </div>
    )
}
export const Contact=()=>{
    return(
        <h1>this is contact page</h1>
    )
}
export const Team=()=>{
    return(
        <h1>this is team page</h1>
    )
}
export const Company=()=>{
    return(
        <h1>this is company page</h1>
    )
}