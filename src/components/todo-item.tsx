// Import dependencies
import * as React from "react";
import styledcom from 'styled-components'
import { styled } from "@material-ui/styles";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import CheckOutlined from "@material-ui/icons/CheckOutlined";
import EditIcon from "@material-ui/icons/Edit";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

import Card from "@material-ui/core/Card";
import InputBase from "@material-ui/core/InputBase";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// Import interfaces
import { TodoItemInterface } from "./../interfaces";


/********************************************************************************************************/


// TodoItem component
const TodoItem = (props: TodoItemInterface) => {
  const [edit, setEdit] = React.useState(false);
  const [texting, setTexting] = React.useState(props.todo.text);
  // const [editable, setEditable] = React.useState(true);

  const startEdit = () => {
    setEdit(!edit);
    if (edit) {
      props.handleTodoUpdate(texting, props.todo.id);
    }
  };

  const updateText = (text: any) => setTexting(text.target.value);

  return (
    <MyCard className='todo-item'>
      <div onClick={() => props.handleTodoComplete(props.todo.id)}>
        {props.todo.isCompleted ? (
          <span className='todo-item-checked'>
            <CheckOutlined />
          </span>
        ) : (
          <span className='todo-item-unchecked' />
        )}
      </div>

      <div className='todo-item-input-wrapper'>
        {edit ? (
          <InputBase
            className='design'
            fullWidth
            defaultValue={props.todo.text}
            onChange={updateText}
          />
        ) : (
          props.todo.isCode ? (
          <Pre className='code'>{props.todo.text}</Pre>
          ) : (<Pre>{props.todo.text}</Pre>)
        )}
      </div>
      <div className='item-edit' onClick={startEdit}>
        {edit ? <MyAssignmentTurnedInIcon /> : <MyEditIcon />}
      </div>

      <div
        className='item-remove'
        onClick={() => props.handleTodoRemove(props.todo.id)}
      >
        <MyDeleteOutlined />
      </div>
    </MyCard>
  );
};

export default TodoItem;


/********************************************************************************************************/


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    design: {
      "& > *": {
        margin: theme.spacing(1),
        width: 200
      }
    }
  })
);

const MyDeleteOutlined = styled(DeleteOutlined)({
  color: "#1abc9c"
});

const MyEditIcon = styled(EditIcon)({
  color: "#1abc9c"
});

const MyAssignmentTurnedInIcon = styled(AssignmentTurnedInIcon)({
  color: "#1abc9c"
});
const MyCard = styled(Card)({
  backgroundColor: "#daf8ca" // f5deb3
});

const Pre = styledcom.pre`
  overflow: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: Arial, Helvetica, sans-serif;
  text-align: left;
  `
