import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTodoById } from "@/lib/api";
import { TableSkeleton } from "@/components/tableSkeleton";
import { Status, TodoProp } from "@/lib/types";
import { FC } from "react";
import { cn, formatDate } from "@/lib/utils";

type TodoStatusIndicatorProps = {
  status: Status | undefined;
};
type LinksProps = {
  id: string | undefined;
};

function TodoDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const {
    isError,
    error,
    isLoading,
    data: todo,
  } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => getTodoById(id as string),
    enabled: !!id,
  });

  if (isLoading) return <TableSkeleton />;
  if (isError)
    return <div>An error has occurred: {(error as Error).message}</div>;

  return (
    <main className="flex-1 max-w-2xl px-4 pt-6">
      <h1 className="text-2xl font-bold tracking-wide">To Do Details</h1>
      <TodoStatusIndicator status={todo.status} />
      <TodoGrid todo={todo} />
      <Links id={id} />
    </main>
  );
}

const TodoStatusIndicator: FC<TodoStatusIndicatorProps> = ({ status }) => {
  let classes =
    "border-medium-gray text-medium-gray bg-none focus:ring-medium-gray";
  if (!status) return <div className={classes}>ToDo</div>;
  const value =
    status === "ToDo"
      ? "To Do"
      : status === "InProgress"
      ? "In Progress"
      : "Done";

  if (status === "Done") {
    classes = "border-teal text-white bg-teal focus:ring-teal";
  } else if (status === "InProgress") {
    classes = "border-blue text-blue bg-none focus:ring-blue";
  }

  return (
    <div className="pt-8">
      <div
        className={cn(
          "flex w-24 items-center justify-center rounded-full border-2 border-medium-gray bg-transparent bg-none px-2 py-1 text-xs font-medium text-medium-gray ring-offset-background placeholder:text-medium-gray focus:outline-none focus:ring-2 focus:ring-medium-gray focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          classes
        )}
      >
        <p className="px-1 text-center">{value}</p>
      </div>
    </div>
  );
};

const TodoGrid: FC<TodoProp> = ({ todo }) => {
  return (
    <>
      <div className="grid grid-cols-4 pt-6">
        <p className="col-span-1 text-xs font-semibold">Title</p>
        <p className="col-span-3 text-xs font-medium break-words">
          {todo.title}
        </p>
      </div>
      <div className="grid grid-cols-4 pt-6 mr-8">
        <p className="col-span-1 text-xs font-semibold">Description</p>
        <p className="col-span-3 text-xs font-medium break-words">
          {todo.description}
        </p>
      </div>
      <div className="grid grid-cols-4 pt-6">
        <p className="col-span-1 text-xs font-semibold">Due Date</p>
        <p className="col-span-3 text-xs font-medium break-words">
          {formatDate(todo.duedate)}
        </p>
      </div>
      <div className="grid grid-cols-4 pt-6">
        <p className="col-span-1 text-xs font-semibold">Notes</p>
        <p className="col-span-3 text-xs font-medium break-words">
          {todo.notes}
        </p>
      </div>
    </>
  );
};

const Links = ({ id }: LinksProps) => {
  return (
    <div className="flex items-center justify-between pt-12 space-x-0">
      <Link
        to={`/todos/${id}/delete`}
        className="rounded-full focus:outline-none focus:ring-2 focus:ring-red hover:focus:scale-105 hover:focus:ring-darker-red"
      >
        <p className="px-4 py-2 text-sm font-semibold tracking-wide rounded-full hover:ring-offset-none text-red ring-offset-background hover:scale-105 hover:text-darker-red focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          Delete
        </p>
      </Link>
      <div className="flex items-center justify-end space-x-4">
        <Link
          to="/"
          className="rounded-full focus:outline-none focus:ring-2 focus:ring-blue hover:focus:scale-105 hover:focus:ring-darker-blue"
        >
          <p className="px-4 py-2 text-sm font-semibold tracking-wide rounded-full hover:ring-offset-none text-blue ring-offset-background hover:scale-105 hover:text-darker-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            Back to List
          </p>
        </Link>
        <Link
          to={`/todos/${id}/edit`}
          className="px-10 py-2 text-xs font-medium rounded-full shadow hover:ring-offset-none bg-blue ring-offset-background hover:scale-105 hover:bg-darker-blue focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 hover:focus:scale-105 hover:focus:ring-darker-blue disabled:cursor-not-allowed disabled:opacity-50"
        >
          <p className="text-sm font-semibold tracking-wide text-white">Edit</p>
        </Link>
      </div>
    </div>
  );
};
export default TodoDetailsPage;
