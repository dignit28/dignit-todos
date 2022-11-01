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

interface ButtonData {
  value: string;
  mode: ViewMode;
}

const TodoList: React.FunctionComponent<TodoListProps> = (props) => {
  const [todoEntries, setTodoEntries] = React.useState<TodoEntryInterface[]>(
    props.defaultTodoEntries
  );

  const [viewMode, setViewMode] = React.useState<ViewMode>(ViewMode.ALL);

  // Set view mode
  const switchViewMode = (mode: ViewMode): void => {
    setViewMode(mode);
  };

  // Create list of todo entries from state
  const todoEntriesElements = todoEntries.map((todoEntry, index) => {
    if (
      (todoEntry.completed && viewMode === ViewMode.ACTIVE) ||
      (!todoEntry.completed && viewMode === ViewMode.COMPLETED)
    )
      return;
    // else
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

  // Count uncompleted todos
  const activeTodosAmount: number = todoEntries.reduce(
    (totalActive: number, entry: TodoEntryInterface) => {
      return entry.completed ? totalActive : ++totalActive;
    },
    0
  );

  // Button data for button elements
  const buttonData: ButtonData[] = [
    { value: "All", mode: ViewMode.ALL },
    { value: "Active", mode: ViewMode.ACTIVE },
    { value: "Completed", mode: ViewMode.COMPLETED },
  ];

  // Create button elements from button data
  const buttonElements = buttonData.map((data) => {
    return (
      <button
        data-buttonValue={data.value}
        data-testid={"view-mode-button-" + data.value}
        className={
          "todo-list__view-button" + (viewMode === data.mode ? "_active" : "")
        }
        disabled={viewMode === data.mode}
        onClick={() => switchViewMode(data.mode)}
      >
        {data.value}
      </button>
    );
  });

  // Deletes completed entries from todoEntries state
  const clearCompleted = (): void => {
    setTodoEntries((prevTodoEntries) => {
      return [...prevTodoEntries].reduce(
        (
          uncompletedEntries: TodoEntryInterface[],
          prevTodoEntry: TodoEntryInterface
        ) => {
          if (!prevTodoEntry.completed)
            return uncompletedEntries.concat([prevTodoEntry]);
          // else
          return uncompletedEntries;
        },
        []
      );
    });
  };

  return (
    <main>
      <TodoForm setTodoEntries={setTodoEntries} />
      <ul data-testid="todo-list">{todoEntriesElements}</ul>
      <span data-testid="active-amount-text">
        {activeTodosAmount} items left
      </span>
      {buttonElements}
      <button data-testid="clear-completed-button" onClick={clearCompleted}>
        Clear completed
      </button>
    </main>
  );
};

export default TodoList;
