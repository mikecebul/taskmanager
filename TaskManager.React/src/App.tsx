import { Plus } from "lucide-react";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="bg-teal">
        <div className="flex items-center justify-between px-6 py-4">
          <p className="text-xl font-semibold text-white">TaskManager</p>
          <p className="font-medium text-white">Welcome, John</p>
        </div>
      </nav>

      <main className="flex-1 px-2">
        <h1 className="py-4 text-2xl font-bold">ToDo's</h1>
        <div className="flex">
          <button className="rounded-full border-2 border-blue text-xl text-blue">
            <Plus color="#46bcff"></Plus>
          </button>
          <p className="pl-2 text-lg font-medium">Create</p>
        </div>
      </main>

      <footer className="flex justify-end bg-darker-gray px-2 py-4">
        <p className="text-sm text-medium-gray">Privacy Policy</p>
      </footer>
    </div>
  );
}

export default App;
