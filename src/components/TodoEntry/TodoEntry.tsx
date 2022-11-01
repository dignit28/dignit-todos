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
  const [editIsActive, setEditIsActive] = React.useState(false);
  const [editorText, setEditorText] = React.useState("");

  // Handles controlled input
  const onCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setTodoEntries((prevTodoEntries) => {
      const updatedTodoEntries: TodoEntryInterface[] = [...prevTodoEntries];
      updatedTodoEntries[props.index].completed = event.target.checked;
      return updatedTodoEntries;
    });
  };

  // Handles controlled input
  const handleEditorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditorText(event.target.value);
  };

  // Calls completeEdit() on specific key press
  const handleEditorKeyPress = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "Esc":
      case "Escape":
      case "Enter":
        completeEdit();
        break;
    }
  };

  // Opens entry editor
  const editEntry = () => {
    setEditorText(props.content);
    setEditIsActive(true);
  };

  // Closes editor and updates entry
  const completeEdit = () => {
    setEditIsActive(false);
    props.setTodoEntries((prevTodoEntries) => {
      const updatedTodoEntries: TodoEntryInterface[] = [...prevTodoEntries];
      updatedTodoEntries[props.index].content = editorText;
      return updatedTodoEntries;
    });
    setEditorText("");
  };

  // Deletes entry
  const deleteEntry = () => {
    props.setTodoEntries((prevTodoEntries) => {
      const updatedTodoEntries: TodoEntryInterface[] = [...prevTodoEntries];
      updatedTodoEntries.splice(props.index, 1);
      return updatedTodoEntries;
    });
  };

  return (
    <li className="todos__list-item" data-testid="todo-entry">
      <input
        className="todos__checkbox"
        data-testid="todo-checkbox"
        type="checkbox"
        checked={props.completed}
        onChange={onCheckboxClick}
      ></input>
      {editIsActive ? (
        <input
          autoFocus
          data-testid="todo-editor"
          value={editorText}
          className="todos__editor"
          onChange={handleEditorChange}
          onKeyDown={handleEditorKeyPress}
          onBlur={completeEdit}
        ></input>
      ) : (
        <p
          data-testid="todo-text"
          className={"todos__todo-text" + (props.completed ? "_checked" : "")}
        >
          {props.content}
        </p>
      )}
      <button className="todos__edit-button" data-testid="todo-edit" onClick={editEntry}>
        E
      </button>
      <button className="todos__delete-button" data-testid="todo-delete" onClick={deleteEntry}>
        D
      </button>
    </li>
  );
};

export default TodoEntry;
