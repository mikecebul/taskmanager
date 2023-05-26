import { Link } from "react-router-dom";

function CreateTodoPage() {
  return (
    <main className="flex-1 px-4 pt-6">
      <h1 className="text-2xl font-bold tracking-wide">Create To Do</h1>
      <TodoGrid />
      <Links />
    </main>
  );
}

const TodoGrid = () => {
  return (
    <>
      <div className="grid grid-cols-4 pt-6">
        <p className="col-span-1 text-xs font-semibold">Title</p>
        <p className="col-span-3 text-xs font-medium">Text Box</p>
      </div>
      <div className="grid grid-cols-4 pt-6">
        <p className="col-span-1 text-xs font-semibold">Description</p>
        <p className="text-xs font-medium col-span-23">Text Box</p>
      </div>
      <div className="grid grid-cols-4 pt-6">
        <p className="col-span-1 text-xs font-semibold">Due Date</p>
        <p className="col-span-3 text-xs font-medium">Text Box</p>
      </div>
      <div className="grid grid-cols-4 pt-6">
        <p className="col-span-1 text-xs font-semibold">Notes</p>
        <p className="col-span-3 text-xs font-medium">Text Box</p>
      </div>
    </>
  );
};

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
