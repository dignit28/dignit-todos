import React from "react";
// Styles
import "./App.css";
// Components
import TodoList from "./components/TodoList/TodoList";
import InspirationalQuote from "./components/InspirationalQuote/InspirationalQuote";

function App() {
  return (
    <div className="App">
      <TodoList test={false} defaultTodoEntries={[]} />
      <InspirationalQuote />
    </div>
  );
}

export default App;
