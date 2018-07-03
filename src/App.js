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

window.id = 0;

const Title = ({ title }) => {
    return (
      <h1>{title}</h1>
    );
}

const Todo = ({ todo, removeTodo }) => {
  return (
    <ListGroupItem>
      <div class="row">
        <div class="col-sm-11">
          {todo.title}
        </div>
        <div class="col-sm-1">
          <Button color="danger" onClick={() => { removeTodo(todo.id) }} >X</Button>
        </div>
      </div>
    </ListGroupItem>
  );
}

const TodoList = ({ todos, removeTodo }) => {
  const todoList = todos.map(todo => {
    return (<Todo todo={todo} key={todo.id} removeTodo={removeTodo} />);
  });
  return (
    <ListGroup>
      {todoList}
    </ListGroup>
  );
}

const TodoForm = ({ addTodo }) => {
  let input;
  return (
    <div>
      <InputGroup>
        <Input innerRef={node => { input=node; }} ></Input>
        <InputGroupAddon addonType="append">
          <Button color="success" onClick={() => {addTodo(input.value); input.value='';}}>+</Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
    );
}

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
