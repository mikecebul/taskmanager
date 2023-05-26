import { CreateForm } from "@/components/createForm";

function CreateTodoPage() {
  return (
    <main className="flex-1 px-4 pt-6">
      <h1 className="pb-12 text-2xl font-bold tracking-wide">Create To Do</h1>
      <CreateForm />
    </main>
  );
}

export default CreateTodoPage;
