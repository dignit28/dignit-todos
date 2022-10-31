import React from "react";
// Components
import TodoEntry from "./TodoEntry";
import TodoForm from "./TodoForm";
// Types
import { TodoEntryInterface } from "../utility/interfaces";

const TodoList = () => {
  const [todoEntries, setTodoEntries] = React.useState<TodoEntryInterface[]>(
    []
  );

  const todoEntriesElements = todoEntries.map((todoEntry) => {
    return <TodoEntry />;
  });

  return (
    <main>
      <TodoForm />
      {todoEntriesElements}
    </main>
  );
};

export default TodoList;
