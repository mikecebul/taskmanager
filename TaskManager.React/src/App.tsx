import { Plus } from "lucide-react";
import { CheckCheck, ChevronRight, ChevronDown } from "lucide-react";
import { QueryClient, useQuery, QueryClientProvider } from "react-query";
// Table Imports
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  // TableHead,
  // TableHeader,
  TableRow,
} from "@/components/ui/table";

const queryClient = new QueryClient();

type Todo = {
  id: number;
  title: string;
  description: string;
  duedate: string;
  notes: string;
  started: boolean;
  completed: boolean;
};

type ToDoTableProps = {
  todos: Todo[];
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Nav />
        <Todos />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

function Nav() {
  return (
    <nav className="bg-teal">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <CheckCheck className="stroke-[3px] text-white" />
          <p className="text-xl font-medium text-white">
            TaskManager
            <span className="absolute text-xs font-thin">TM</span>
          </p>
        </div>
        <p className="font-medium text-white">Welcome, John</p>
      </div>
    </nav>
  );
}

function Todos() {
  const { isLoading, error, data } = useQuery("todos", () =>
    fetch("https://localhost:5001/api/ToDos").then((res) => res.json())
  );

  if (isLoading) return <div className="flex-1 px-4 pt-6">"Loading..."</div>;
  if (error instanceof Error)
    return (
      <div className="flex-1 px-4 pt-6">
        an error has occurred: {error.message}
      </div>
    );
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
        <ToDoTable todos={data} />
      </div>
    </main>
  );
}

function ToDoTable({ todos }: ToDoTableProps) {
  const getColorClass = (dueDate: string) => {
    const now = Date.now();
    const due = new Date(dueDate).getTime();
    console.log("Due: ", due);
    const oneWeekMilliseconds = 1000 * 60 * 60 * 24 * 7;

    if (due < now) {
      return "bg-red";
    } else if (due < now + oneWeekMilliseconds) {
      return "bg-yellow";
    } else {
      return "bg-teal";
    }
  };

  const getStatus = (started: boolean, completed: boolean): string => {
    if (completed) {
      return "Done";
    } else if (started) {
      return "In Progress";
    } else {
      return "To Do";
    }
  };
  return (
    <div className="rounded-md border border-white px-1 shadow-lg">
      <Table>
        {/* <TableCaption>A list of your ToDo's.</TableCaption> */}
        <TableBody className="">
          {todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell className="w-32 p-0">
                <div className="border-r-[1px] border-lighter-gray pr-3">
                  <div className="flex items-center justify-between space-x-1 rounded-full border-2 border-medium-gray px-2 py-1 font-medium">
                    <p className="text-xs font-semibold tracking-wide text-medium-gray">
                      {getStatus(todo.started, todo.completed)}
                    </p>
                    <ChevronDown
                      size={16}
                      className="stroke-medium-gray stroke-[3px]"
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-3 py-4 text-base font-semibold text-darker-gray">
                <p className="w-36 overflow-hidden truncate">{todo.title}</p>
              </TableCell>
              <TableCell className="p-2">
                <div className="flex min-w-full items-center justify-end">
                  <div
                    className={`mr-1 h-3 w-3 rounded-full ${getColorClass(
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function Footer() {
  return (
    <footer className="flex justify-end bg-near-black px-2 py-4">
      <p className="text-xs text-medium-gray">Privacy Policy</p>
    </footer>
  );
}

export default App;
