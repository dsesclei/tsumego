import React, { Component } from 'react';
import $ from 'jquery';

class App extends Component {
  state = {
    color: 'green',
  }

  fetchRandomColor = () => {
    $.ajax('/random_color').done(data => this.setState({ color: data.color }));
  }

  render() {
    return (
      <div style={{ border: '5px solid', borderColor: this.state.color }}>
        <Counter />
        <div><button onClick={this.fetchRandomColor}>Change border color</button></div>
      </div>
    );
  }
}

class Counter extends Component {
  state = {
    value: 0,
  }

  increment = () => {
    this.setState(prevState => {
      return { value: prevState.value + 1 };
    });
  }

  decrement = () => {
    this.setState(prevState => {
      return { value: prevState.value - 1 };
    });
  }

  render() {
    return (
      <div>
        <div>Current counter: {this.state.value}</div>
        <button onClick={this.increment}>+1</button>
        <button onClick={this.decrement}>-1</button>
      </div>
    );
  }
}

export default App;