import type { Todo, StatusUpdateProps } from "./types";
import { loadStripe } from "@stripe/stripe-js";

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

export async function deleteTodo(todoId: string) {
  const response = await fetch(`https://localhost:5001/api/ToDos/${todoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update status");
  }
  if (response.status === 204) {
    return { message: "Deleted successfully" };
  } else {
    const data: Todo = await response.json();
    return data;
  }
}

export async function createTodo(todo: Todo) {
  const response = await fetch(`https://localhost:5001/api/ToDos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      duedate: todo.duedate,
      notes: todo.notes,
      status: todo.status,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }
  if (response.status === 204) {
    return { message: "Created successfully" };
  } else {
    const data: Todo = await response.json();
    return data;
  }
}

export async function editTodo(todo: Todo) {
  const response = await fetch(`https://localhost:5001/api/ToDos/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      duedate: todo.duedate,
      notes: todo.notes,
      status: todo.status,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update ToDO");
  }
  if (response.status === 204) {
    return { message: "Created successfully" };
  } else {
    const data: Todo = await response.json();
    return data;
  }
}

export async function stripeCheckout() {
  const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
  const response = await fetch(
    "https://localhost:5001/api/Stripe/create-checkout-session",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to create Stripe checkout");
  }
  const data = await response.json();
  const result = await stripe?.redirectToCheckout({
    sessionId: data.id,
  });

  if (result?.error) {
    console.error(result.error.message);
  }
}
