import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";

interface TodoFormProps {
  selectedTodo: Todo | null;
  onSave: (todo: Omit<Todo, "id">) => void;
  onCancelEdit: () => void;
}

const TodoForm = ({ selectedTodo, onSave, onCancelEdit }: TodoFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setDescription(selectedTodo.description);
      setCompleted(selectedTodo.completed);
    } else {
      setTitle("");
      setDescription("");
      setCompleted(false);
    }
  }, [selectedTodo]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      completed,
    });

    if (!selectedTodo) {
      setTitle("");
      setDescription("");
      setCompleted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>{selectedTodo ? "Edit Todo" : "Add Todo"}</h2>

      <div className="form-group">
        <label htmlFor="title">Title</label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter todo title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>

        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter todo description"
          rows={4}
        />
      </div>

      <div className="form-checkbox">
        <input
          id="completed"
          type="checkbox"
          checked={completed}
          onChange={(event) => setCompleted(event.target.checked)}
        />

        <label htmlFor="completed">Completed</label>
      </div>

      <div className="form-actions">
        <button type="submit">
          {selectedTodo ? "Update Todo" : "Add Todo"}
        </button>

        {selectedTodo && (
          <button type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
