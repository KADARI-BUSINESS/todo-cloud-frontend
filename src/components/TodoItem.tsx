import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onToggle, onEdit, onDelete }: TodoItemProps) => {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="todo-content">
        <h3>{todo.title}</h3>

        <p>{todo.description}</p>

        <span className="todo-status">
          {todo.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="todo-actions">
        <button onClick={() => onToggle(todo)}>
          {todo.completed ? "Mark Pending" : "Complete"}
        </button>

        <button onClick={() => onEdit(todo)}>Edit</button>

        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
