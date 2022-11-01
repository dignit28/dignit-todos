import React from "react";
// Styles
import "./App.css";
// Components
import TodoList from "./components/TodoList/TodoList";
import InspirationalQuote from "./components/InspirationalQuote/InspirationalQuote";

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
