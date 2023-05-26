import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { deleteTodo, getTodoById } from "@/lib/api";
import { TableSkeleton } from "@/components/tableSkeleton";
import { Status, TodoProp } from "@/lib/types";
import { FC } from "react";
import { cn, formatDate } from "@/lib/utils";

type TodoStatusIndicatorProps = {
  status: Status | undefined;
};

function DeleteTodoPage() {
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
    <main className="flex-1 px-4 pt-6">
      <h1 className="text-2xl font-bold tracking-wide">Delete To Do</h1>
      <TodoStatusIndicator status={todo.status} />
      <TodoGrid todo={todo} />
      <Links />
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
        <p className="col-span-3 text-xs font-medium">{todo.title}</p>
      </div>
      <div className="grid grid-cols-4 pt-6">
        <p className="col-span-1 text-xs font-semibold">Description</p>
        <p className="col-span-23 text-xs font-medium">{todo.description}</p>
      </div>
      <div className="grid grid-cols-4 pt-6">
        <p className="col-span-1 text-xs font-semibold">Due Date</p>
        <p className="col-span-3 text-xs font-medium">
          {formatDate(todo.duedate)}
        </p>
      </div>
      <div className="grid grid-cols-4 pt-6">
        <p className="col-span-1 text-xs font-semibold">Notes</p>
        <p className="col-span-3 text-xs font-medium">{todo.notes}</p>
      </div>
    </>
  );
};

const Links = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (id == undefined) return null;
    try {
      await deleteTodo(id);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-end space-x-8 pt-12">
      <div className="flex items-center justify-end space-x-8">
        <Link to={`/todos/${id}`} className="flex items-center justify-center">
          <p className="text-sm font-semibold tracking-wide text-blue hover:scale-105 hover:text-darker-blue">
            Cancel
          </p>
        </Link>
        <button
          onClick={() => handleDelete()}
          className="rounded-full bg-red px-10 py-2 text-xs font-medium shadow ring-offset-background hover:scale-105 hover:bg-darker-red hover:ring-offset-secondary-foreground focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <p className="text-sm font-semibold tracking-wide text-white">
            Delete
          </p>
        </button>
      </div>
    </div>
  );
};
export default DeleteTodoPage;
