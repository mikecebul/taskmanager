import type { Todo, StatusUpdateProps } from "./types";

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch("https://localhost:5001/api/ToDos");
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  const data: Todo[] = await response.json();
  return data;
}

export async function updateStatus({ todo, newStatus }: StatusUpdateProps) {
  const response = await fetch(`https://localhost:5001/api/ToDos/${todo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) {
    throw new Error("Failed to update status");
  }
  const data = response.json();
  return data;
}

export async function getTodoById(todoId: string) {
  const response = await fetch(`https://localhost:5001/api/ToDos/${todoId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update status");
  }
  const data: Todo = await response.json();
  return data;
}
