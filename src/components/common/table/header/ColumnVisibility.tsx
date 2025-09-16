import type { Table } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CheckIcon, Columns3Cog } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
interface ColumnVisibilityProps<T> {
  table: Table<T>;
}
export function ColumnVisibility<T>({ table }: ColumnVisibilityProps<T>) {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Columns3Cog />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" space-y-2">
          <div
            className="border p-2 cursor-pointer"
            onClick={table.getToggleAllColumnsVisibilityHandler()}
          >
            <Label>
              <div
                className={` rounded-full grid place-items-center ${
                  table.getIsAllColumnsVisible()
                    ? "bg-primary-2 size-4 "
                    : "size-0"
                } transition-all duration-200`}
              >
                <CheckIcon
                  className={`${
                    table.getIsAllColumnsVisible()
                      ? "text-white size-4"
                      : "hidden"
                  }`}
                />
              </div>
              Toggle All
            </Label>
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            {table.getAllLeafColumns().map((column) => {
              return (
                <div
                  key={column.id}
                  onClick={column.getToggleVisibilityHandler()}
                  className="border p-2 cursor-pointer"
                >
                  <Label>
                    <div
                      className={` rounded-full grid place-items-center ${
                        column.getIsVisible()
                          ? "bg-primary-2 size-4 "
                          : "size-0"
                      } transition-all duration-200`}
                    >
                      <CheckIcon
                        className={`${
                          column.getIsVisible() ? "text-white size-4" : "hidden"
                        }`}
                      />
                    </div>
                    {typeof column.columnDef.header !== "function"
                      ? (column.columnDef.header as string)
                      : column.id}
                  </Label>
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
