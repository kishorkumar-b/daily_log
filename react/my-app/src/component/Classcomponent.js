import React, { Component } from "react";

class Lifecycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Hello from Class Component!",
      count: 0
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
static getDerivedStateFromProps(props, state) {
  console.log("going to render");
  return null
  }
  shouldComponentUpdate() {
    return true;
  }

    componentDidMount() {
        console.log("rendered")
  }
  render() {
    console.log("Render: Component is rendering");
    return (
      <div style={{ textAlign: "center" }}>
        <h1>simple lifecycle</h1>
        <h2>Count: {this.state.count}</h2>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Lifecycle;
