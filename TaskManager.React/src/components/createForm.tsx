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
import { Link, useNavigate } from "react-router-dom";
import { DatePicker } from "./ui/datePicker";
import { createTodo } from "@/lib/api";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().max(254),
  dueDate: z.date(),
  notes: z.string().max(254),
});

export function CreateForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date(),
      notes: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const dueDate = values.dueDate.toISOString();
    try {
      await createTodo({
        id: 0,
        title: values.title,
        description: values.description,
        duedate: dueDate,
        notes: values.notes,
        status: "ToDo",
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <Textarea placeholder="Description" {...field} />
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
                <Textarea placeholder="Notes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end space-x-8 pt-12">
          <Link to="/" className="flex items-center justify-center">
            <p className="text-sm font-semibold tracking-wide text-blue hover:scale-105 hover:text-darker-blue">
              Back to List
            </p>
          </Link>
          <Button
            type="submit"
            className="rounded-full bg-blue px-10 py-2 text-sm font-semibold tracking-wide text-white shadow ring-offset-background hover:scale-105 hover:bg-darker-blue hover:ring-offset-secondary-foreground focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
