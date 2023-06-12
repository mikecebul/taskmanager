import { CreateForm } from "@/components/createForm";

function CreateTodoPage() {
  return (
    <div className="max-w-2xl px-4 pt-6">
      <h1 className="pb-12 text-2xl font-bold tracking-wide">Create To Do</h1>
      <CreateForm />
    </div>
  );
}

export default CreateTodoPage;
