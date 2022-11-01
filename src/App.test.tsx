import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TodoList from "./components/TodoList/TodoList";
import TodoEntry from "./components/TodoEntry/TodoEntry";
import TodoForm from "./components/TodoForm/TodoForm";
import userEvent from "@testing-library/user-event";

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

  it("should open and focus editor on edit button click", () => {
    const setTodoEntries = jest.fn();
    const { queryByTestId, getByTestId } = render(
      <TodoEntry
        content={"test"}
        completed={false}
        index={0}
        setTodoEntries={setTodoEntries}
      />
    );

    fireEvent.click(getByTestId("todo-edit"));
    expect(queryByTestId("todo-text")).toBeNull();
    expect(getByTestId("todo-editor")).toBeTruthy();
    expect(getByTestId("todo-editor")).toHaveFocus();
  });

  it("should close editor on Enter press", () => {
    const setTodoEntries = jest.fn();
    const { queryByTestId, getByTestId } = render(
      <TodoEntry
        content={"test"}
        completed={false}
        index={0}
        setTodoEntries={setTodoEntries}
      />
    );

    fireEvent.click(getByTestId("todo-edit"));
    fireEvent.keyDown(getByTestId("todo-editor"), { key: "Enter" });
    expect(queryByTestId("todo-editor")).toBeNull();
    expect(getByTestId("todo-text")).toBeTruthy();
  });

  it("should close editor on Escape press", () => {
    const setTodoEntries = jest.fn();
    const { queryByTestId, getByTestId } = render(
      <TodoEntry
        content={"test"}
        completed={false}
        index={0}
        setTodoEntries={setTodoEntries}
      />
    );

    fireEvent.click(getByTestId("todo-edit"));
    fireEvent.keyDown(getByTestId("todo-editor"), { key: "Escape" });
    expect(queryByTestId("todo-editor")).toBeNull();
    expect(getByTestId("todo-text")).toBeTruthy();
  });

  it("should close editor on blur", () => {
    const setTodoEntries = jest.fn();
    const { queryByTestId, getByTestId } = render(
      <TodoEntry
        content={"test"}
        completed={false}
        index={0}
        setTodoEntries={setTodoEntries}
      />
    );

    fireEvent.click(getByTestId("todo-edit"));
    fireEvent.blur(getByTestId("todo-editor"));
    expect(queryByTestId("todo-editor")).toBeNull();
    expect(getByTestId("todo-text")).toBeTruthy();
  });
});

describe("TodoList component", () => {
  it("should update checkbox value on click", () => {
    const { getAllByTestId } = render(
      <TodoList
        test={true}
        defaultTodoEntries={[{ completed: true, content: "test" }]}
      />
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

  it("should set class name of text based on checkbox value", () => {
    const { getByText } = render(
      <TodoList
        test={true}
        defaultTodoEntries={[
          { completed: true, content: "test1" },
          { completed: false, content: "test2" },
        ]}
      />
    );

    expect(getByText(/test1/i).getAttribute("class")).toBe(
      "todos__todo-text_checked"
    );
    expect(getByText(/test2/i).getAttribute("class")).toBe("todos__todo-text");
  });

  it("should add new entry with proper value on button click", () => {
    const { getByTestId } = render(
      <TodoList test={true} defaultTodoEntries={[]} />
    );

    const inputElement = getByTestId("form-input") as HTMLInputElement;
    const buttonElement = getByTestId("form-button");

    userEvent.type(inputElement, "Hello");
    fireEvent.click(buttonElement);
    expect(getByTestId("todo-entry")).toBeTruthy();
    expect(getByTestId("todo-text")).toHaveTextContent(/^Hello$/);
  });

  it("should change text on edit properly", () => {
    const { getByTestId } = render(
      <TodoList
        test={true}
        defaultTodoEntries={[{ completed: true, content: "test" }]}
      />
    );

    fireEvent.click(getByTestId("todo-edit"));
    userEvent.type(getByTestId("todo-editor"), "ing");
    fireEvent.blur(getByTestId("todo-editor"));
    expect(getByTestId("todo-text")).toHaveTextContent(/^testing$/);
  });

  it("should delete correct item from list", () => {
    const { getAllByTestId, getByTestId } = render(
      <TodoList
        test={true}
        defaultTodoEntries={[
          { completed: true, content: "testStart" },
          { completed: false, content: "testMiddle1" },
          { completed: false, content: "testMiddle2" },
          { completed: false, content: "testMiddle3" },
          { completed: true, content: "testEnd" },
        ]}
      />
    );
    // Delete from middle
    let deleteButtons = getAllByTestId("todo-delete");
    let todoList = getByTestId("todo-list");
    fireEvent.click(deleteButtons[2]);
    expect(todoList).not.toHaveTextContent("testMiddle2");
    // Delete from start
    deleteButtons = getAllByTestId("todo-delete");
    todoList = getByTestId("todo-list");
    fireEvent.click(deleteButtons[0]);
    expect(todoList).not.toHaveTextContent("testStart");
    // Delete from end
    deleteButtons = getAllByTestId("todo-delete");
    todoList = getByTestId("todo-list");
    fireEvent.click(deleteButtons[2]);
    expect(todoList).not.toHaveTextContent("testEnd");
    // Final
    expect(todoList.children).toHaveLength(2);
    expect(todoList).toHaveTextContent("testMiddle1");
    expect(todoList).toHaveTextContent("testMiddle3");
  });

  it("should update uncompleted items amount", () => {
    const { getByTestId } = render(
      <TodoList
        test={true}
        defaultTodoEntries={[{ completed: false, content: "test" }]}
      />
    );
    expect(getByTestId("active-amount-text")).toHaveTextContent("1");
    fireEvent.click(getByTestId("todo-checkbox"));
    expect(getByTestId("active-amount-text")).toHaveTextContent("0");
  });

  it("should update view on view mode change", () => {
    const { getByTestId } = render(
      <TodoList
        test={true}
        defaultTodoEntries={[
          { completed: false, content: "test1" },
          { completed: true, content: "test2" },
        ]}
      />
    );

    let todoList = getByTestId("todo-list");
    fireEvent.click(getByTestId("view-mode-button-Active"));
    expect(todoList.children).toHaveLength(1);
    expect(todoList).toHaveTextContent("test1");

    todoList = getByTestId("todo-list");
    fireEvent.click(getByTestId("view-mode-button-Completed"));
    expect(todoList.children).toHaveLength(1);
    expect(todoList).toHaveTextContent("test2");

    todoList = getByTestId("todo-list");
    fireEvent.click(getByTestId("view-mode-button-All"));
    expect(todoList).toHaveTextContent("test1");
    expect(todoList).toHaveTextContent("test2");
    expect(todoList.children).toHaveLength(2);
  });

  it("should clear all completed entries on 'clear completed' button click", () => {
    const { getByTestId } = render(
      <TodoList
      test={true}
        defaultTodoEntries={[
          { completed: true, content: "test1" },
          { completed: false, content: "test2" },
          { completed: false, content: "test3" },
          { completed: false, content: "test4" },
          { completed: true, content: "test5" },
        ]}
      />
    );
    fireEvent.click(getByTestId("clear-completed-button"));

    const todoList = getByTestId("todo-list");
    expect(todoList.children).toHaveLength(3);
    expect(todoList).toHaveTextContent("test2");
    expect(todoList).toHaveTextContent("test3");
    expect(todoList).toHaveTextContent("test4");
  });
});

describe("TodoForm component", () => {
  it("should properly change input", () => {
    const { getByTestId } = render(<TodoForm setTodoEntries={jest.fn()} />);

    const inputElement = getByTestId("form-input");

    userEvent.type(inputElement, "Hello");
    expect(inputElement.getAttribute("value")).toBe("Hello");

    userEvent.type(inputElement, " man");
    expect(inputElement.getAttribute("value")).toBe("Hello man");
  });

  it("should have button disabled when input is empty", () => {
    const { getByTestId } = render(<TodoForm setTodoEntries={jest.fn()} />);

    const buttonElement = getByTestId("form-button");

    expect(buttonElement).toBeDisabled();

    const inputElement = getByTestId("form-input");
    userEvent.type(inputElement, "Hello");

    expect(buttonElement).not.toBeDisabled();
  });

  it("should clear input on button click", () => {
    const { getByTestId } = render(<TodoForm setTodoEntries={jest.fn()} />);
    const buttonElement = getByTestId("form-button");
    const inputElement = getByTestId("form-input");

    userEvent.type(inputElement, "Hello");
    fireEvent.click(buttonElement);
    expect(inputElement.getAttribute("value")).toBe("");
  });
});
