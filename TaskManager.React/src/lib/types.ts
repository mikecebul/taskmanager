export type Status = "ToDo" | "InProgress" | "Done";

export type StatusUpdateProps = {
  todo: Todo;
  newStatus: Status;
};

export type TodoProp = {
  todo: Todo
}

export type Todo = {
  id: number;
  title: string;
  description: string;
  duedate: string;
  notes: string;
  status: Status;
};
