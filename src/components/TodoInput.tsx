import type { KeyboardEvent } from "react";

type TodoInputProps = {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
};

export default function TodoInput({
  value,
  onChange,
  onAdd,
}: TodoInputProps): JSX.Element {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      onAdd();
    }
  };

  return (
    <div className="todo-input">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a task..."
        aria-label="Todo input"
      />
      <button type="button" onClick={onAdd}>
        Add
      </button>
    </div>
  );
}
