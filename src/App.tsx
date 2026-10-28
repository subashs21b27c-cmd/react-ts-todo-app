import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import type { Todo } from "./types";
import "./App.css";

const initialTodos: Todo[] = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Build a Todo app", completed: true },
];

const createTodo = (text: string): Todo => ({
  id: Date.now() + Math.random(),
  text,
  completed: false,
});

export default function App(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [input, setInput] = useState<string>("");

  const addTodo = (): void => {
    const trimmedText = input.trim();

    if (!trimmedText) {
      return;
    }

    setTodos((previousTodos) => [...previousTodos, createTodo(trimmedText)]);
    setInput("");
  };

  const toggleTodo = (id: number): void => {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number): void => {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));
  };

  return (
    <main className="app">
      <div className="todo-card">
        <h1>Todo List</h1>
        <TodoInput value={input} onChange={setInput} onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </main>
  );
}
