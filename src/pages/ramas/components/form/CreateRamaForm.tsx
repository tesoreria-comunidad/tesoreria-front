import { CreateRamaSchema, type TCreateRama } from "@/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useCreateRamaMutation } from "@/queries/ramas.queries";
export function CreateRamaForm() {
  const form = useForm<TCreateRama>({
    resolver: zodResolver(CreateRamaSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate: createRama, isPending: loading } = useCreateRamaMutation();
  function onSubmit(values: TCreateRama) {
    createRama(values, {
      onSuccess() {
        form.reset();
      },
      onError(error) {
        console.log("Error creating rama", error);
      },
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="pt-8 flex flex-col justify-between h-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de la rama" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" isLoading={loading}>
          Crear
        </Button>
      </form>
    </Form>
  );
}
