import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CheckCheck, Coffee } from "lucide-react";
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
        <div className="h-my-screen flex flex-col">
          <Nav />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/todos/:id" element={<TodoDetails />} />
              <Route path="/todos/:id/edit" element={<EditTodo />} />
              <Route path="/todos/:id/delete" element={<DeleteTodo />} />
              <Route path="/create" element={<CreateTodo />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

function Nav() {
  return (
    <div className="w-screen bg-teal">
      <nav className=" 2xl:mx-auto 2xl:max-w-7xl">
        <div className="flex items-center justify-between px-4 py-4 2xl:h-20">
          <div className="flex items-center">
            <CheckCheck className="stroke-[3px] text-white 2xl:stroke-[4px]" />
            <p className="text-xl font-medium text-white 2xl:text-3xl 2xl:font-bold">
              TaskManager
              <span className="absolute text-xs font-thin">TM</span>
            </p>
          </div>
          <p className="font-medium text-white">Welcome, John</p>
        </div>
      </nav>
    </div>
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
    <footer className="bg-near-black px-2 py-4">
      <div className="flex justify-between 2xl:mx-auto 2xl:max-w-7xl">
        <button onClick={handleCheckout} className="text-xs text-medium-gray">
          Buy me a <Coffee className="inline-block" size={18} />
        </button>
        <p className="text-xs text-medium-gray">Privacy Policy</p>
      </div>
    </footer>
  );
}

export default App;
