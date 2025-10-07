import React from "react";

class Propsclass extends React.Component{
    render(){
        return (
            <div>
                <h1 className="myclass">Props in Classcomponent</h1>
                <h2>sum: {(this.props.a)>5?this.props.a+this.props.b:"error"}</h2>
            </div>
        )
    }
}

export default Propsclass