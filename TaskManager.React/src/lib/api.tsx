export async function getTodos() {
  const res = await fetch("https://localhost:5001/api/ToDos");
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  return res.json();
}

// type Status = "ToDo" | "InProgress" | "Done";

export async function updateStatus(todoId: number, newStatus: string) {
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

  return response.json();
}
