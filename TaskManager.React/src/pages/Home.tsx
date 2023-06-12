import { getTodos, updateStatus } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, ChevronRight, Settings, Trash2 } from "lucide-react";
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
import { cn, formatDate } from "@/lib/utils";
import { useMediaQuery } from "@mantine/hooks";

function Home() {
  return (
    <div className="px-4 pt-6 2xl:mx-auto 2xl:max-w-7xl">
      <h1 className="text-2xl font-bold tracking-wide">To Dos</h1>
      <div className="pt-6 ">
        <Link
          to="/create"
          aria-label="Create new todo"
          className="hover:ring-offset-none group inline-flex items-center rounded-full ring-offset-background hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 hover:focus:scale-105 focus:hover:ring-darker-blue disabled:cursor-not-allowed disabled:opacity-50"
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
    </div>
  );
}

function ToDoTable() {
  const isLargeScreen = useMediaQuery("(min-width: 1536px)");
  const [iconFocused, setIconFocused] = useState(false);

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
    <div className="rounded-md border border-white shadow-lg">
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
                <TableCell className="px-0 py-0 text-base font-semibold text-darker-gray">
                  {isLargeScreen ? (
                    <div className="group inline-block w-full rounded p-2 ring-offset-background focus:outline-none focus:ring-2 focus:ring-medium-gray focus:ring-offset-2">
                      <div className="flex">
                        <div className="mr-16 flex items-center space-x-4">
                          <p className="w-[700px] overflow-hidden truncate p-2">
                            <Link
                              to={`/todos/${todo.id}`}
                              className="rounded ring-offset-background focus:outline-none focus:ring-2 focus:ring-medium-gray focus:ring-offset-2"
                            >
                              {todo.title}{" "}
                            </Link>
                            <span className="inline pl-2 text-sm font-light">
                              {todo.description}
                            </span>
                          </p>
                          <div className="flex w-40 items-center space-x-4 ">
                            <Link
                              onFocus={() => setIconFocused(true)}
                              onBlur={() => setIconFocused(false)}
                              to={`/todos/${todo.id}`}
                              className={`group-hover:block ${
                                iconFocused ? "block" : "hidden"
                              }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className=" rounded-full bg-teal stroke-white stroke-[2px] group-hover:2xl:block"
                              >
                                <circle cx="12" cy="12" r="10" stroke="none" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                              </svg>
                            </Link>
                            <Link
                              onFocus={() => setIconFocused(true)}
                              onBlur={() => setIconFocused(false)}
                              to={`/todos/${todo.id}/edit`}
                              className={`group-hover:block ${
                                iconFocused ? "block" : "hidden"
                              }`}
                            >
                              <Settings className=" text-medium-gray" />
                            </Link>
                            <Link
                              onFocus={() => setIconFocused(true)}
                              onBlur={() => setIconFocused(false)}
                              to={`/todos/${todo.id}/delete`}
                              className={`group-hover:block ${
                                iconFocused ? "block" : "hidden"
                              }`}
                            >
                              <Trash2 className=" text-medium-gray" />
                            </Link>
                          </div>
                        </div>
                        <div className="flex items-center justify-end">
                          <div
                            className={cn(
                              "mr-1 h-3 w-3 rounded-full",
                              getDueDateColorClass(todo.duedate)
                            )}
                          ></div>
                          <div className="w-28">
                            <p className="px-2 text-xs font-thin">
                              Due
                              <span className="px-4 font-semibold">
                                {formatDate(todo.duedate)}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={`/todos/${todo.id}`}
                      className="group inline-block w-full rounded p-2 ring-offset-background focus:outline-none focus:ring-2 focus:ring-medium-gray focus:ring-offset-2"
                    >
                      <div className="flex items-center justify-between">
                        <p className="w-40 overflow-hidden truncate sm:w-[400px] md:w-[400px]">
                          {todo.title}{" "}
                          <span className="hidden pl-2 text-sm font-light">
                            {todo.description}
                          </span>
                        </p>
                        <div className="flex items-center justify-end">
                          <div
                            className={cn(
                              "mr-1 h-3 w-3 rounded-full",
                              getDueDateColorClass(todo.duedate)
                            )}
                          ></div>
                          <div className="hidden md:block md:w-28">
                            <p className="px-2 text-xs font-thin">
                              Due
                              <span className="px-4 font-semibold">
                                {formatDate(todo.duedate)}
                              </span>
                            </p>
                          </div>
                          <ChevronRight
                            size={16}
                            className="stroke-[3px] text-medium-gray"
                          />
                        </div>
                      </div>
                    </Link>
                  )}
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
