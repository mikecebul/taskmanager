import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DatePicker } from "./ui/datePicker";
import { editTodo, getTodoById } from "@/lib/api";
import { TableSkeleton } from "./tableSkeleton";
import { useQuery } from "@tanstack/react-query";
import StatusSelect from "./statusSelect";

const formSchema = z.object({
  status: z.union([
    z.literal("ToDo"),
    z.literal("InProgress"),
    z.literal("Done"),
  ]),
  title: z.string().min(2).max(50),
  description: z.string().max(254),
  dueDate: z.date(),
  notes: z.string().max(254),
});

export function EditForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await editTodo({
        id: Number(id),
        title: values.title || "",
        description: values.description || "",
        duedate: values.dueDate.toISOString(),
        notes: values.notes || "",
        status: values.status || "ToDo",
      });
      navigate(`/todos/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const {
    isError,
    error,
    isLoading,
    data: todo,
  } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => getTodoById(id as string),
    enabled: !!id,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: todo?.status,
      title: todo?.title,
      description: todo?.description,
      dueDate:
        todo?.duedate !== undefined ? new Date(todo?.duedate) : new Date(),
      notes: todo?.notes,
    },
  });
  if (isLoading) return <TableSkeleton />;
  if (isError)
    return <div>An error has occurred: {(error as Error).message}</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <StatusSelect status={field.value} setStatus={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <div className="w-full">
                  <DatePicker
                    selected={new Date(field.value)}
                    onSelect={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Input placeholder="Notes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end pt-12 space-x-8">
          <Link
            to={`/todos/${id}`}
            className="flex items-center justify-center"
          >
            <p className="text-sm font-semibold tracking-wide text-blue hover:scale-105 hover:text-darker-blue">
              Cancel
            </p>
          </Link>
          <Button
            type="submit"
            className="px-10 py-2 text-sm font-semibold tracking-wide text-white rounded-full shadow bg-blue ring-offset-background hover:scale-105 hover:bg-darker-blue hover:ring-offset-secondary-foreground focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
