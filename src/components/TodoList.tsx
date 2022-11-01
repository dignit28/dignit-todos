import React from "react";
import { v4 as uuidv4 } from "uuid";
// Components
import TodoEntry from "./TodoEntry/TodoEntry";
import TodoForm from "./TodoForm";
// Types
import { TodoEntryInterface } from "../utility/interfaces";
import { ViewMode } from "../utility/enums";

interface TodoListProps {
  defaultTodoEntries: TodoEntryInterface[];
}

const TodoList: React.FunctionComponent<TodoListProps> = (props) => {
  const [todoEntries, setTodoEntries] = React.useState<TodoEntryInterface[]>(
    props.defaultTodoEntries
  );

  const [viewMode, setViewMode] = React.useState<ViewMode>(ViewMode.ALL);

  // Create list of todo entries from state
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

  const activeTodosAmount: number = todoEntries.reduce(
    (totalActive: number, entry: TodoEntryInterface) => {
      return entry.completed ? totalActive : ++totalActive;
    },
    0
  );

  return (
    <main>
      <TodoForm setTodoEntries={setTodoEntries} />
      <ul data-testid="todo-list">{todoEntriesElements}</ul>
      <span data-testid="active-amount-text">{activeTodosAmount} items left</span>
      <button>All</button>
      <button>Active</button>
      <button>Completed</button>
    </main>
  );
};

export default TodoList;
