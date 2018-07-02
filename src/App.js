import React, { Component } from 'react';
import axios from 'axios';

window.id = 0;

const Title = ({ title }) => {
    return (
      <h1>{title}</h1>
    );
}

const Todo = ({ todo, removeTodo }) => {
  return (
    <li>
      {todo.title}
      <button onClick={() => { removeTodo(todo.id) }} >X</button>
    </li>
  );
}

const TodoList = ({ todos, removeTodo }) => {
  const todoList = todos.map(todo => {
    return (<Todo todo={todo} key={todo.id} removeTodo={removeTodo} />);
  });
  return (
    <ul>
      {todoList}
    </ul>
  );
}

const TodoForm = ({ addTodo }) => {
  let input;
  return (
    <div>
      <input ref={node => { input=node; }} />
      <button onClick={() => {addTodo(input.value); input.value='';}}>+</button>
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
      <div>
        <Title title={"Todo"}/>
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList todos={this.state.todos} removeTodo={this.removeTodo.bind(this)}/>
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
    });
    this.setState({
      todos: leftTodo
    });
  }

}

export default App;
