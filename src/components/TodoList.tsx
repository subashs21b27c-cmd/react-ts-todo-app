import type { Todo } from "../types";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: readonly Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TodoList({
  todos,
  onToggle,
  onDelete,
}: TodoListProps): JSX.Element {
  if (todos.length === 0) {
    return <p className="empty-state">No tasks yet. Add one above.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
