import React, { Component } from 'react';

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
    return (<Todo todo={todo} />);
  });
  return (
    <ul>
      {todoList}
    </ul>
  );
}

const TodoForm = () => {
  let input;
  return (
    <div>
      <input ref={node => { input=node; }} />
      <button >+</button>
    </div>
    );
}

class App extends Component {

  render() {
    const todos = [{title: 'Todo 1'}, {title: 'Todo 2'}, {title: 'Todo 3'}]
    return (
      <div>
        <Title title={"Todo"}/>
        <TodoForm />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
