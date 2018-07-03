import React from 'react';

import { ListGroup } from 'reactstrap';

import { Todo } from './Todo';

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

export { TodoList };
