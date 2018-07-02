import React, { Component } from 'react';

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
    const todo = { title: value, id: window.id++ };
    this.state.todos.push(todo);
    this.setState({
      todos: this.state.todos
    })
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
