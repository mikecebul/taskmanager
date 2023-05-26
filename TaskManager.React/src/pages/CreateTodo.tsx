import { CreateForm } from "@/components/createForm";
import { Link } from "react-router-dom";

function CreateTodoPage() {
  return (
    <main className="flex-1 px-4 pt-6">
      <h1 className="text-2xl font-bold tracking-wide">Create To Do</h1>
      <CreateForm />
      <Links />
    </main>
  );
}


const Links = () => {
  return (
    <div className="flex items-center justify-end pt-12 space-x-8">
      <Link to="/" className="flex items-center justify-center">
        <p className="text-sm font-semibold tracking-wide text-blue hover:scale-105 hover:text-darker-blue">
          Back to List
        </p>
      </Link>
      <Link to={`/create`}>
        <div className="px-10 py-2 text-xs font-medium rounded-full shadow bg-blue ring-offset-background hover:scale-105 hover:bg-darker-blue hover:ring-offset-secondary-foreground focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <p className="text-sm font-semibold tracking-wide text-white">Edit</p>
        </div>
      </Link>
    </div>
  );
};
export default CreateTodoPage;
