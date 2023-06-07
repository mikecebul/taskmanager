import { EditForm } from "@/components/editForm";

function EditTodoPage() {
  return (
    <main className="max-w-2xl flex-1 px-4 pt-6">
      <h1 className="pb-12 text-2xl font-bold tracking-wide">Edit To Do</h1>
      <EditForm />
    </main>
  );
}

export default EditTodoPage;
