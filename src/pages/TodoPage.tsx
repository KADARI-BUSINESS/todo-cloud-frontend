import { useEffect, useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../api/todoApi";
import type { Todo } from "../types/todo";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTodos();
        setTodos(data);
      } catch {
        setError("Failed to load todos");
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const handleSave = async (todoData: Omit<Todo, "id">) => {
    try {
      setError("");

      if (selectedTodo) {
        const updatedTodo = await updateTodo(selectedTodo.id, todoData);

        setTodos((currentTodos) =>
          currentTodos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo,
          ),
        );

        setSelectedTodo(null);
      } else {
        const newTodo = await createTodo(todoData);

        setTodos((currentTodos) => [newTodo, ...currentTodos]);
      }
    } catch {
      setError("Failed to save todo");
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      setError("");

      const updatedTodo = await updateTodo(todo.id, {
        title: todo.title,
        description: todo.description,
        completed: !todo.completed,
      });

      setTodos((currentTodos) =>
        currentTodos.map((item) =>
          item.id === updatedTodo.id ? updatedTodo : item,
        ),
      );
    } catch {
      setError("Failed to update todo");
    }
  };

  const handleDelete = async () => {
    if (!todoToDelete) {
      return;
    }

    try {
      setError("");

      await deleteTodo(todoToDelete.id);

      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo.id !== todoToDelete.id),
      );

      if (selectedTodo?.id === todoToDelete.id) {
        setSelectedTodo(null);
      }

      setTodoToDelete(null);
    } catch {
      setError("Failed to delete todo");
    }
  };

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCancelEdit = () => {
    setSelectedTodo(null);
  };

  return (
    <main className="todo-page">
      <header className="page-header">
        <h1>Todo Cloud</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      <section className="todo-container">
        <TodoForm
          selectedTodo={selectedTodo}
          onSave={handleSave}
          onCancelEdit={handleCancelEdit}
        />

        {loading ? (
          <div className="loading-state">Loading todos...</div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={(id) => {
              const todo = todos.find((item) => item.id === id);

              if (todo) {
                setTodoToDelete(todo);
              }
            }}
          />
        )}
      </section>
      {todoToDelete && (
        <DeleteConfirmModal
          todoTitle={todoToDelete.title}
          onConfirm={handleDelete}
          onCancel={() => setTodoToDelete(null)}
        />
      )}
    </main>
  );
};

export default TodoPage;
