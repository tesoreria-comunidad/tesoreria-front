import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAlert } from "@/context/AlertContext";
import {
  CheckCircle2Icon,
  XCircleIcon,
  InfoIcon,
  AlertTriangleIcon,
} from "lucide-react";

const typeStyles = {
  success: {
    icon: <CheckCircle2Icon className="text-green-600" />,
    alertClass: "bg-green-100 border-green-600 text-green-800",
  },
  error: {
    icon: <XCircleIcon className="text-red-600" />,
    alertClass: "bg-red-50 border-red-600 text-red-800",
  },
  info: {
    icon: <InfoIcon className="text-blue-600" />,
    alertClass: "bg-blue-50 border-blue-600 text-blue-800",
  },
  warning: {
    icon: <AlertTriangleIcon className="text-yellow-600" />,
    alertClass: "bg-yellow-50 border-yellow-600 text-yellow-800",
  },
};

export function Alerts() {
  const {
    alert: { visible, description, title, type },
  } = useAlert();

  const { icon, alertClass } = typeStyles[type] || typeStyles.info;

  return (
    <section
      className={`absolute z-50 left-1/2 top-0 transform -translate-x-1/2 m-4  transition-all duration-200 ${
        visible ? "scale-100" : "scale-50 opacity-0"
      }`}
    >
      <Alert className={alertClass}>
        {icon}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </section>
  );
}
