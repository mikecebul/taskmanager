import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CheckCheck } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/pages/Home";
import TodoDetails from "./pages/TodoDetails";
import EditTodo from "./pages/EditTodo";
import DeleteTodo from "./pages/DeleteTodo";
import CreateTodo from "./pages/CreateTodo";
import { stripeCheckout } from "./lib/api";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <Router>
        <div className="flex flex-col min-h-screen">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos/:id" element={<TodoDetails />} />
            <Route path="/todos/:id/edit" element={<EditTodo />} />
            <Route path="/todos/:id/delete" element={<DeleteTodo />} />
            <Route path="/create" element={<CreateTodo />} />
          </Routes>
          <Footer />
        </div>
      </Router>
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

const handleCheckout = async () => {
  try {
    await stripeCheckout();
  } catch (error) {
    console.error(error);
  }
};

function Footer() {
  return (
    <footer className="flex justify-between px-2 py-4 bg-near-black">
      <button onClick={handleCheckout} className="text-xs text-medium-gray">
        Buy me a coffee
      </button>
      <p className="text-xs text-medium-gray">Privacy Policy</p>
    </footer>
  );
}

export default App;
