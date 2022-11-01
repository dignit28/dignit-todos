import React from "react";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="App">
      <TodoList test={false} defaultTodoEntries={[]} />
    </div>
  );
}

export default App;
