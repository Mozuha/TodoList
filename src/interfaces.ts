// Todo object interface
export interface TodoInterface {
  id: string;
  text: string;
  isCompleted: boolean;
  isCode: boolean;
}

// Todo form interface
export interface TodoFormInterface {
  todos: TodoInterface[];
  handleTodoCreate: (todo: TodoInterface) => void;
}

// Todo list interface
export interface TodoListInterface {
  handleTodoUpdate: (text: string, id: string) => void;
  handleTodoRemove: (id: string) => void;
  handleTodoComplete: (id: string) => void;
  handleTodoBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  todos: TodoInterface[];
}

// Todo item interface
export interface TodoItemInterface {
  handleTodoUpdate: (text: string, id: string) => void;
  handleTodoRemove: (id: string) => void;
  handleTodoComplete: (id: string) => void;
  handleTodoBlur: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  todo: TodoInterface;
}
