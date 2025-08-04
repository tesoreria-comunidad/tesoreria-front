import { useState } from "react";
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
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UseFormReturn } from "react-hook-form";
import type { TCreateTransaction } from "@/models/transaction.schema";
import { TRASNACTIONS_CATEGORIES_OPTIONS } from "@/constants/transactions.constatns";

interface CategoryFieldProps {
  form: UseFormReturn<TCreateTransaction>;
}
export function CategoryField({ form }: CategoryFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem className="w-[250px]">
          <FormLabel>Categoria</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn("w-full justify-between", !field.value && "")}
                >
                  {field.value || "Categoria"}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Buscar o escribir..."
                  value={field.value ?? ""}
                  onValueChange={(value) => field.onChange(value as string)}
                />
                <CommandEmpty> {field.value}</CommandEmpty>
                <CommandGroup>
                  {TRASNACTIONS_CATEGORIES_OPTIONS.map((category) => (
                    <CommandItem
                      key={category}
                      onSelect={() => {
                        field.onChange(category);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          category === field.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {category}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
