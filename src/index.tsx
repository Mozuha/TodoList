// Import dependencies
import * as React from "react";
import { render } from "react-dom";

// Import components
import TodoForm from "./components/todo-form";
import TodoList from "./components/todo-list";

// Import interfaces
import { TodoInterface } from "./interfaces";

// Import styles
import "./styles/styles.css";
import Logo from "./logo.svg";
import styled from "styled-components";

//import App from './components/App'
//import * as serviceWorker from './serviceWorker'

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister()

import firebase from "firebase";
import "firebase/firestore";

/********************************************************************************************************/

var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: "todolist-ebad1",
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// TodoListApp component
const TodoListApp = () => {
  const [todos, setTodos] = React.useState<TodoInterface[]>([]);

  // determine loading status
  const [isLoading, setIsLoading] = React.useState(true);
  // monitor todo changing
  const [isChangedTodo, setIsChangedTodo] = React.useState(false);
  const db = firebase.firestore();

  // load the data from the database
  React.useEffect(() => {
    (async () => {
      const resTodo = await db
        .collection("todoList")
        .doc("todo")
        .get();
      setTodos(resTodo.data()!.tasks);
      setIsLoading(false);
    })();
  }, [db]);

  // update the data in the database
  React.useEffect(() => {
    if (isChangedTodo) {
      (async () => {
        setIsLoading(true);
        const docRef = await db.collection("todoList").doc("todo");
        docRef.update({ tasks: todos });
        setIsLoading(false);
      })();
    }
  }, [todos, isChangedTodo, db]);

  // Creating new todo item
  const handleTodoCreate = async (todo: TodoInterface) => {
    // Prepare new todos state
    const newTodosState: TodoInterface[] = [...todos];

    // Update new todos state
    newTodosState.push(todo);

    // Update todos state
    setTodos(newTodosState);
    setIsChangedTodo(true);
  };

  // Update existing todo item
  const handleTodoUpdate = async (text: string, id: string) => {
    // Prepare new todos state
    const newTodosState: TodoInterface[] = [...todos];

    // Find correct todo item to update
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.text = text;

    // Update todos state
    setTodos(newTodosState);

    setIsChangedTodo(true);
  };

  // Remove existing todo item
  const handleTodoRemove = (id: string) => {
    // Prepare new todos state
    const newTodosState: TodoInterface[] = todos.filter(
      (todo: TodoInterface) => todo.id !== id
    );

    // Update todos state
    setTodos(newTodosState);

    setIsChangedTodo(true);
  };

  // Check existing todo item as completed
  const handleTodoComplete = (id: string) => {
    // Copy current todos state
    const newTodosState: TodoInterface[] = [...todos];

    // Find the correct todo item and update its 'isCompleted' key
    newTodosState.find(
      (todo: TodoInterface) => todo.id === id
    )!.isCompleted = !newTodosState.find(
      (todo: TodoInterface) => todo.id === id
    )!.isCompleted;

    // Update todos state
    setTodos(newTodosState);

    setIsChangedTodo(true);
  };

  // Check if todo item has title
  const handleTodoBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      event.target.classList.add("todo-input-error");
    } else {
      event.target.classList.remove("todo-input-error");
    }
  };

  return (
    <Body className='todo-list-app'>
      <h1 className='title'>Todo App</h1>
      {/* Todo from component */}
      <TodoForm todos={todos} handleTodoCreate={handleTodoCreate} />

      {isLoading ? (
        <img className='loading' src={Logo} alt='Loading' />
      ) : (
        // Todo list component
        <TodoList
          todos={todos}
          handleTodoUpdate={handleTodoUpdate}
          handleTodoRemove={handleTodoRemove}
          handleTodoComplete={handleTodoComplete}
          handleTodoBlur={handleTodoBlur}
        />
      )}
    </Body>
  );
};

/********************************************************************************************************/

const Body = styled.body`
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #caf1f8; //b3caf5
  font-size: 15px;
  color: #414040;
`;

/********************************************************************************************************/

// Render the App in the DOM
const rootElement = document.getElementById("root");
render(<TodoListApp />, rootElement);
