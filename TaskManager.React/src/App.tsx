import { Plus } from "lucide-react";
import { CheckCheck } from "lucide-react";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="bg-teal">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center">
            <CheckCheck className="stroke-[3px] text-white" />
            <p className="text-xl font-semibold text-white">
              TaskManager<span className="absolute text-xs font-thin">TM</span>
            </p>
          </div>
          <p className="font-medium text-white">Welcome, John</p>
        </div>
      </nav>

      <main className="flex-1 px-4 pt-6">
        <h1 className="text-2xl font-bold tracking-wide">To Dos</h1>
        <div className="flex pt-6">
          <button className="rounded-full border-[3px] border-blue text-xl text-blue hover:border-darker-blue">
            <Plus className="stroke-[3px] text-blue hover:text-darker-blue"></Plus>
          </button>
          <p className="pl-2 text-lg font-semibold">Create</p>
        </div>
      </main>

      <footer className="flex justify-end bg-darker-gray px-2 py-4">
        <p className="text-sm text-medium-gray">Privacy Policy</p>
      </footer>
    </div>
  );
}

export default App;
