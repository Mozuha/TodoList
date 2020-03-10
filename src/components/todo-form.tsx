// Import dependencies
import * as React from "react";
import shortid from "shortid";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

// Import interfaces
import { TodoInterface, TodoFormInterface } from "./../interfaces";


/********************************************************************************************************/


// Todo form component
const TodoForm = (props: TodoFormInterface) => {
  // Create ref for form input
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  // Create form state
  const [formState, setFormState] = React.useState("");

  // Handle todo input change
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Update form state with the text from input
    setFormState(event.target.value);
  };

  // Handle 'Enter' in todo input
  const handleInputButton = () => {
    // Prepare new todo object
    const newTodo: TodoInterface = {
      id: shortid.generate(),
      text: formState,
      isCompleted: false,
      isCode: false
    };

    // Create new todo item
    props.handleTodoCreate(newTodo);

    // Reset the input field
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Handle 'Enter' in todo input
  const handleInputEnter = (event: React.KeyboardEvent) => {
    // Check for 'Enter' key
    if (event.key === "Enter") {
      // Prepare new todo object
      const newTodo: TodoInterface = {
        id: shortid.generate(),
        text: formState,
        isCompleted: false,
        isCode: false
      };

      // Create new todo item
      props.handleTodoCreate(newTodo);

      // Reset the input field
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleCodeInputButton = () => {
    // Prepare new todo object
    const newTodo: TodoInterface = {
      id: shortid.generate(),
      text: formState,
      isCompleted: false,
      isCode: true
    };

    // Create new todo item
    props.handleTodoCreate(newTodo);

    // Reset the input field
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className='todo-form'>
      <TextareaAutosize
        className='textarea'
        rowsMin={3}
        rowsMax={3}
        ref={inputRef}
        placeholder='Enter task'
        onChange={event => handleInputChange(event)}
        // onKeyPress={event => handleInputEnter(event)}
      />
      <Button className='button' onClick={() => handleInputButton()}>
        Add
      </Button>
      <Button onClick={() => handleCodeInputButton()}>
        Code
      </Button>
    </div>
  );
};

export default TodoForm;


/********************************************************************************************************/

