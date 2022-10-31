import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import TodoList from "./components/TodoList";
import TodoEntry from "./components/TodoEntry";

afterEach(cleanup);

describe("TodoEntry component", () => {
  it("should respond to checkbox click", () => {
    const setTodoEntries = jest.fn();
    const { getByTestId } = render(
      <TodoEntry
        content={"test"}
        completed={false}
        index={0}
        setTodoEntries={setTodoEntries}
      />
    );

    fireEvent.click(getByTestId("todo-checkbox"));
    expect(setTodoEntries).toHaveBeenCalledTimes(1);
  });
});

describe("TodoList component", () => {
  it("should update checkbox value on click", () => {
    const { getAllByTestId } = render(
      <TodoList defaultTodoEntries={[{ completed: true, content: "test" }]} />
    );

    const todoCheckboxes = getAllByTestId(
      "todo-checkbox"
    ) as HTMLInputElement[];

    todoCheckboxes.forEach((element: HTMLInputElement) => {
      const checkedInitial = element.checked;
      fireEvent.click(element);
      expect(element.checked).toBe(!checkedInitial);
      fireEvent.click(element);
      expect(element.checked).toBe(checkedInitial);
    });
  });
});
