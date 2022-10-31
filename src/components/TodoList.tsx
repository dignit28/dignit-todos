import React from "react";
import { v4 as uuidv4 } from "uuid";
// Components
import TodoEntry from "./TodoEntry";
import TodoForm from "./TodoForm";
// Types
import { TodoEntryInterface } from "../utility/interfaces";

interface TodoListProps {
  defaultTodoEntries: TodoEntryInterface[];
}

const TodoList: React.FunctionComponent<TodoListProps> = (props) => {
  const [todoEntries, setTodoEntries] = React.useState<TodoEntryInterface[]>(
    props.defaultTodoEntries
  );

  const todoEntriesElements = todoEntries.map((todoEntry, index) => {
    return (
      <TodoEntry
        key={uuidv4()}
        content={todoEntry.content}
        completed={todoEntry.completed}
        index={index}
        setTodoEntries={setTodoEntries}
      />
    );
  });

  return (
    <main>
      <TodoForm />
      <ul>{todoEntriesElements}</ul>
    </main>
  );
};

export default TodoList;
