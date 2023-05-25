import { Link, useParams } from "react-router-dom";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { getTodoById } from "@/lib/api";
import { TableSkeleton } from "@/components/tableSkeleton";
import { Status, type Todo } from "@/lib/types";
import { FC } from "react";
import { cn } from "@/lib/utils";

type TodoStatusIndicatorProps = {
  status: Status | undefined;
};

function TodoDetails() {
  return (
    <main className="flex-1 px-4 pt-6">
      <h1 className="text-2xl font-bold tracking-wide">To Do Details</h1>
      <Details />
      <Link to="/">
        <p className="pt-12 text-sm font-semibold text-blue">Back to List</p>
      </Link>
    </main>
  );
}

function Details() {
  const { id } = useParams<{ id: string }>();

  const {
    isLoading,
    error,
    data: todo,
  } = useQuery<Todo, Error, Todo, QueryKey>({
    queryKey: ["todo", id],
    queryFn: () => getTodoById(id as string),
    enabled: !!id,
  });
  if (isLoading) return <TableSkeleton />;
  if (error instanceof Error)
    return <div>An error has occurred: {error.message}</div>;
  return (
    <>
      <TodoStatusIndicator status={todo?.status} />
      <div className="grid grid-cols-4 pt-4">
        <p className="col-span-1 text-xs font-semibold">Title</p>
        <p className="col-span-3 text-xs font-medium">{todo?.title}</p>
      </div>
      <div className="grid grid-cols-4 pt-4">
        <p className="col-span-1 text-xs font-semibold">Description</p>
        <p className="col-span-23 text-xs font-medium">{todo?.description}</p>
      </div>
      <div className="grid grid-cols-4 pt-4">
        <p className="col-span-1 text-xs font-semibold">Due Date</p>
        <p className="col-span-3 text-xs font-medium">{todo?.duedate}</p>
      </div>
      <div className="grid grid-cols-4 pt-4">
        <p className="col-span-1 text-xs font-semibold">Notes</p>
        <p className="col-span-3 text-xs font-medium">{todo?.notes}</p>
      </div>
    </>
  );
}
const TodoStatusIndicator: FC<TodoStatusIndicatorProps> = ({ status }) => {
  let classes =
    "border border-medium-gray text-medium-gray bg-none focus:ring-medium-gray";
  if (!status) return <div className={classes}>ToDo</div>;
  const value =
    status === "ToDo"
      ? "To Do"
      : status === "InProgress"
      ? "In Progress"
      : "Done";

  if (status === "Done") {
    classes = "border-teal text-lighter-gray bg-teal focus:ring-teal";
  } else if (status === "InProgress") {
    classes = "border-blue text-blue bg-none focus:ring-blue";
  }

  return (
    <div className="pt-8">
      <div
        className={cn(
          "flex w-fit items-center justify-center rounded-full border-2 border-medium-gray bg-transparent bg-none px-2 py-1 text-xs font-semibold text-medium-gray ring-offset-background placeholder:text-medium-gray focus:outline-none focus:ring-2 focus:ring-medium-gray focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          classes
        )}
      >
        <p className="px-1 text-center">{value}</p>
      </div>
    </div>
  );
};

export default TodoDetails;
