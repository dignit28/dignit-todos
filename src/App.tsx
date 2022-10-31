import React from "react";
import TodoList from "./components/TodoList";
// Data
import { defaultTodoEntries } from "./defaults/defaultData";

function App() {
  return (
    <div className="App">
      <TodoList defaultTodoEntries={defaultTodoEntries} />
    </div>
  );
}

export default App;
