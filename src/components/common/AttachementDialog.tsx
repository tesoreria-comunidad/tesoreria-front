import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Newspaper } from "lucide-react";
export function AttachementDialog({
  attachmentUrl,
}: {
  attachmentUrl?: string;
}) {
  const url = import.meta.env.VITE_S3_BASE_URL + "/" + attachmentUrl;
  return (
    <Dialog>
      <DialogTrigger>
        <Newspaper className="size-5 text-muted-foreground" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comprobante de pago</DialogTitle>
          <img src={url} className=" w-full h-auto mt-4 " />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
