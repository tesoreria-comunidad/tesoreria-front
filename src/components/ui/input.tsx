import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeClosed, EyeIcon } from "lucide-react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const [typeState, setTypeState] = React.useState(type);

  const swithType = () => {
    if (typeState === "password") {
      setTypeState("text");
    }
    if (typeState === "text") {
      setTypeState("password");
    }
  };

  return (
    <div className="relative flex items-center">
      <input
        type={typeState}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      {type === "password" ? (
        <div
          className="absolute right-5 cursor-pointer text-gray-500"
          onClick={swithType}
        >
          {typeState === "text" ? <EyeIcon /> : <EyeClosed />}
        </div>
      ) : null}
    </div>
  );
}

export { Input };
