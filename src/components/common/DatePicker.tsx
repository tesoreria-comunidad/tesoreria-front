import * as React from "react";
import { format, isAfter, isBefore, startOfDay, endOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Util: convierte Date -> "YYYY-MM-DD" (zona local) */
function toISODateString(d: Date | null | undefined) {
  if (!d) return "";
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Util: convierte "YYYY-MM-DD" -> Date (zona local) */
function fromISODateString(v?: string | null) {
  if (!v) return undefined;
  const [y, m, d] = v.split("-").map(Number);
  if (!y || !m || !d) return undefined;
  return new Date(y, m - 1, d);
}

export type DatePickerValue = string | undefined; // ISO "YYYY-MM-DD"

type DatePickerProps = {
  /** Valor controlado en ISO "YYYY-MM-DD" (coincide con tus schemas zod string) */
  value?: DatePickerValue;
  /** onChange recibe ISO "YYYY-MM-DD" (o undefined si se borra) */
  onChange?: (next?: DatePickerValue) => void;
  /** Texto dentro del botón cuando no hay valor */
  placeholder?: string;
  /** Deshabilitar interacción */
  disabled?: boolean;
  /** Limita fechas mínimas/máximas */
  minDate?: Date;
  maxDate?: Date;
  /** Atajos para limitar pasado/futuro */
  disablePast?: boolean;
  disableFuture?: boolean;
  /** Clase extra para el botón/trigger */
  className?: string;
  /** Si true, muestra un input nativo como fallback adicional (útil en mobile) */
  showNativeInputOnMobile?: boolean;
};

export function DatePicker({
  value,
  onChange,
  placeholder = "Seleccionar fecha",
  disabled,
  minDate,
  maxDate,
  disablePast,
  disableFuture,
  className,
  showNativeInputOnMobile = true,
}: DatePickerProps) {
  const selected = fromISODateString(value);

  // Lógica de límites
  const effectiveMin = React.useMemo(
    () => (disablePast ? startOfDay(new Date(1900, 0, 1)) : minDate),
    [disablePast, minDate]
  );
  const effectiveMax = React.useMemo(
    () => (disableFuture ? endOfDay(new Date()) : maxDate),
    [disableFuture, maxDate]
  );

  const isDisabled = (date: Date) => {
    if (effectiveMin && isBefore(date, startOfDay(effectiveMin))) return true;
    if (effectiveMax && isAfter(date, endOfDay(effectiveMax))) return true;
    return false;
  };

  // Fallback input nativo para mobile (opcional)
  const NativeInput = showNativeInputOnMobile ? (
    <input
      type="date"
      className="sr-only peer"
      tabIndex={-1}
      value={value ?? ""}
      onChange={(e) => {
        const v = e.target.value || undefined;
        if (onChange) onChange(v);
      }}
      min={effectiveMin ? toISODateString(effectiveMin) : undefined}
      max={effectiveMax ? toISODateString(effectiveMax) : undefined}
      disabled={disabled}
    />
  ) : null;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Trigger + Popover */}
      <Popover>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal border-input",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? format(selected, "PPP", { locale: es }) : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(d) => onChange?.(d ? toISODateString(d) : undefined)}
            initialFocus
            locale={es}
            disabled={isDisabled}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
      {NativeInput}
    </div>
  );
}
