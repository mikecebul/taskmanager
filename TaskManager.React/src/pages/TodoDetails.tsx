import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTodoById } from "@/lib/api";
import { TableSkeleton } from "@/components/tableSkeleton";
import { type Todo } from "@/lib/types";

function TodoDetails() {
  return (
    <main className="flex-1 px-4 pt-6">
      <h1 className="text-2xl font-bold tracking-wide">Todo Details</h1>
      <Details />
      <Link to="/">Back to List</Link>
    </main>
  );
}

function Details() {
  const { id } = useParams<{ id: string }>();

  const {
    isLoading,
    error,
    data: todo,
  } = useQuery<Todo, Error>({
    queryKey: ["todo", id],
    queryFn: () => getTodoById(id as string),
    enabled: !!id,
  });
  if (isLoading) return <TableSkeleton />;
  if (error instanceof Error)
    return <div>An error has occurred: {error.message}</div>;
  return (
    <>
      <h2>{todo?.title}</h2>
      <p>{todo?.description}</p>
    </>
  );
}

export default TodoDetails;
