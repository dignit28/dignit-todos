import React from "react";
import TodoList from "./components/TodoList";
import InspirationalQuote from "./components/InspirationalQuote";

function App() {
  return (
    <div>
      <div className="App">
        <TodoList test={false} defaultTodoEntries={[]} />
      </div>
      <InspirationalQuote />
    </div>
  );
}

export default App;
