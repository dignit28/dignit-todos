import React from "react";
import { v4 as uuidv4 } from "uuid";
// Components
import TodoEntry from "./TodoEntry";
import TodoForm from "./TodoForm";
// Types
import { TodoEntryInterface } from "../utility/interfaces";
// Data
import { defaultTodoEntries } from "../defaults/defaultData";

const TodoList = () => {
  const [todoEntries, setTodoEntries] =
    React.useState<TodoEntryInterface[]>(defaultTodoEntries);
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
