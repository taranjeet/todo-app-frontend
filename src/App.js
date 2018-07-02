import React, { Component } from 'react';

window.id = 0;

const Title = ({ title }) => {
    return (
      <h1>{title}</h1>
    );
}

const Todo = ({ todo }) => {
  return (
    <li>{todo.title}</li>
  );
}

const TodoList = ({ todos }) => {
  const todoList = todos.map(todo => {
    return (<Todo todo={todo} key={todo.id}/>);
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
        <TodoList todos={this.state.todos} />
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

}

export default App;
