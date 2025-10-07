import React, { Component } from "react";

class SimpleLifecycle extends Component {
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

  render() {
    console.log("Render: Component is rendering");
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Simple Lifecycle Demo</h1>
        <h2>Count: {this.state.count}</h2>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default SimpleLifecycle;
