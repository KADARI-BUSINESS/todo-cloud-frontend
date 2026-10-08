import type { Todo } from "../types/todo";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
};

export const getTodoById = async (id: number): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch todo");
  }

  return response.json();
};

export const createTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }

  return response.json();
};

export const updateTodo = async (
  id: number,
  todo: Omit<Todo, "id">,
): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
};
