// Import dependencies
import * as React from "react";

// Import TodoItem
import TodoItem from "./todo-item";

// Import interfaces
import { TodoListInterface } from "./../interfaces";

// TodoList component
const TodoList = (props: TodoListInterface) => {
  return (
    <div className="block">
      <div className="todo-list">
        <ul>
          <div className="subtitle">In-Progress</div>
          {props.todos
            .filter(todo => !todo.isCompleted)
            .map(todo => (
              <li key={todo.id}>
                <TodoItem
                  todo={todo}
                  handleTodoUpdate={props.handleTodoUpdate}
                  handleTodoRemove={props.handleTodoRemove}
                  handleTodoComplete={props.handleTodoComplete}
                  handleTodoBlur={props.handleTodoBlur}
                />
              </li>
            ))}
        </ul>
      </div>
      <div className="completed-list">
        <div className="subtitle">Completed</div>
        <ul>
          {props.todos
            .filter(todo => todo.isCompleted)
            .map(todo => (
              <li key={todo.id}>
                <TodoItem
                  todo={todo}
                  handleTodoUpdate={props.handleTodoUpdate}
                  handleTodoRemove={props.handleTodoRemove}
                  handleTodoComplete={props.handleTodoComplete}
                  handleTodoBlur={props.handleTodoBlur}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
