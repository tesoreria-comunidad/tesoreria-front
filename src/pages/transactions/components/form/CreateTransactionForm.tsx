import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  CreateTransactionSchema,
  type TCreateTransaction,
} from "@/models/transaction.schema";
import { useTransactionsQueries } from "@/queries/transactions.queries";
import {
  PAYMENT_METHODS_OPTIONS,
  type TPaymentMethod,
} from "@/constants/payment-method.constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/utils";
import {
  DIRECTIONS_OPTIONS,
  type TDirectionOfTransaction,
} from "@/constants/transactions.constatns";
import { useAppSelector } from "@/store/hooks";
import { CategoryField } from "./compoents/CategoryField";
import { useAlert } from "@/context/AlertContext";
export function CreateTransactionForm() {
  const [loading, setLoading] = useState(false);
  const { families } = useAppSelector((s) => s.family);
  const form = useForm<TCreateTransaction>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      amount: 0,
      category: "",
      concept: "",
      description: "",
      direction: "INCOME",
      id_family: null,
      payment_date: new Date().toISOString(),
      payment_method: "TRANSFERENCIA",
    },
  });

  const { createTransaction } = useTransactionsQueries();
  const { showAlert } = useAlert();
  async function onSubmit(values: TCreateTransaction) {
    try {
      setLoading(true);
      await createTransaction(values);
      showAlert({
        title: "Movimiento cargado",
        description: "",
        type: "success",
      });
    } catch (error) {
      showAlert({
        title: "Error al cargar nuevo movimiento",
        description: "Por favor revisar los datos cargado",
        type: "error",
      });
      console.log("Error creating rama", error);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (name: keyof TCreateTransaction, value: string) => {
    if (isNaN(Number(value))) return;
    form.setValue(name, Number(value));
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="pt-8 flex flex-col justify-between h-full"
      >
        <section className="space-y-8">
          <div className="flex items-start gap-2">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Monto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Monto"
                      {...field}
                      onChange={(e) =>
                        handleInputChange(field.name, e.target.value)
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    {formatCurrency(form.getValues("amount"))}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de pago</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("payment_method", value as TPaymentMethod)
                      }
                      value={field.value}
                    >
                      <SelectTrigger className="w-[180px]" value={field.value}>
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        {PAYMENT_METHODS_OPTIONS.map((role) => (
                          <SelectItem value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2">
            <CategoryField form={form} />
            <FormField
              control={form.control}
              name="direction"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        form.setValue(
                          "direction",
                          value as TDirectionOfTransaction
                        )
                      }
                      value={field.value}
                    >
                      <SelectTrigger className="w-full" value={field.value}>
                        <SelectValue placeholder="Dirección " />
                      </SelectTrigger>
                      <SelectContent>
                        {DIRECTIONS_OPTIONS.map((d) => (
                          <SelectItem value={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="id_family"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Familia</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("id_family", value)
                      }
                      value={field.value as string}
                    >
                      <SelectTrigger
                        className="w-full"
                        value={field.value as string}
                      >
                        <SelectValue placeholder="Familia " />
                      </SelectTrigger>
                      <SelectContent>
                        {families.map((family) => (
                          <SelectItem value={family.id}>
                            {family.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="concept"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Concepto</FormLabel>
                <FormControl>
                  <Input placeholder="Concepto de este movimiento" {...field} />
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
                  <Input
                    placeholder="Descripción de este movimiento"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <Button type="submit" isLoading={loading}>
          Crear
        </Button>
      </form>
    </Form>
  );
}
