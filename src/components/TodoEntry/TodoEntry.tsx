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

  const handleEditorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditorText(event.target.value);
  };

  const handleEditorKeyPress = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "Esc":
      case "Escape":
      case "Enter":
        completeEdit();
        break;
    }
  };

  const editEntry = () => {
    setEditorText(props.content);
    setEditIsActive(true);
  };

  const completeEdit = () => {
    setEditIsActive(false);
    props.setTodoEntries((prevTodoEntries) => {
      const updatedTodoEntries: TodoEntryInterface[] = [...prevTodoEntries];
      updatedTodoEntries[props.index].content = editorText;
      return updatedTodoEntries;
    });
    setEditorText("");
  };

  const deleteEntry = () => {
    console.log("Delete " + props.index);
  };

  return (
    <li data-testid="todo-entry">
      <input
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
          className="todo-edit"
          onChange={handleEditorChange}
          onKeyDown={handleEditorKeyPress}
          onBlur={completeEdit}
        ></input>
      ) : (
        <p
          data-testid="todo-text"
          className={"todo-entry__text" + (props.completed ? "_checked" : "")}
        >
          {props.content}
        </p>
      )}
      <button data-testid="todo-edit" onClick={editEntry}>
        E
      </button>
      <button onClick={deleteEntry}>D</button>
    </li>
  );
};

export default TodoEntry;
