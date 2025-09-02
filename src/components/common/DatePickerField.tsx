import {
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker, type DatePickerValue } from "./DatePicker";

type DatePickerFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disablePast?: boolean;
  disableFuture?: boolean;
  className?: string;
};

export function DatePickerField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  minDate,
  maxDate,
  disablePast,
  disableFuture,
  className,
}: DatePickerFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const value = (field.value as DatePickerValue) ?? undefined;
        return (
          <FormItem className={className}>
            {label ? <FormLabel>{label}</FormLabel> : null}
            <FormControl>
              <DatePicker
                value={value}
                onChange={(v) => field.onChange(v)}
                placeholder={placeholder}
                disabled={disabled}
                minDate={minDate}
                maxDate={maxDate}
                disablePast={disablePast}
                disableFuture={disableFuture}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
