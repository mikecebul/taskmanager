import { getTodos, updateStatus } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
import { Skeleton } from "@/components/ui/skeleton";

type Status = "ToDo" | "InProgress" | "Done";

type ProgressSelectProps = {
  todoId: number;
  status: Status;
};

type Todo = {
  id: number;
  title: string;
  description: string;
  duedate: string;
  notes: string;
  started: boolean;
  completed: boolean;
  status: Status;
};

function Home() {
  return (
    <main className="flex-1 px-4 pt-6">
      <h1 className="text-2xl font-bold tracking-wide">To Dos</h1>
      <div className="flex pt-6">
        <button className="rounded-full border-[3px] border-blue text-xl text-blue hover:border-darker-blue">
          <Plus className="stroke-[3px] text-blue hover:text-darker-blue"></Plus>
        </button>
        <p className="pl-2 text-lg font-semibold">Create</p>
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
  } = useQuery<Todo[]>({
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
              <TableRow key={todo.id} className="">
                <TableCell className="w-32 p-0">
                  <div className="border-r-[1px] border-lighter-gray px-2">
                    <ProgressSelect todoId={todo.id} status={todo.status} />
                  </div>
                </TableCell>
                <TableCell className="px-3 py-4 text-base font-semibold text-darker-gray">
                  <p className="min-h-[24px] w-36 overflow-hidden truncate">
                    {todo.title}
                  </p>
                </TableCell>
                <TableCell className="p-2">
                  <div className="flex items-center justify-end min-w-full">
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
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function ProgressSelect({ todoId, status }: ProgressSelectProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newStatus: string) => updateStatus(todoId, newStatus),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const getTableCellClass = (status: Status) => {
    let trigger =
      "border-medium-gray text-medium-gray bg-none focus:ring-medium-gray";
    let triggerIcon = "stroke-medium-gray";

    if (status === "Done") {
      trigger = "border-teal text-lighter-gray bg-teal focus:ring-teal";
      triggerIcon = "stroke-lighter-gray";
    } else if (status === "InProgress") {
      trigger = "border-blue text-blue bg-none focus:ring-blue";
      triggerIcon = "stroke-blue";
    }

    return { trigger, triggerIcon };
  };
  const classes = getTableCellClass(status);
  return (
    <Select
      defaultValue={status}
      onValueChange={(value) => {
        mutation.mutate(value);
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
export function TableSkeleton() {
  return (
    <>
      <div className="flex items-center mb-4 space-x-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex items-center mb-4 space-x-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex items-center mb-4 space-x-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex items-center mb-4 space-x-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex items-center mb-4 space-x-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </>
  );
}

export default Home;
