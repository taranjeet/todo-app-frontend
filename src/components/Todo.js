import React from 'react';

import {
  Button,
  ListGroupItem
} from 'reactstrap';

const Todo = ({ todo, removeTodo }) => {
  return (
    <ListGroupItem>
      <div className="row">
        <div className="col-sm-11">
          {todo.title}
        </div>
        <div className="col-sm-1">
          <Button color="danger" onClick={() => { removeTodo(todo.id) }} >X</Button>
        </div>
      </div>
    </ListGroupItem>
  );
}

export { Todo };
