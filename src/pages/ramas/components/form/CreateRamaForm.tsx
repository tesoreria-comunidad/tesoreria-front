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
import { useState } from "react";
import { useRamasQueries } from "@/queries/ramas.queries";
export function CreateRamaForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<TCreateRama>({
    resolver: zodResolver(CreateRamaSchema),
    defaultValues: {
      name: "",
    },
  });

  const { createRama } = useRamasQueries();
  async function onSubmit(values: TCreateRama) {
    try {
      setLoading(true);
      await createRama(values);
    } catch (error) {
      console.log("Error creating rama", error);
    } finally {
      setLoading(false);
    }
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
