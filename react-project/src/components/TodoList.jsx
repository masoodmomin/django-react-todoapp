import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import TodoItem from "./TodoItem";

const TodoList = (props) => {
  return (
    <div className="lead">
      <ListGroup variant="flush">
        {props.filteredTodos.map((todo) => (
          <TodoItem
            setTodos={props.setTodos}
            todos={props.todos}
            todo={todo}
            text={todo.text}
            completed={todo.completed}
            key={todo.id}
          />
        ))}
      </ListGroup>
    </div>
  );
};

export default TodoList;
