import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CheckCheck } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/pages/Home";
import TodoDetails from "./pages/TodoDetails";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <div className="flex flex-col min-h-screen">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos/:id" element={<TodoDetails />} />
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

function Footer() {
  return (
    <footer className="flex justify-end px-2 py-4 bg-near-black">
      <p className="text-xs text-medium-gray">Privacy Policy</p>
    </footer>
  );
}

export default App;
