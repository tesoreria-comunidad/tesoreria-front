import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Handshake } from "lucide-react";

export function IsCustomCuotaTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="text-blue-400 hover:text-blue-500">
          <Handshake className="size-4" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Cuota personalizada</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
