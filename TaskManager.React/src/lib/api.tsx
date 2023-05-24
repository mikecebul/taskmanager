export async function getTodos() {
  const res = await fetch("https://localhost:5001/api/ToDos");
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  return res.json();
}

type Status = "ToDo" | "InProgress" | "Done";

export async function updateStatus({
  todoId,
  newStatus,
}: {
  todoId: number;
  newStatus: Status;
}) {
  const response = await fetch(`https://localhost:5001/api/ToDos/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: todoId, status: newStatus }),
  });

  if (!response.ok) {
    throw new Error("Failed to update status");
  }

  // return response.json();
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

  return response.json();
}
