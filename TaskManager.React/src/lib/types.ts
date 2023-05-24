export type Status = "ToDo" | "InProgress" | "Done";

export type ProgressSelectProps = {
  todoId: number;
  initialStatus: Status;
};

export type Todo = {
  id: number;
  title: string;
  description: string;
  duedate: string;
  notes: string;
  status: Status;
};
