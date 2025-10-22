import {
  EditTransactionSchema,
  type TEditTransaction,
  type TTransaction,
} from "@/models/transaction.schema";
import { useEditTransactionMutation } from "@/queries/transactions.queries";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { CategoryField } from "./compoents/CategoryField";
import { useAlert } from "@/context/AlertContext";
import { DatePickerField } from "@/components/common/DatePickerField";
import { useFamiliesQuery } from "@/queries/family.queries";
import { useForm } from "react-hook-form";
import { PenIcon } from "lucide-react";

interface EditTransactionFormProps {
  transaction: TTransaction;
}
export function EditTransactionForm({ transaction }: EditTransactionFormProps) {
  const { mutate: editTransction, isPending } = useEditTransactionMutation();
  const { data: families } = useFamiliesQuery();
  const form = useForm<TEditTransaction>({
    resolver: zodResolver(EditTransactionSchema),
    defaultValues: transaction,
  });

  const { showAlert } = useAlert();
  const handleInputChange = (name: keyof TEditTransaction, value: string) => {
    if (isNaN(Number(value))) return;
    form.setValue(name, Number(value));
  };

  function onSubmit(values: TEditTransaction) {
    editTransction(
      {
        id: transaction.id,
        data: {
          ...values,
          payment_date: values.payment_date
            ? new Date(values.payment_date).toISOString()
            : new Date().toISOString(),
        },
      },
      {
        onSuccess: () => {
          showAlert({
            title: "Movimiento cargado",
            description: "",
            type: "success",
          });
          form.reset(); // limpiar form después de crear
        },
        onError: () => {
          showAlert({
            title: "Error al cargar nuevo movimiento",
            description: "Por favor revisar los datos cargados",
            type: "error",
          });
        },
      }
    );
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-10 "
      >
        <section className="space-y-8  ">
          <div className="flex flexc items-start gap-2">
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
                    {formatCurrency(form.getValues("amount")!)}
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
                          <SelectItem key={role} value={role}>
                            {role}
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

          <div>
            <FormField
              control={form.control}
              name="payment_date"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <DatePickerField
                      control={form.control}
                      name={field.name}
                      label="Fecha"
                      placeholder="Seleccionar fecha"
                      disableFuture
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value
                      ? field.value.split("T")[0]
                      : "Fecha en la que se realizó esta transacción"}
                  </FormDescription>
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
                          <SelectItem key={d} value={d}>
                            {d === "EXPENSE" ? "Gasto" : "Ingreso"}
                          </SelectItem>
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
                        {families?.map((family) => (
                          <SelectItem key={family.id} value={family.id}>
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
                <FormLabel>Descripción</FormLabel>
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
        <Button type="submit" isLoading={isPending}>
          <PenIcon />
          Actualizar
        </Button>
      </form>
    </Form>
  );
}
