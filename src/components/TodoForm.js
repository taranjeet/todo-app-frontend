import React from 'react';

import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';

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

export { TodoForm };
