import React, { Component } from 'react';

const Title = ({ title }) => {
    return (
      <h1>{title}</h1>
    );
}

class App extends Component {
  render() {
    return (
      <Title title={"Todo"}/>
    );
  }
}

export default App;
