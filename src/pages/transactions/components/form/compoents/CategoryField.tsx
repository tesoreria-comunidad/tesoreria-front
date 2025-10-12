import { useMemo, useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UseFormReturn, FieldPath, FieldValues } from "react-hook-form";
import { useTransactionsCategoriesQuery } from "@/queries/transactions.queries";
import type {
  TCreateTransaction,
  TEditTransaction,
} from "@/models/transaction.schema";

type BaseCategory = { category?: string | null };

type CategoryFieldProps<TFormValues extends FieldValues & BaseCategory> = {
  form: UseFormReturn<TFormValues>;
  name?: FieldPath<TFormValues>;
  label?: string;
  placeholder?: string;
  className?: string;
  allowFreeText?: boolean;
  disabled?: boolean;
};

export function CategoryField<
  TFormValues extends FieldValues & BaseCategory =
    | TCreateTransaction
    | TEditTransaction
>({
  form,
  name,
  label = "Categoría",
  placeholder = "Buscar o escribir...",
  className,
  allowFreeText = true,
  disabled,
}: CategoryFieldProps<TFormValues>) {
  const fieldName = name ?? ("category" as FieldPath<TFormValues>);
  const [open, setOpen] = useState(false);

  const categoriesQuery = useTransactionsCategoriesQuery();
  const { isLoading, data: categoriesRaw = [] } = categoriesQuery;

  // Normalizo y ordeno categorías (A → Z) en mayúsculas
  const categories = useMemo(
    () =>
      (categoriesRaw as string[])
        .filter(Boolean)
        .map((c) => c.trim())
        .filter((c) => c.length > 0)
        .map((c) => c.toUpperCase())
        .sort((a, b) => a.localeCompare(b)),
    [categoriesRaw]
  );

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {
        const value =
          (typeof field.value === "string" ? field.value : "") ?? "";
        const isDisabled = disabled || isLoading;

        return (
          <FormItem className={cn("w-[250px]", className)}>
            <FormLabel>{label}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Seleccionar categoría"
                    className={cn(
                      "w-full justify-between",
                      !value && "text-muted-foreground"
                    )}
                    disabled={isDisabled}
                  >
                    {isLoading ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Cargando...
                      </span>
                    ) : value ? (
                      value.toUpperCase()
                    ) : (
                      "Categoría"
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                  <CommandInput
                    placeholder={placeholder}
                    // Si allowFreeText=true, escribir actualiza el campo;
                    // si es false, solo filtra pero no cambia el valor del form.
                    value={allowFreeText ? value : undefined}
                    onValueChange={(v) => {
                      if (allowFreeText) {
                        field.onChange((v ?? "").toUpperCase());
                      }
                    }}
                  />
                  <CommandEmpty>
                    {allowFreeText
                      ? value || "Sin resultados"
                      : "Sin resultados"}
                  </CommandEmpty>

                  <CommandGroup>
                    {categories.map((category) => {
                      const selected = category === field.value;
                      return (
                        <CommandItem
                          key={category}
                          onSelect={() => {
                            field.onChange(category);
                            setOpen(false);
                          }}
                          value={category}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selected ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {category}
                        </CommandItem>
                      );
                    })}
                    {/* Opción para confirmar texto libre si no existe en la lista */}
                    {allowFreeText &&
                      value &&
                      !categories.includes(value.toUpperCase()) && (
                        <CommandItem
                          key={`__custom_${value}`}
                          onSelect={() => {
                            field.onChange(value.toUpperCase());
                            setOpen(false);
                          }}
                          value={value.toUpperCase()}
                        >
                          <Check
                            className={cn("mr-2 h-4 w-4", "opacity-100")}
                          />
                          Usar “{value.toUpperCase()}”
                        </CommandItem>
                      )}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
