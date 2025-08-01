import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AlertType = "success" | "error" | "info" | "warning";

interface Alert {
  title: string;
  description: string;
  type: AlertType;
  visible?: boolean;
}

interface AlertContextProps {
  alert: Alert;
  showAlert: (alert: Alert, duration?: number) => void;
  hideAlert: () => void;
}

const defaultAlert: Alert = {
  title: "Success! Your changes have been saved",
  description: "This is an alert with icon, title and description.",
  type: "info",
  visible: false,
};

const DEFAULT_DURATION = 5000;

const AlertContext = createContext<AlertContextProps>({
  alert: defaultAlert,
  showAlert: () => {},
  hideAlert: () => {},
});

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<Alert>(defaultAlert);
  const [duration, setDuration] = useState<number>(DEFAULT_DURATION);

  const showAlert = (alert: Alert, durationParam?: number) => {
    setAlert({ ...alert, visible: true });
    setDuration(durationParam ?? DEFAULT_DURATION);
  };

  const hideAlert = () => {
    setAlert({ ...alert, visible: false });
  };

  useEffect(() => {
    if (alert.visible) {
      const timer = setTimeout(() => {
        setAlert((prev) => ({ ...prev, visible: false }));
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [alert.visible, duration]);

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
