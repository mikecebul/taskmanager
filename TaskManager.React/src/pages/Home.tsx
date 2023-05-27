import { getTodos, updateStatus } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, ChevronRight } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableSkeleton } from "@/components/tableSkeleton";
import { Link } from "react-router-dom";
import type { Todo, Status, StatusUpdateProps } from "@/lib/types";
import { useState } from "react";

function Home() {
  return (
    <main className="flex-1 px-4 pt-6">
      <h1 className="text-2xl font-bold tracking-wide">To Dos</h1>
      <div className="pt-6 ">
        <Link
          to="/create"
          aria-label="Create new todo"
          className="inline-flex items-center rounded-full hover:ring-offset-none group ring-offset-background hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 hover:focus:scale-105 focus:hover:ring-darker-blue disabled:cursor-not-allowed disabled:opacity-50"
        >
          <div className="rounded-full border-[3px] border-blue text-xl text-blue group-hover:border-darker-blue">
            <Plus className="stroke-[3px] text-blue group-hover:text-darker-blue"></Plus>
          </div>
          <p className="pl-2 text-lg font-semibold">Create</p>
        </Link>
      </div>
      <div className="pt-12 text-lg font-semibold">
        <ToDoTable />
      </div>
    </main>
  );
}

function ToDoTable() {
  const {
    isLoading,
    error,
    data: todos,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (isLoading) return <TableSkeleton />;
  if (error instanceof Error)
    return (
      <div className="flex-1 px-4 pt-6">
        an error has occurred: {error.message}
      </div>
    );
  const getDueDateColorClass = (dueDate: string) => {
    const now = Date.now();
    const due = new Date(dueDate).getTime();
    const oneWeekMilliseconds = 1000 * 60 * 60 * 24 * 7;

    if (due < now) {
      return "bg-red";
    } else if (due < now + oneWeekMilliseconds) {
      return "bg-yellow";
    } else {
      return "bg-teal";
    }
  };

  return (
    <div className="border border-white rounded-md shadow-lg">
      <Table>
        <TableBody>
          {todos?.map((todo) => {
            return (
              <TableRow key={todo.id}>
                <TableCell className="w-32 p-0">
                  <div className="border-r-[1px] border-lighter-gray px-2">
                    <ProgressSelect todo={todo} />
                  </div>
                </TableCell>
                <TableCell className="px-2 py-2 text-base font-semibold text-darker-gray">
                  <Link
                    to={`/todos/${todo.id}`}
                    className="inline-block w-full p-2 rounded ring-offset-background focus:outline-none focus:ring-2 focus:ring-medium-gray focus:ring-offset-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="w-40 overflow-hidden truncate">
                          {todo.title}
                        </p>
                      </div>
                      <div className="flex items-center justify-end">
                        <div
                          className={`mr-1 h-3 w-3 rounded-full ${getDueDateColorClass(
                            todo.duedate
                          )}`}
                        ></div>
                        <ChevronRight
                          size={16}
                          className="stroke-[3px] text-medium-gray"
                        />
                      </div>
                    </div>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function ProgressSelect({ todo }: { todo: Todo }) {
  const [status, setStatus] = useState(todo.status);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateStatus,
    onMutate: async ({ todo, newStatus }: StatusUpdateProps) => {
      setStatus(newStatus);
      await queryClient.cancelQueries({ queryKey: ["todos", todo.id] });
      const previousTodo = queryClient.getQueryData(["todos", todo.id]);
      queryClient.setQueryData(["todos", todo.id], { status: newStatus });
      return { previousTodo, todo };
    },
    onError: (_err, { todo }, context) => {
      queryClient.setQueryData(["todos", todo.id], context?.previousTodo);
      setStatus((context?.previousTodo as Todo)?.status);
    },
    onSettled: (newTodo) => {
      queryClient.invalidateQueries({ queryKey: ["todos", newTodo?.id] });
    },
  });

  const getTableCellClass = (status: Status) => {
    let trigger =
      "border-medium-gray text-darker-gray bg-none focus:ring-medium-gray hover:bg-lighter-gray hover:text-black";
    let triggerIcon = "stroke-medium-gray";

    if (status === "Done") {
      trigger =
        "border-teal text-white bg-teal focus:ring-teal hover:bg-darker-teal hover:border-darker-teal hover:text-white";
      triggerIcon = "stroke-white";
    } else if (status === "InProgress") {
      trigger =
        "border-blue text-blue bg-none focus:ring-blue hover:text-darker-blue hover:border-darker-blue hover:bg:lighter-gray";
      triggerIcon = "stroke-blue";
    }

    return { trigger, triggerIcon };
  };

  const classes = getTableCellClass(todo.status);
  return (
    <Select
      defaultValue={status}
      onValueChange={(status: Status) => {
        mutation.mutate({ todo: todo, newStatus: status });
      }}
    >
      <SelectTrigger
        className={`w-28 ${classes.trigger}`}
        iconClassName={classes.triggerIcon}
      >
        <SelectValue
          placeholder={
            status === "ToDo"
              ? "To Do"
              : status === "InProgress"
              ? "In Progress"
              : "Done"
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="ToDo">To Do</SelectItem>
          <SelectItem value="InProgress">In Progress</SelectItem>
          <SelectItem value="Done">Done</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Home;
