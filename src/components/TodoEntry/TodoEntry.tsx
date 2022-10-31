import React from "react";
// Styles
import "./TodoEntry.css";
// Types
import { TodoEntryInterface } from "../../utility/interfaces";

interface TodoEntryProps {
  content: string;
  completed: boolean;
  index: number;
  setTodoEntries: React.Dispatch<React.SetStateAction<TodoEntryInterface[]>>;
}

const TodoEntry: React.FunctionComponent<TodoEntryProps> = (props) => {
  // Handles controlled input
  const onCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setTodoEntries((prevTodoEntries) => {
      const updatedTodoEntries: TodoEntryInterface[] = [...prevTodoEntries];
      updatedTodoEntries[props.index].completed = event.target.checked;
      return updatedTodoEntries;
    });
  };

  return (
    <li data-testid="todo-entry">
      <input
        data-testid="todo-checkbox"
        type="checkbox"
        checked={props.completed}
        onChange={onCheckboxClick}
      ></input>
      <p
        data-testid="todo-text"
        className={"todo-entry__text" + (props.completed ? "_checked" : "")}
      >
        {props.content}
      </p>
    </li>
  );
};

export default TodoEntry;
