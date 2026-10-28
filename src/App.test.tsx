import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Todo App", () => {
  test("renders initial todo items", () => {
    render(<App />);

    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo app")).toBeInTheDocument();
  });

  test("adds a new todo item when Add button is clicked", () => {
    render(<App />);

    const input = screen.getByLabelText("Todo input");
    fireEvent.change(input, { target: { value: "Write tests" } });
    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByText("Write tests")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  test("does not add empty todo item", () => {
    render(<App />);

    const input = screen.getByLabelText("Todo input");
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.queryByText("   ")).not.toBeInTheDocument();
  });

  test("toggles todo completion state", () => {
    render(<App />);

    const checkbox = screen.getAllByRole("checkbox")[0];
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  test("deletes a todo item", () => {
    render(<App />);

    expect(screen.getByText("Learn React")).toBeInTheDocument();

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
  });

  test("adds todo using Enter key", () => {
    render(<App />);

    const input = screen.getByLabelText("Todo input");
    fireEvent.change(input, { target: { value: "Finish project" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(screen.getByText("Finish project")).toBeInTheDocument();
  });
});
