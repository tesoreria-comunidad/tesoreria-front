import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { AlertProvider } from "./context/AlertContext.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { MobileProvider } from "./context/MobileContext.tsx";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <AlertProvider>
        <SidebarProvider>
          <MobileProvider>
            <App />
          </MobileProvider>
        </SidebarProvider>
      </AlertProvider>
    </BrowserRouter>
  </Provider>
);
