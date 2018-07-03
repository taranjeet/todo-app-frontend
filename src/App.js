import React, { Component } from 'react';
import axios from 'axios';
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

import {
  Title,
  Todo,
  TodoList,
  TodoForm
} from './components';


window.id = 0;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    this.apiUrl = 'http://localhost:8003/simple'
  }

  componentDidMount() {
    axios.get(`${this.apiUrl}?format=json`)
      .then(response => {
        this.setState({ todos: response.data });
      })
  }

  render() {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-8 offset-sm-2">
            <Title title={"Todo"}/>
            <hr/>
            <TodoForm addTodo={this.addTodo.bind(this)}/>
            <hr/>
            <TodoList todos={this.state.todos} removeTodo={this.removeTodo.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }

  addTodo(value) {
    const todo = { title: value };
    axios.post(`${this.apiUrl}/`, todo)
      .then(response => {
        this.state.todos.push(response.data);
        this.setState({
          todos: this.state.todos
        });
      });
  }

  removeTodo(id) {
    const leftTodo = this.state.todos.filter(todo => {
      if(todo.id !== id) { return true };
      return false;
    });
    axios.delete(`${this.apiUrl}/${id}`)
      .then(response => {
        this.setState({
          todos: leftTodo
        });
      });
  }

}

export default App;
